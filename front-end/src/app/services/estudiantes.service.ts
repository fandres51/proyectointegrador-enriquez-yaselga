import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Estudiante } from '../models/estudiante';

@Injectable({
  providedIn: 'root'
})
export class EstudiantesService {
  
  estudiantesCollection: AngularFirestoreCollection<Estudiante>;
  estudiantes: Observable<Estudiante[]>;
  estudianteDoc: AngularFirestoreDocument<Estudiante>;

  constructor(public afs: AngularFirestore) {
    this.estudiantesCollection = afs.collection<Estudiante>('Asociacion/AEIS/Persona');
    // this.estudiantes = this.estudiantesCollection.valueChanges();
    this.estudiantes = this.estudiantesCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Estudiante;
        data.id = a.payload.doc.id;
        return data;
      }))
    );
  }

  getEstudiante() {
    return this.estudiantes;
  }

  updateEstudiante(estudiante: Estudiante) {
    this.estudianteDoc = this.afs.doc(`Asociacion/AEIS/Persona/${estudiante.id}`)
    this.estudianteDoc.update(estudiante);    
  }
}
