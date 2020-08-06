import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
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
    return this.getCollection().valueChanges();
  }

  addEvento(nuevoEvento: Evento) {
    this.asociacionService.getContador('Evento').subscribe(
      (contador: Contador) => {
        this.getCollection().doc('EVN'+contador.contador).set(nuevoEvento);
        // this.asociacionService.increaseContador('Evento', contador.contador);
      }
    )
  }
}
