import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase';
import { AsociacionService } from './asociacion.service';
import { Contador } from '../models/contador';
import { Proveedor } from '../models/proveedor';

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {
  proveedoresCollection: AngularFirestoreCollection<Proveedor>

  constructor(
    private afs: AngularFirestore,
    private asociacionService: AsociacionService
  ) { }

  getCollection(): AngularFirestoreCollection<Proveedor> {
    return this.afs.collection<Proveedor>('Asociacion/AEIS/Proveedor');
  }

  getProveedores(): Observable<Proveedor[]> {
    return this.getCollection().snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Proveedor;
        Object.keys(data).filter(
          key => data[key] instanceof firebase.firestore.Timestamp
        ).forEach(
          key => data[key] = data[key].toDate()
        ) //convierte todos los objetos Timestamp a Date
        return data;
      }))
    )
  }

  getProveedoresxFilial(idFilial: string): Observable<Proveedor> {
    return this.getCollection().doc<Proveedor>(idFilial).snapshotChanges().pipe(
      map( a => {
        const data = a.payload.data() as Proveedor;

        Object.keys(data).filter(
          key => data[key] instanceof firebase.firestore.Timestamp
        ).forEach(
          key => data[key] = data[key].toDate()
        ) //convierte todos los objetos Timestamp a Date

        return data;
      })
    );
  }

  getProveedor(id: string): Observable<Proveedor> {
    return this.getCollection().doc<Proveedor>(id).snapshotChanges().pipe(
      map( a => {
        const data = a.payload.data() as Proveedor;

        Object.keys(data).filter(
          key => data[key] instanceof firebase.firestore.Timestamp
        ).forEach(
          key => data[key] = data[key].toDate()
        ) //convierte todos los objetos Timestamp a Date

        return data;
      })
    );
  }

  updateProveedor(proveedor: Proveedor) {
    this.afs.collection('Asociacion/AEIS/Proveedor').doc(proveedor.id).set(proveedor)
  }

  addProveedor(nuevaProveedor: Proveedor) {
    let bool = true; //eveita un bucle infinito X((
    this.asociacionService.getContador('Proveedor').subscribe(
      (contador: Contador) => {
        if (bool) {
          nuevaProveedor.id = 'ASG' + contador.contador;
          this.getCollection().doc('ASG' + contador.contador).set(nuevaProveedor);
          this.asociacionService.increaseContador('Proveedor');
          bool = false
        }
      },
      error => {
        console.error(error);
      }
    )
  }

  asignarProveedor(proveedorId: string, idFilialX: string[] ){
    this.getCollection().doc(proveedorId).update({idFilial:idFilialX})
  }

}
