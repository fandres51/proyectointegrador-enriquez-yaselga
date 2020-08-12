import { Injectable } from '@angular/core';
import { Transaccion } from '../models/transaccion';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase';
import { AsociacionService } from './asociacion.service';
import { Contador } from '../models/contador';

@Injectable({
  providedIn: 'root'
})
export class TransaccionesService {

  transaccionesCollection: AngularFirestoreCollection<Transaccion>;
  transacciones: Observable<Transaccion[]>;
  transaccionDoc: AngularFirestoreDocument<Transaccion>;


  constructor(
    private afs: AngularFirestore,
    private asociacionService: AsociacionService
  ) { }

  getCollection(): AngularFirestoreCollection<Transaccion> {
    return this.afs.collection<Transaccion>('Asociacion/AEIS/Transaccion');
  }

  getTransacciones(): Observable<Transaccion[]> {
    return this.getCollection().snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Transaccion;
        Object.keys(data).filter(
          key => data[key] instanceof firebase.firestore.Timestamp
        ).forEach(
          key => data[key] = data[key].toDate()
        ) //convierte todos los objetos Timestamp a Date
        return data;
      }))
    )
  }

  getTransaccion(id: string): Observable<Transaccion> {
    return this.getCollection().doc<Transaccion>(id).snapshotChanges().pipe(
      map( a => {
        const data = a.payload.data() as Transaccion;

        Object.keys(data).filter(
          key => data[key] instanceof firebase.firestore.Timestamp
        ).forEach(
          key => data[key] = data[key].toDate()
        ) //convierte todos los objetos Timestamp a Date

        return data;
      })
    );
  }

  updateTransaccion(transaccion: Transaccion) {
    this.afs.collection('Asociacion/AEIS/Transaccion').doc(transaccion.id).set(transaccion)
  }

  addTransaccion(nuevaTransaccion: Transaccion) {
    let bool = true; //eveita un bucle infinito X((
    this.asociacionService.getContador('Transaccion').subscribe(
      (contador: Contador) => {
        if (bool) {
          nuevaTransaccion.id = 'TRN' + contador.contador;
          this.getCollection().doc('TRN' + contador.contador).set(nuevaTransaccion);
          this.asociacionService.increaseContador('Transaccion');
          console.log('Hola');
          bool = false
        }
      }
    )
  }

  deleteTransaccion(transaccion: Transaccion) {
    this.transaccionDoc = this.afs.doc(`Asociacion/AEIS/Transaccion/${transaccion.id}`);
    this.transaccionDoc.delete();
  }
}
