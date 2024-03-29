import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase';
import { FilialService } from './filial.service';
import { Contador } from '../models/contador';
import { Producto } from '../models/producto';
import * as Papa from 'papaparse';
import { AsociacionService } from './asociacion.service';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  productoCollection: AngularFirestoreCollection<Producto>
  productoPrueba: Producto;

  constructor(
    private afs: AngularFirestore,
    private filialService: FilialService,
    private asociacionService: AsociacionService
  ) { }

  getCollection(): AngularFirestoreCollection<Producto> {
    return this.afs.collection<Producto>('Asociacion/AEIS/Filial');
  }
  getCollectionID(idFilial: string): AngularFirestoreCollection<Producto> {
    ////console.log(">>>Path: Asociacion/AEIS/Filial/"+idFilial+"/Producto");
    return this.afs.collection<Producto>('Asociacion/AEIS/Filial/' + idFilial + "/Producto");
  }

  getProductos(idFilial: string): Observable<Producto[]> {
    ////console.log(">>>Llego: ");
    return this.getCollectionID(idFilial).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Producto;
        ////console.log(">>>Productos1: ",data);
        Object.keys(data).filter(
          key => data[key] instanceof firebase.firestore.Timestamp
        ).forEach(
          key => data[key] = data[key].toDate()
        ) //convierte todos los objetos Timestamp a Date
        ////console.log(">>>Productos2: ",data);
        return data;
      }))
    )
  }

  getProducto(id: string, idFilial: string): Observable<Producto> {
    return this.getCollection().doc<Producto>('/' + idFilial + '/Producto/' + id).snapshotChanges().pipe(
      map(a => {
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

  updateProducto(producto: Producto, idFilial: string) {
    this.afs.collection('Asociacion/AEIS/Filial/' + idFilial + '/Producto').doc(producto.id).set(producto)
  }

  deleteProducto(idproducto: string, idFilial: string) {
    this.getCollection().doc('/' + idFilial + '/Producto/' + idproducto).delete();
    let bool = true;
    this.filialService.getContador('Producto', idFilial).subscribe(
      (contador: Contador) => {
        if (bool) {
          this.getCollection().doc('/' + idFilial + '/Producto/' + 'PRD' + contador.contador).delete();
          //this.filialService.decreaseContador('Producto',idFilial);
          bool = false
        }
      },
      error => {
        console.error(error);
      }
    )
  }

  addProducto(nuevoProducto: Producto, idFilial: string) {
    let bool = true; //eveita un bucle infinito X((
    this.asociacionService.getContador('Producto').subscribe(
      (contador: Contador) => {
        if (bool) {
          nuevoProducto.id = 'PROD' + contador.contador;
          this.getCollectionID(idFilial).doc('PROD' + contador.contador).set(nuevoProducto);
          //console.log("Preducto ", nuevoProducto.id ," : ",nuevoProducto)
          this.asociacionService.increaseContador('Producto');
          //console.log("Contador: ",contador.contador);
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

  addProductoX(productoPrueba: Producto, idFilial: string) {
    this.getCollectionX().doc('/' + idFilial + '/Producto/' + 'PRD1').set(productoPrueba);
  }

  darDeBaja(id: string, idFilial: string) {
    const recursoDoc: AngularFirestoreDocument<Producto> = this.getCollection().doc('/' + idFilial + '/Producto/' + id);
    recursoDoc.update({
      estado: false
    });
  }

  cargaMasivaProductos(file, filialID): Promise<string[]> {
    return new Promise(
      (resF) => {
        Papa.parse(file, {
          complete: res => {
            this.firethisProducto(res['data'], filialID).then(
              productosNoIngresadas => resF(productosNoIngresadas)
            ).catch(
              e => console.error('Archivo no admitido')
            )
          },
          header: true
        });
      }
    )
  }

  private firethisProducto(productos: Producto[], filialID: string): Promise<string[]> {
    const productosNoIngresados: string[] = [];

    return new Promise((resolve) => {
      productos.forEach((producto, i) => {
        producto.precio = Number(producto.precio)
        producto.estado = true;
        // const respuesta = this.comprobarEstructura(producto);
        console.log('Nom>>', producto.nombre, '\nPre>>', producto.precio);
        if (producto.nombre && producto.precio) {
          const x = this;
          setTimeout(function () {
            let bool = true; //eveita un bucle infinito X((
              x.asociacionService.getContador('Producto').subscribe(
              (contador: Contador) => {
                if (bool) {
                  producto.id = 'PROD' + contador.contador;
                  x.getCollectionID(filialID).doc('PROD' + contador.contador).set(producto);
                  //console.log("Preducto ", nuevoProducto.id ," : ",nuevoProducto)
                  x.asociacionService.increaseContador('Producto');
                  //console.log("Contador: ",contador.contador);
                  bool = false
                }
              },
              error => {
                console.error(error);
              }
            )
          }, 400 * i);

        } else {
          productosNoIngresados.push(
            'Nombre' +
            producto.nombre
          );
        }

      })
      resolve(productosNoIngresados);
    })
  }

  private comprobarEstructura(producto: Producto): string {
    let razon: string = '';
    if (!producto.nombre) {
      razon = 'Sin nombre';
    }
    if (
      producto.precio < 0
    ) {
      razon = 'precio menor que 0';
    }
    return razon;
  }

}
