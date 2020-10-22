import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Evento } from '../models/evento';

@Injectable({
  providedIn: 'root'
})

export class EventosService {

  constructor(
    private afs: AngularFirestore
  ) { }


  getCollection(): AngularFirestoreCollection<Evento> {
    return this.afs.collection<Evento>('Asociacion/AEIS/Evento');
  }

  getEventos(): Observable<Evento[]> {
    return this.getCollection().snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Evento;
        data.id = a.payload.doc.id;
        return data;
      }))
    )
  }

  addEvento(nuevoEvento: Evento) {
    this.getCollection().doc(nuevoEvento.id).set(nuevoEvento)
  }
}
