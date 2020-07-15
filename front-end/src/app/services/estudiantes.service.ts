import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Estudiante } from '../models/estudiante';
import { Aporte } from '../models/aporte'
import * as firebase from 'firebase';
import { TransaccionesService } from './transacciones.service';
import { Transaccion } from '../models/transaccion';
import { AsociacionService } from './asociacion.service';

@Injectable({
  providedIn: 'root'
})
export class EstudiantesService {

  constructor(
    private afs: AngularFirestore,
    private transaccionService: TransaccionesService,
    private asociacionService: AsociacionService
  ) {

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
    estudiante.EstadoAfiliacion = false;
    estudianteDoc.update(estudiante);
  }

  graduarEstudiante(estudiante: Estudiante) {
    const estudianteDoc: AngularFirestoreDocument<Estudiante> = this.afs.collection('Asociacion/AEIS/Persona').doc(estudiante.NoUnico);
    estudiante.SemestreReferencial = 'Graduado';
    estudiante.EstadoAfiliacion = false;
    estudianteDoc.update(estudiante);
  }

  getAportes(estudianteId: string): Observable<Aporte[]> {
    return this.afs.collection<Aporte>(`Asociacion/AEIS/Persona/${estudianteId}/Aportes`).valueChanges();
  }

  async crearAportesNuevoSemestre(estudiantes: Estudiante[]) {

    let nuevoAporte: Aporte;

    await this.asociacionService.getAsociacion().subscribe(
      asociacion => {
        nuevoAporte = {
          deuda: asociacion.AporteActual,
          periodo: asociacion.PeriodoActual,
          valor: 0
        }
      }
    )

    const estudiantesAfiliados: Estudiante[] = estudiantes.filter(estudiante => estudiante.EstadoAfiliacion);

    estudiantesAfiliados.forEach(estudianteAfiliado => {
      this.afs.collection(`Asociacion/AEIS/Persona/${estudianteAfiliado.NoUnico}/Aportes`).doc<Aporte>(estudianteAfiliado.NoUnico + nuevoAporte.periodo).set(nuevoAporte);
    })
  }

  async afiliarEstudiante(estudiante: Estudiante, valor: number) {

    let nuevoAporte: Aporte;

    await this.asociacionService.getAsociacion().subscribe(
      asociacion => {
        nuevoAporte = {
          deuda: asociacion.AporteActual - valor,
          valor: valor,
          periodo: asociacion.PeriodoActual
        }
      }
    )

    if (!estudiante.EstadoAfiliacion) {
      estudiante.EstadoAfiliacion = true;
      this.afs.doc<Estudiante>(`Asociacion/AEIS/Persona/${estudiante.NoUnico}`).update(estudiante);
    }

    this.afs.collection(`Asociacion/AEIS/Persona/${estudiante.NoUnico}/Aporte`).doc<Aporte>(estudiante.NoUnico + nuevoAporte.periodo).set(nuevoAporte);
    //TODO transaccion al afiliar
  }

  desafiliarEstudiante(estudiante: Estudiante) {
    estudiante.EstadoAfiliacion = false;
    this.afs.doc<Estudiante>(`Asociacion/AEIS/Persona/${estudiante.NoUnico}`).update(estudiante);
  }

  confirmarAfiliacionActual(estudiante: Estudiante): boolean {
    this.afs.doc<Estudiante>(`Asociacion/AEIS/Persona/${estudiante.NoUnico}`).update(estudiante);

  }

  getAporteActual(estudiante: Estudiante): Observable<Aporte> { }

  //TODO recibir datos de asocicaciona al login y no al hacer una afiliacion o al cargar service



  addAfiliation(estudiante: Estudiante, monto: number, fecha: Date) {

    const idNuevaTransaccion: string = 'TRN_123';

    const nuevaTransaccion: Transaccion = {
      id: idNuevaTransaccion,
      Monto: monto,
      Fecha: firebase.firestore.Timestamp.fromDate(fecha),
      Ingreso: true,
      Tipo: 'Afiliacion 2020A',
      TipoMonetario: 'Afiliacion',
      PersonaID: estudiante.NoUnico
    }

    this.transaccionService.addTransaccion(nuevaTransaccion);

    // generar un registro

    estudiante.EstadoAfiliacion = true;

    this.updateEstudiante(estudiante);
  }



}
