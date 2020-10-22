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
    private asociacionService: AsociacionService,
    private afs: AngularFirestore
  ) {
    asociacionService.getAsociacion().subscribe(
      asociacion => {
        this.aporteActual = asociacion.AporteActual;
        this.periodoActual = asociacion.PeriodoActual;
      }
    )
  }

  getCollection(): AngularFirestoreCollection<Estudiante> {
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
        ) //convierte todos los tipos timestamp a tipo date

        data.NoUnico = a.payload.doc.id;
        return data;

      }))
    )
  }

  getEstudiante(noUnico: string): Observable<Estudiante> {
    return this.afs.doc<Estudiante>(`Asociacion/AEIS/Persona/${noUnico}`).valueChanges();
  }

  existeEstudiante(noUnico: string): boolean {
    if(this.afs.doc<Estudiante>(`Asociacion/AEIS/Persona/${noUnico}`).valueChanges())
      return true;
    else
      return false;
  }

  crearEstudiante(estudiante: Estudiante) {
    this.getCollection().add(estudiante);
  }

  updateEstudiante(estudiante: Estudiante) {
    if (estudiante.FechaNacimiento instanceof Date) {
      estudiante.FechaNacimiento = firebase.firestore.Timestamp.fromDate(estudiante.FechaNacimiento);
    }
    const estudianteDoc: AngularFirestoreDocument<Estudiante> = this.afs.collection('Asociacion/AEIS/Persona').doc(estudiante.NoUnico);
    estudianteDoc.update(estudiante);
  }

  darDeBajaEstudiante(estudiante: Estudiante) {
    const estudianteDoc: AngularFirestoreDocument<Estudiante> = this.afs.collection('Asociacion/AEIS/Persona').doc(estudiante.NoUnico);
    estudiante.SemestreReferencial = 'Retirado';
    estudiante.EstadoAfiliacion = 'No afiliado';
    estudianteDoc.update(estudiante);
  }

  graduarEstudiante(estudiante: Estudiante) {
    const estudianteDoc: AngularFirestoreDocument<Estudiante> = this.afs.collection('Asociacion/AEIS/Persona').doc(estudiante.NoUnico);
    estudiante.SemestreReferencial = 'Graduado';
    estudiante.EstadoAfiliacion = 'No afiliado';
    estudianteDoc.update(estudiante);
  }

  getAportes(estudianteId: string): Observable<Aporte[]> {
    return this.afs.collection<Aporte>(`Asociacion/AEIS/Persona/${estudianteId}/Aportes`).valueChanges();
  }

  getAporteActual(estudiante: Estudiante): Observable<Aporte> {
    return this.afs.doc<Aporte>(`Asociacion/AEIS/Persona/${estudiante.NoUnico}/Aporte/${estudiante.NoUnico + this.periodoActual}`).valueChanges();
  }

  crearAportesNuevoSemestre(estudiantes: Estudiante[]) {

    const nuevoAporte: Aporte = {
      deuda: this.aporteActual,
      periodo: this.periodoActual,
      valor: 0
    };

    const estudiantesAfiliados: Estudiante[] = estudiantes.filter(estudiante => estudiante.EstadoAfiliacion);

    estudiantesAfiliados.forEach(estudianteAfiliado => {

      estudianteAfiliado.EstadoAfiliacion = 'No aportante';
      this.afs.collection<Estudiante>('Asociacion/AEIS/Persona').doc(estudianteAfiliado.NoUnico).update(estudianteAfiliado);
      this.afs.collection(`Asociacion/AEIS/Persona/${estudianteAfiliado.NoUnico}/Aportes`).doc<Aporte>(estudianteAfiliado.NoUnico + nuevoAporte.periodo).set(nuevoAporte);
    })
  }

  afiliarEstudiante(estudiante: Estudiante, valor: number = this.aporteActual) {

    let nuevoAporte: Aporte = {
      deuda: 0,
      periodo: '2020B',
      valor: 30
    };

    estudiante.EstadoAfiliacion = 'Aportante';
    this.afs.doc<Estudiante>(`Asociacion/AEIS/Persona/${estudiante.NoUnico}`).update(estudiante);

    this.afs.collection(`Asociacion/AEIS/Persona/${estudiante.NoUnico}/Aporte`).doc<Aporte>(estudiante.NoUnico + nuevoAporte.periodo).set(nuevoAporte);
  }

  desafiliarEstudiante(estudiante: Estudiante) {
    estudiante.EstadoAfiliacion = 'No afiliado';
    this.afs.doc<Estudiante>(`Asociacion/AEIS/Persona/${estudiante.NoUnico}`).update(estudiante);
  }

  cargaMasivaEstudiantes(file) {
    Papa.parse(file, {
      complete: res => this.firethisEstudiante(res['data']),
      header: true
    });
  }

  private firethisEstudiante(estudiantes: Estudiante[]) {
    return new Promise((resolve) => {
      estudiantes.forEach((estudiante) => {
        this.afs.collection('Asociacion/AEIS/Persona').doc<Estudiante>(estudiante.NoUnico).set(estudiante);
      })
      resolve();
    })
  }

  cargaMasivaEstudiantesAportantes(file) {
    Papa.parse(file, {
      complete: res => this.firethisEstudianteAportante(res['data']),
      header: true
    });
  }

  private firethisEstudianteAportante(estudiantes: Estudiante[]) {
    estudiantes.forEach((estudiante) => {
      this.afs.collection('Asociacion/AEIS/Persona').doc<Estudiante>(estudiante.NoUnico).set(estudiante).catch( e => {
        console.error('\nNo se pudo cargar el siguiente estudiante: ', estudiante.Apellido, estudiante.Nombre, '\nError: ', e, '\n');
      });
    })
  }

  //TODO poner valores por defecto en el momento de hacer carga masiva para no dañar los filtros
}
