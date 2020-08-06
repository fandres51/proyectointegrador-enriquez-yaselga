import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Estudiante } from '../models/estudiante';
import { Aporte } from '../models/aporte'
import * as firebase from 'firebase';
import { AsociacionService } from './asociacion.service';
import * as Papa from 'papaparse';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class EstudiantesService {

  private aporteActual;
  private periodoActual;

  constructor(
    asociacionService: AsociacionService,
    private afs: AngularFirestore
  ) {
    asociacionService.getAsociacion().subscribe(
      asociacion => {
        this.aporteActual = asociacion.AporteActual;
        this.periodoActual = asociacion.PeriodoActual;
      }
    )
  }

  private getCollection(): AngularFirestoreCollection<Estudiante> {
    return this.afs.collection<Estudiante>('Asociacion/AEIS/Persona');
  }

  getEstudiantes(): Observable<Estudiante[]> {
    return this.getCollection().snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Estudiante;

        Object.keys(data).filter(
          key => data[key] instanceof firebase.firestore.Timestamp
        ).forEach(
          key => data[key] = data[key].toDate()
        ) //convierte todos los objetos Timestamp a Date

        data.NoUnico = a.payload.doc.id;
        return data;
      }))
    )
  }

  getEstudiante(noUnico: string): Observable<Estudiante> {
    return this.afs.doc<Estudiante>(`Asociacion/AEIS/Persona/${noUnico}`).snapshotChanges().pipe(
      map(a => {
        const data = a.payload.data() as Estudiante;

        Object.keys(data).filter(
          key => data[key] instanceof firebase.firestore.Timestamp
        ).forEach(
          key => data[key] = data[key].toDate()
        ) //convierte todos los objetos Timestamp a Date

        return data;
      })
    );
  }

  crearEstudiante(estudiante: Estudiante) {
    this.getCollection().doc(estudiante.NoUnico).set(estudiante);
  }

  existeEstudiante(noUnico: string): Promise<boolean> {
    return new Promise(
      (res) => {
        return this.afs.collection<Estudiante>('Asociacion/AEIS/Persona', ref => ref.where('NoUnico', '==', noUnico)).valueChanges().subscribe(
          estudiantes => {
            if (estudiantes.length)
              res(true);
            else
              res(false)
          }
        );
      }
    )
  }

  updateEstudiante(estudiante: Estudiante) {
    const estudianteDoc: AngularFirestoreDocument<Estudiante> = this.afs.collection('Asociacion/AEIS/Persona').doc(estudiante.NoUnico);
    estudianteDoc.update(estudiante);
  }

  darDeBajaEstudiante(noUnico: string) {
    const estudianteDoc: AngularFirestoreDocument<Estudiante> = this.getCollection().doc(noUnico);
    estudianteDoc.update({
      SemestreReferencial: 'Retirado',
      EstadoAfiliacion: 'No afiliado'
    });
  }

  graduarEstudiante(noUnico: string) {
    const estudianteDoc: AngularFirestoreDocument<Estudiante> = this.getCollection().doc(noUnico);
    estudianteDoc.update({
      SemestreReferencial: 'Graduado',
      EstadoAfiliacion: 'No afiliado'
    });
  }

  private getAportesCollection(noUnico: string): AngularFirestoreCollection<Aporte> {
    return this.afs.collection<Aporte>(`Asociacion/AEIS/Persona/${noUnico}/Aporte`);
  }

  afiliarEstudiante(noUnico: string) {
    this.existeEstudiante(noUnico).then(
      existe => {
        if (existe) {
          let nuevoAporte: Aporte = {
            deuda: 0,
            periodo: this.periodoActual,
            valor: this.aporteActual
          };

          this.getCollection().doc(noUnico).update({ EstadoAfiliacion: 'Aportante' });
          this.getAportesCollection(noUnico).doc<Aporte>(nuevoAporte.periodo).set(nuevoAporte);
        } else {
          console.error('Estudiante no existe');
        }
      }
    )
  }

  getAportes(noUnico: string): Observable<Aporte[]> {
    return this.getAportesCollection(noUnico).valueChanges();
  }

  getAporteActual(noUnico: string): Observable<Aporte> {
    return this.getAportesCollection(noUnico).doc<Aporte>(this.periodoActual).valueChanges();
  }

  crearAportesNuevoSemestre() {
    const estudiantesAfiliadosCollection = this.afs.collection(
      'Asociacion/AEIS/Persona',
      ref => ref.where('EstadoAfiliacion', 'in', ['Aportante', 'No aportante'])
    ).valueChanges(); //crea una variable con la coleccion de estudiantes afiliados

    estudiantesAfiliadosCollection.subscribe(
      estudiantesAfiliados => {
        estudiantesAfiliados.forEach((estudiante: Estudiante) => {
          this.getAportesCollection(estudiante.NoUnico).doc<Aporte>(this.periodoActual).set({
            deuda: this.aporteActual,
            periodo: this.periodoActual,
            valor: 0
          })
          this.getCollection().doc(estudiante.NoUnico).update({ EstadoAfiliacion: 'No aportante' })
        })
      }
    ) //cambia el estado de cada estudiante a 'No aportante' y crea un Aporte vacío
  }



  desafiliarEstudiante(noUnico: string) {
    this.afs.doc<Estudiante>(`Asociacion/AEIS/Persona/${noUnico}`).update({ EstadoAfiliacion: 'No afiliado' });
  }

  cargaMasivaEstudiantes(file) {
    return new Promise(
      (resF) => {
        Papa.parse(file, {
          complete: res => {
            this.firethisEstudiante(res['data']).then(
              estudiantesNoIngresados => resF(estudiantesNoIngresados)
            ).catch (
              e => console.error('Archivo no admitido')
            )
          },
          header: true
        });
      }
    )
  }

  private firethisEstudiante(estudiantes: Estudiante[]) {
    const estudiantesNoIngresados: string[] = [];
    return new Promise((resolve) => {
      estudiantes.forEach((estudiante) => {
        estudiante.FechaNacimiento = new Date(estudiante.FechaNacimiento);
        estudiante.Apellido = estudiante.Apellido.toUpperCase();
        estudiante.Nombre = estudiante.Nombre.toUpperCase();
        if (this.comprobarEstructura(estudiante)) {
          this.getCollection().doc(estudiante.NoUnico).set(estudiante);
        } else {
          estudiantesNoIngresados.push(estudiante.NoUnico);
        }
      })
      resolve(estudiantesNoIngresados);
    })
  }

  private comprobarEstructura(estudiante: Estudiante): boolean {
    console.log(estudiante);
    let aprueba: boolean = true;
    if (
      !estudiante.FechaNacimiento &&
      !(estudiante.FechaNacimiento instanceof Date)
    ) {
      console.log('No aprueba por fecha');
      aprueba = false;
    }
    if (
      estudiante.Carrera !== 'Sistemas' &&
      estudiante.Carrera !== 'Computacion' &&
      estudiante.Carrera !== 'Software'
    ) {
      console.log('No aprueba por carrera');
      aprueba = false;
    }
    if (
      estudiante.EstadoAfiliacion !== 'Aportante' &&
      estudiante.EstadoAfiliacion !== 'No aportante' &&
      estudiante.EstadoAfiliacion !== 'No afiliado'
    ) {
      console.log('No aprueba por aporte');
      aprueba = false;
    }
    if (
      estudiante.SemestreReferencial !== '1' &&
      estudiante.SemestreReferencial !== '2' &&
      estudiante.SemestreReferencial !== '3' &&
      estudiante.SemestreReferencial !== '4' &&
      estudiante.SemestreReferencial !== '5' &&
      estudiante.SemestreReferencial !== '6' &&
      estudiante.SemestreReferencial !== '7' &&
      estudiante.SemestreReferencial !== '8' &&
      estudiante.SemestreReferencial !== '9' &&
      estudiante.SemestreReferencial !== '10' &&
      estudiante.SemestreReferencial !== 'Egresado'
    ) {
      console.log('No aprueba por semestre');
      aprueba = false;
    }
    console.log(aprueba);
    return aprueba
  }
}
