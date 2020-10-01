import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import * as firebase from 'firebase';
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

  constructor(
    private afs: AngularFirestore
  ){}

  getCollection(): AngularFirestoreCollection<Recurso> {
    return this.afs.collection<Recurso>('Asociacion/AEIS/Recurso');
  }

  getRecursos(): Observable<Recurso[]>{
    return this.getCollection().snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Recurso;

        Object.keys(data).filter(
          key => data[key] instanceof firebase.firestore.Timestamp
        ).forEach(
          key => data[key] = data[key].toDate()
        ) //convierte todos los objetos Timestamp a Date

        data.id = a.payload.doc.id;
        return data;
      }))
    )
  }
  
  getRecurso(id: string): Observable<Recurso> {
    return this.afs.doc<Recurso>(`Asociacion/AEIS/Recurso/${id}`).snapshotChanges().pipe(
      map(a => {
        const data = a.payload.data() as Recurso;

        Object.keys(data).filter(
          key => data[key] instanceof firebase.firestore.Timestamp
        ).forEach(
          key => data[key] = data[key].toDate()
        ) //convierte todos los objetos Timestamp a Date

        return data;
      })
    );
  }

  crearRecurso(recurso: Recurso) {
    this.getCollection().doc(recurso.id).set(recurso);
  }
  
  existeRecurso(id: string): Promise<boolean> {
    return new Promise(
      (res) => {
        return this.afs.collection<Recurso>('Asociacion/AEIS/Recurso', ref => ref.where('id', '==', id)).valueChanges().subscribe(
          recursos => {
            if (recursos.length)
              res(true);
            else
              res(false)
          }
        );
      }
    )
  }

  update(recurso: Recurso) {
    const recursoDoc: AngularFirestoreDocument<Recurso> = this.afs.collection('Asociacion/AEIS/Recurso').doc(recurso.id);
    recursoDoc.update(recurso);
  }

  darDeBaja(id: string) {
    const recursoDoc: AngularFirestoreDocument<Recurso> = this.getCollection().doc(id);
    recursoDoc.update({
      estado: 'Baja'
    });
  }

  actualizarEstado(id: string, nuevoestado: string) {
    const recursoDoc: AngularFirestoreDocument<Recurso> = this.getCollection().doc(id);
    recursoDoc.update({
      estado: nuevoestado
    });
  }

  actualizarCondicion(id: string, nuevacondicion: string) {
    const recursoDoc: AngularFirestoreDocument<Recurso> = this.getCollection().doc(id);
    recursoDoc.update({
      condicion: nuevacondicion
    });
  }
  
  delete(recurso){
    this.recursoDoc = this.afs.doc<Recurso>(`items/${recurso.id}`);
    this.recursoDoc.delete();
  }
  

}