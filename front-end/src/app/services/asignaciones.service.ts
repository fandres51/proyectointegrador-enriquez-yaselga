import { Injectable } from '@angular/core';
import { Asignacion } from '../models/asignacion';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase';
import { AsociacionService } from './asociacion.service';
import { Contador } from '../models/contador';
import * as Papa from 'papaparse';


@Injectable({
  providedIn: 'root'
})
export class AsignacionesService {

  asignacionesCollection: AngularFirestoreCollection<Asignacion>

  constructor(
    private afs: AngularFirestore,
    private asociacionService: AsociacionService
  ) { }

  getCollection(): AngularFirestoreCollection<Asignacion> {
    return this.afs.collection<Asignacion>('Asociacion/AEIS/Asignacion');
  }

  getAsignaciones(): Observable<Asignacion[]> {
    return this.getCollection().snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Asignacion;
        Object.keys(data).filter(
          key => data[key] instanceof firebase.firestore.Timestamp
        ).forEach(
          key => data[key] = data[key].toDate()
        ) //convierte todos los objetos Timestamp a Date
        return data;
      }))
    )
  }

  getAsignacion(id: string): Observable<Asignacion> {
    return this.getCollection().doc<Asignacion>(id).snapshotChanges().pipe(
      map( a => {
        const data = a.payload.data() as Asignacion;

        Object.keys(data).filter(
          key => data[key] instanceof firebase.firestore.Timestamp
        ).forEach(
          key => data[key] = data[key].toDate()
        ) //convierte todos los objetos Timestamp a Date

        return data;
      })
    );
  }

  updateAsignacion(transaccion: Asignacion) {
    this.afs.collection('Asociacion/AEIS/Asignacion').doc(transaccion.id).set(transaccion)
  }

  addAsignacion(nuevaAsignacion: Asignacion) {
    let bool = true; //eveita un bucle infinito X((
    this.asociacionService.getContador('Asignacion').subscribe(
      (contador: Contador) => {
        if (bool) {
          nuevaAsignacion.id = 'ASG' + contador.contador;
          this.getCollection().doc('ASG' + contador.contador).set(nuevaAsignacion);
          this.asociacionService.increaseContador('Asignacion');
          bool = false
        }
      },
      error => {
        console.error(error);
      }
    )
  }

  desasignar(asignacionId: string){
    this.getCollection().doc(asignacionId).update({estado:false, fechaFin:new Date()})
  }
}
