import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Estudiante } from '../models/estudiante';
import * as firebase from 'firebase';

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
        Object.keys(data).filter(key => data[key] instanceof firebase.firestore.Timestamp)
                        .forEach(key => data[key] = data[key].toDate())
        data.id = a.payload.doc.id;
        return data;
      }))
    );
  }

  getEstudiante() {
    return this.estudiantes;
  }

  updateEstudiante(estudiante: Estudiante) {
    if(estudiante.FechaNacimiento instanceof Date) {
      estudiante.FechaNacimiento = firebase.firestore.Timestamp.fromDate(estudiante.FechaNacimiento);
    }
    this.estudianteDoc = this.afs.doc(`Asociacion/AEIS/Persona/${estudiante.id}`)
    this.estudianteDoc.update(estudiante);    
  }
}
