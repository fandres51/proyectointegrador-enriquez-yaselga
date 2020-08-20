import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { Asociacion } from '../models/asociacion';
import { Contador } from '../models/contador';

@Injectable({
  providedIn: 'root'
})
export class AsociacionService {

  constructor(
    private afs: AngularFirestore
  ) { }
  
  getAsociacion(): Observable<Asociacion> {
     return this.afs.doc<Asociacion>('Asociacion/AEIS').valueChanges();
  }

  updateAsociacion(asociacion) {
    const asociacionDoc: AngularFirestoreDocument<Asociacion> = this.afs.collection('Asociacion').doc('AEIS');
    asociacionDoc.update(asociacion);
  }

  getContador(parametro: string) {
    return this.afs.doc<Contador>(`Asociacion/AEIS/Parametros/${parametro}`).valueChanges();
  }

  increaseContador(parametro: string) {
    const increment = firebase.firestore.FieldValue.increment(1);
    const contador = this.afs.doc(`Asociacion/AEIS/Parametros/${parametro}`);
    contador.update({contador: increment})
  }
}
