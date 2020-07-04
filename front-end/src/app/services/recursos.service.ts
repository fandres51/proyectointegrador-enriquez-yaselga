import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Recurso } from '../models/recurso';

@Injectable({
  providedIn: 'root'
})
export class RecursosService {

  recursosCollection: AngularFirestoreCollection<Recurso>;
  recursos: Observable<Recurso[]>;
  recursoDoc: AngularFirestoreDocument<Recurso>;

  constructor(public afs: AngularFirestore) {
    this.recursosCollection = afs.collection<Recurso>('Asociacion/AEIS/Recurso');
    this.recursos = this.recursosCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Recurso;
        data.id = a.payload.doc.id;
        return data;
      }))
    );
  }  
  
  createRecurso(recurso){
   this.recursosCollection.add(recurso);
  }

  readRecurso(){
    return this.recursos
  }

  updateitem(recurso){
    this.recursoDoc = this.afs.doc<Recurso>(`items/${recurso.id}`);
    this.recursoDoc.update(recurso);
  }

  deleteRecurso(recurso){
    this.recursoDoc = this.afs.doc<Recurso>(`items/${recurso.id}`);
    this.recursoDoc.delete();
  }  

}