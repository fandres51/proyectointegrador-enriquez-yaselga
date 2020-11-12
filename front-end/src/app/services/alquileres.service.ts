import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase';
import { AsociacionService } from './asociacion.service';
import { Contador } from '../models/contador';
import { Alquiler } from '../models/alquiler';

@Injectable({
  providedIn: 'root'
})
export class AlquileresService {
  alquileresCollection: AngularFirestoreCollection<Alquiler>

  constructor(
    private afs: AngularFirestore,
    private asociacionService: AsociacionService
  ) { }

  getCollection(): AngularFirestoreCollection<Alquiler> {
    return this.afs.collection<Alquiler>('Asociacion/AEIS/Alquiler');
  }

  getAlquileres(): Observable<Alquiler[]> {
    return this.getCollection().snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Alquiler;
        Object.keys(data).filter(
          key => data[key] instanceof firebase.firestore.Timestamp
        ).forEach(
          key => data[key] = data[key].toDate()
        ) //convierte todos los objetos Timestamp a Date
        return data;
      }))
    )
  }

  getAlquiler(id: string): Observable<Alquiler> {
    return this.getCollection().doc<Alquiler>(id).snapshotChanges().pipe(
      map( a => {
        const data = a.payload.data() as Alquiler;

        Object.keys(data).filter(
          key => data[key] instanceof firebase.firestore.Timestamp
        ).forEach(
          key => data[key] = data[key].toDate()
        ) //convierte todos los objetos Timestamp a Date

        return data;
      })
    );
  }

  updateAlquiler(alquiler: Alquiler) {
    this.afs.collection('Asociacion/AEIS/Alquiler').doc(alquiler.id).set(alquiler)
  }

  addAlquiler(nuevaAlquiler: Alquiler) {
    let bool = true; //eveita un bucle infinito X((
    this.asociacionService.getContador('Alquiler').subscribe(
      (contador: Contador) => {
        if (bool) {
          nuevaAlquiler.id = 'ASG' + contador.contador;
          this.getCollection().doc('ASG' + contador.contador).set(nuevaAlquiler);
          this.asociacionService.increaseContador('Alquiler');
          bool = false
        }
      },
      error => {
        console.error(error);
      }
    )
  }

  desalquilar(alquilerId: string){
    this.getCollection().doc(alquilerId).update({fechaFin:new Date()})
  }

}
