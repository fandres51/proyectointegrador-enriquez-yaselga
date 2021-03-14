import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase';
import { FilialService } from './filial.service';
import { Contador } from '../models/contador';
import { Proveedor } from '../models/proveedor';
import * as Papa from 'papaparse';
import { AsociacionService } from './asociacion.service';

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {
  proveedoresCollection: AngularFirestoreCollection<Proveedor>
  proveedorPrueba: Proveedor;

  constructor(
    private afs: AngularFirestore,
    private filialService: FilialService,
    private asociacionService: AsociacionService
  ) { }

  getCollection(): AngularFirestoreCollection<Proveedor> {
    return this.afs.collection<Proveedor>('Asociacion/AEIS/Filial');
  }
  getCollectionID(idFilial: string): AngularFirestoreCollection<Proveedor> {
    ////console.log(">>>Path: Asociacion/AEIS/Filial/"+idFilial+"/Proveedor");
    return this.afs.collection<Proveedor>('Asociacion/AEIS/Filial/' + idFilial + "/Proveedor");
  }

  getProveedores(idFilial: string): Observable<Proveedor[]> {
    ////console.log(">>>Llego: ");
    return this.getCollectionID(idFilial).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Proveedor;
        ////console.log(">>>Proveedores1: ",data);
        Object.keys(data).filter(
          key => data[key] instanceof firebase.firestore.Timestamp
        ).forEach(
          key => data[key] = data[key].toDate()
        ) //convierte todos los objetos Timestamp a Date
        ////console.log(">>>Proveedores2: ",data);
        data.id = a.payload.doc.id;
        return data;
      }))
    )
  }

  getProveedor(id: string, idFilial: string): Observable<Proveedor> {
    return this.getCollection().doc<Proveedor>('/' + idFilial + '/Proveedor/' + id).snapshotChanges().pipe(
      map(a => {
        const data = a.payload.data() as Proveedor;
        Object.keys(data).filter(
          key => data[key] instanceof firebase.firestore.Timestamp
        ).forEach(
          key => data[key] = data[key].toDate()
        ) //convierte todos los objetos Timestamp a Date

        data.id = a.payload.id;
        return data;
      })
    );
  }

  updateProveedor(proveedor: Proveedor, idFilial: string) {
    this.afs.collection('Asociacion/AEIS/Filial/' + idFilial + '/Proveedor').doc(proveedor.id).set(proveedor)
  }

  deleteProveedor(idproveedor: string, idFilial: string) {
    this.getCollection().doc('/' + idFilial + '/Proveedor/' + idproveedor).delete();
    let bool = true;
    this.filialService.getContador('Proveedor', idFilial).subscribe(
      (contador: Contador) => {
        if (bool) {
          this.getCollection().doc('/' + idFilial + '/Proveedor/' + 'PRD' + contador.contador).delete();
          //this.filialService.decreaseContador('Proveedor',idFilial);
          bool = false
        }
      },
      error => {
        console.error(error);
      }
    )
  }

  addProveedor(nuevoProveedor: Proveedor, idFilial: string) {
    let bool = true; //eveita un bucle infinito X((
    this.asociacionService.getContador('Proveedor').subscribe(
      (contador: Contador) => {
        if (bool) {
          nuevoProveedor.id = 'PROV' + contador.contador;
          this.getCollectionID(idFilial).doc('PROV' + contador.contador).set(nuevoProveedor);
          this.asociacionService.increaseContador('Proveedor');
          bool = false
        }
      },
      error => {
        console.error(error);
      }
    )
  }

  getCollectionX(): AngularFirestoreCollection<Proveedor> {
    return this.afs.collection<Proveedor>('Asociacion/AEIS/Filial');
  }

  addProveedorX(proveedorPrueba: Proveedor, idFilial: string) {
    this.getCollectionX().doc('/' + idFilial + '/Proveedor/' + 'PRD1').set(proveedorPrueba);
  }

  darDeBaja(id: string, idFilial: string) {
    const recursoDoc: AngularFirestoreDocument<Proveedor> = this.getCollection().doc('/' + idFilial + '/Proveedor/' + id);
    recursoDoc.update({
      estado: false
    });
  }

  cargaMasivaProveedores(file, filialID: string): Promise<string[]> {
    return new Promise(
      (resF) => {
        Papa.parse(file, {
          complete: res => {
            this.firethisProveedor(res['data'], filialID).then(
              proveedoresNoIngresadas => resF(proveedoresNoIngresadas)
            ).catch(
              e => console.error('Archivo no admitido')
            )
          },
          header: true
        });
      }
    )
  }

  private firethisProveedor(proveedores: Proveedor[], filialID: string): Promise<string[]> {
    const proveedoresNoIngresados: string[] = [];
    
    return new Promise((resolve) => {
      proveedores.forEach((proveedor, i) => {
        proveedor.estado = true;
        const respuesta = this.comprobarEstructura(proveedor);
        if (proveedor.nombre && proveedor.contacto) {
          const x = this;
          setTimeout(function () {
            x.addProveedor(proveedor, filialID);
          }, 400 * i);
        } else {
          proveedoresNoIngresados.push(
            'Nombre: ' +
            proveedor.nombre +
            'Razón: ' +
            respuesta
          );
        }
      })
      resolve(proveedoresNoIngresados);
    })
  }

  private comprobarEstructura(proveedor: Proveedor): string {
    let razon: string = '';
    if (!proveedor.nombre) {
      razon = 'No existe nombre';
    }
    if (
      proveedor.contacto === "" || proveedor.contacto.length > 10
    ) {
      razon = 'Telefono De Contacto No Admitido';
    }
    return razon;
  }

}
