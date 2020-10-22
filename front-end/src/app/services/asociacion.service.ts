import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Asociacion } from '../models/asociacion';

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
}
