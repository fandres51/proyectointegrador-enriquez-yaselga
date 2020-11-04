import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase';
import { AsociacionService } from './asociacion.service';
import { Contador } from '../models/contador';
import { Reserva } from '../models/reserva'

@Injectable({
  providedIn: 'root'
})
export class ReservaService {
  reservasCollection: AngularFirestoreCollection<Reserva>

  constructor(
    private afs: AngularFirestore,
    private asociacionService: AsociacionService
  ) { }

  getCollection(): AngularFirestoreCollection<Reserva> {
    return this.afs.collection<Reserva>('Asociacion/AEIS/Reserva');
  }

  getReservas(): Observable<Reserva[]> {
    return this.getCollection().snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Reserva;
        Object.keys(data).filter(
          key => data[key] instanceof firebase.firestore.Timestamp
        ).forEach(
          key => data[key] = data[key].toDate()
        ) //convierte todos los objetos Timestamp a Date
        return data;
      }))
    )
  }

  getReserva(id: string): Observable<Reserva> {
    return this.getCollection().doc<Reserva>(id).snapshotChanges().pipe(
      map( a => {
        const data = a.payload.data() as Reserva;

        Object.keys(data).filter(
          key => data[key] instanceof firebase.firestore.Timestamp
        ).forEach(
          key => data[key] = data[key].toDate()
        ) //convierte todos los objetos Timestamp a Date

        return data;
      })
    );
  }

  updateReserva(transaccion: Reserva) {
    this.afs.collection('Asociacion/AEIS/Reserva').doc(transaccion.id).set(transaccion)
  }

  addReserva(nuevaReserva: Reserva) {
    let bool = true; //eveita un bucle infinito X((
    this.asociacionService.getContador('Reserva').subscribe(
      (contador: Contador) => {
        if (bool) {
          nuevaReserva.id = 'ASG' + contador.contador;
          this.getCollection().doc('ASG' + contador.contador).set(nuevaReserva);
          this.asociacionService.increaseContador('Reserva');
          bool = false
        }
      },
      error => {
        console.error(error);
      }
    )
  }

  finalizaReserva(reservaId: string){
    this.getCollection().doc(reservaId).update({fechaFin:new Date(),estado:false});
  }

  anularReserva(reservaId: string){
    this.getCollection().doc(reservaId).update({estado:false});
  }

  borrarReserva(reservaId: string){
    this.getCollection().doc(reservaId).delete();
  }



}
