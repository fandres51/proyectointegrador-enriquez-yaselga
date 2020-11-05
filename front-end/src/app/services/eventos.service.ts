import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { Contador } from '../models/contador';
import { Evento } from '../models/evento';
import { AsociacionService } from './asociacion.service';

@Injectable({
  providedIn: 'root'
})

export class EventosService {

  constructor(
    private afs: AngularFirestore,
    private asociacionService: AsociacionService
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

  getEvento(id: string): Observable<Evento> {
    return this.getCollection().doc<Evento>(id).valueChanges();
  }

  addEvento(nuevoEvento: Evento) {
    let bool = true; //eveita un bucle infinito X((
    this.asociacionService.getContador('Evento').subscribe(
      (contador: Contador) => {
          if(bool) {
            nuevoEvento.id = 'EVN' + contador.contador;
            this.getCollection().doc('EVN' + contador.contador).set(nuevoEvento);
            this.asociacionService.increaseContador('Evento');
            bool = false
          }
      },
      error => {
        console.error(error);
      }
    )
  }

  updateEvento(evento: Evento) {
    this.getCollection().doc(evento.id).set(evento);
  }

  deleteEvento(eventoId: string) {
    const eventoAElimiar = this.getCollection().doc(eventoId);
    eventoAElimiar.delete();
  }
}
