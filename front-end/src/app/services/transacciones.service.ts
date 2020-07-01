import { Injectable } from '@angular/core';
import { Transaccion } from '../models/transaccion';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase';
import { Parametro } from '../models/parametro';

@Injectable({
  providedIn: 'root'
})
export class TransaccionesService {

  transaccionesCollection: AngularFirestoreCollection<Transaccion>;
  transacciones: Observable<Transaccion[]>;
  transaccionDoc: AngularFirestoreDocument<Transaccion>;

  numeroTransaccion: Parametro;

  constructor(public afs: AngularFirestore) {
    this.transaccionesCollection = afs.collection<Transaccion>('Asociacion/AEIS/Transaccion');
    this.transacciones = this.transaccionesCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Transaccion;
        Object.keys(data).filter(key => data[key] instanceof firebase.firestore.Timestamp)
                        .forEach(key => data[key] = data[key].toDate())
        data.id = a.payload.doc.id;
        return data;
      }))
    );
  }

  getTransaccion() {
    return this.transacciones;
  }

  updateTransaccion(transaccion: Transaccion) {
    if(transaccion.Fecha instanceof Date) {
      transaccion.Fecha = firebase.firestore.Timestamp.fromDate(transaccion.Fecha);
    }
    this.transaccionDoc = this.afs.doc(`Asociacion/AEIS/Transaccion/${transaccion.id}`)
    this.transaccionDoc.update(transaccion);    
  }
  
  addTransaccion(transaccion: Transaccion) {
    
    if(transaccion.Fecha instanceof Date) {
      transaccion.Fecha = firebase.firestore.Timestamp.fromDate(transaccion.Fecha);
    }

    this.transaccionesCollection.add(transaccion);

  }

  deleteTransaccion(transaccion: Transaccion) {
    this.transaccionDoc = this.afs.doc(`Asociacion/AEIS/Transaccion/${transaccion.id}`);
    this.transaccionDoc.delete();
  }
}
