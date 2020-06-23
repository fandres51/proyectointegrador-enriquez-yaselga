import { Injectable } from '@angular/core';
import { Transaccion } from '../models/transaccion';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TransaccionesService {

  transaccionesCollection: AngularFirestoreCollection<Transaccion>;
  transacciones: Observable<Transaccion[]>;
  transaccionDoc: AngularFirestoreDocument<Transaccion>;

  constructor(public afs: AngularFirestore) {
    this.transaccionesCollection = afs.collection<Transaccion>('Asociacion/AEIS/Transaccion');
    this.transacciones = this.transaccionesCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Transaccion;
        data.id = a.payload.doc.id;
        return data;
      }))
    );
  }

  getTransaccion() {
    return this.transacciones;
  }

  updateTransaccion(transaccion: Transaccion) {
    this.transaccionDoc = this.afs.doc(`Asociacion/AEIS/Transaccion/${transaccion.id}`)
    this.transaccionDoc.update(transaccion);    
  }

  addTransaccion(transaccion: Transaccion) {
    this.transaccionesCollection.add(transaccion);
  }

  deleteTransaccion(transaccion: Transaccion) {
    this.transaccionDoc = this.afs.doc(`Asociacion/AEIS/Transaccion/${transaccion.id}`);
    this.transaccionDoc.delete();
  }
}
