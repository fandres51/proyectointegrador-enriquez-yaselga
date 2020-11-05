import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase';
import { FilialService } from './filial.service';
import { Contador } from '../models/contador';
import { Producto } from '../models/producto';
import * as Papa from 'papaparse';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  productoesCollection: AngularFirestoreCollection<Producto>
  idfilial:string;
  productoPrueba: Producto;

  constructor(
    private afs: AngularFirestore,
    private filialService: FilialService
  ) { }

  getCollection(idFilial:string): AngularFirestoreCollection<Producto> {
    return this.afs.collection<Producto>('Asociacion/AEIS/Filial/'+idFilial+'/Producto');
  }

  getProductos(idFilial:string): Observable<Producto[]> {
    return this.getCollection(idFilial).snapshotChanges().pipe(
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

  getProducto(id: string, idFilial:string): Observable<Producto> {
    return this.getCollection(idFilial).doc<Producto>(id).snapshotChanges().pipe(
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

  updateProducto(producto: Producto, idfilial: string) {
    this.afs.collection('Asociacion/AEIS/Filial/'+idfilial+'/Producto').doc(producto.id).set(producto)
  }

  addProducto(nuevaProducto: Producto, idFilial:string) {
    let producto:Producto;
    producto.id='PRD';
    producto.nombre='producto quemado de prueba';
    producto.precio=5;

    let bool = true; //eveita un bucle infinito X((
    this.filialService.getContador('Producto',idFilial).subscribe(
      (contador: Contador) => {
        if (bool) {
          nuevaProducto.id = 'PRD' + contador.contador;
          this.getCollectionX().doc('/'+idFilial+'/Producto/'+'PRD' + contador.contador).set(nuevaProducto);
          this.filialService.increaseContador('Producto',idFilial);
          bool = false
        }
      },
      error => {
        console.error(error);
      }
    )
  }

  getCollectionX(): AngularFirestoreCollection<Producto> {
    return this.afs.collection<Producto>('Asociacion/AEIS/Filial');
  }

  addProductoX(productoPrueba:Producto, idparametro:string) {
    this.getCollectionX().doc('/'+idparametro+'/Producto/'+'PRD1').set(productoPrueba);
  }

  asignarProducto(productoId: string, idFilial: string ){
    this.getCollection(idFilial).doc(productoId).update({idFilial:idFilial})
  }

  cargaMasivaProductos(file,idFilial:string): Promise<string[]> {
    return new Promise(
      (resF) => {
        Papa.parse(file, {
          complete: res => {
            this.firethisProducto(res['data'],idFilial).then(
              productosNoIngresados => resF(productosNoIngresados)
            ).catch (
              e => console.error('Archivo no admitido')
            )
          },
          header: true
        });
      }
    )
  }
  private firethisProducto(productos: Producto[], idFilial:string): Promise<string[]> {
    const productosNoIngresados: string[] = [];
    return new Promise((resolve) => {
      productos.forEach((producto) => {
        
        if(producto.descripcion!= null)producto.descripcion = producto.descripcion.toUpperCase();
        if(producto.idproveedor!=null)producto.idproveedor = producto.idproveedor.toUpperCase();
        producto.nombre = producto.nombre.toUpperCase();
        const razon = this.comprobarEstructura(producto);
        if (!razon) {
          this.getCollection(idFilial).doc(producto.id).set(producto);
        } else {
          productosNoIngresados.push(
            'ID: ' + 
            producto.id + 
            'Razón: ' + 
            razon  
          );
        }
      })
      resolve(productosNoIngresados);
    })
  }

  private comprobarEstructura(producto: Producto): string {
    let razon: string = '';
    if (
      producto.precio < -1
    ) {
      razon = 'precio';
    }
    return razon;
  }

}
