import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase';
import { AsociacionService } from './asociacion.service';
import { Contador } from '../models/contador';
import { Producto } from '../models/producto';


@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  productoesCollection: AngularFirestoreCollection<Producto>

  constructor(
    private afs: AngularFirestore,
    private asociacionService: AsociacionService
  ) { }

  getCollection(): AngularFirestoreCollection<Producto> {
    return this.afs.collection<Producto>('Asociacion/AEIS/Producto');
  }

  getProductos(): Observable<Producto[]> {
    return this.getCollection().snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Producto;
        Object.keys(data).filter(
          key => data[key] instanceof firebase.firestore.Timestamp
        ).forEach(
          key => data[key] = data[key].toDate()
        ) //convierte todos los objetos Timestamp a Date
        return data;
      }))
    )
  }

  getProductosxFilial(idFilial: string): Observable<Producto> {
    return this.getCollection().doc<Producto>(idFilial).snapshotChanges().pipe(
      map( a => {
        const data = a.payload.data() as Producto;

        Object.keys(data).filter(
          key => data[key] instanceof firebase.firestore.Timestamp
        ).forEach(
          key => data[key] = data[key].toDate()
        ) //convierte todos los objetos Timestamp a Date

        return data;
      })
    );
  }

  getProducto(id: string): Observable<Producto> {
    return this.getCollection().doc<Producto>(id).snapshotChanges().pipe(
      map( a => {
        const data = a.payload.data() as Producto;

        Object.keys(data).filter(
          key => data[key] instanceof firebase.firestore.Timestamp
        ).forEach(
          key => data[key] = data[key].toDate()
        ) //convierte todos los objetos Timestamp a Date

        return data;
      })
    );
  }

  updateProducto(producto: Producto) {
    this.afs.collection('Asociacion/AEIS/Producto').doc(producto.id).set(producto)
  }

  addProducto(nuevaProducto: Producto) {
    let bool = true; //eveita un bucle infinito X((
    this.asociacionService.getContador('Producto').subscribe(
      (contador: Contador) => {
        if (bool) {
          nuevaProducto.id = 'ASG' + contador.contador;
          this.getCollection().doc('ASG' + contador.contador).set(nuevaProducto);
          this.asociacionService.increaseContador('Producto');
          bool = false
        }
      },
      error => {
        console.error(error);
      }
    )
  }

  asignarProducto(productoId: string, idFilialX: string ){
    this.getCollection().doc(productoId).update({idFilial:idFilialX})
  }

}
