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
    this.estudiantes = this.estudiantesCollection.valueChanges();
  }

  getEstudiante() {
    return this.estudiantes;
  }

}
