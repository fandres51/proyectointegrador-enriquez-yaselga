import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase';
import { FilialService } from './filial.service';
import { Contador } from '../models/contador';
import { Proveedor } from '../models/proveedor';
import * as Papa from 'papaparse';

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {
  proveedoresCollection: AngularFirestoreCollection<Proveedor>
  proveedorPrueba: Proveedor;

  constructor(
    private afs: AngularFirestore,
    private filialService: FilialService
  ) { }

  getCollection(): AngularFirestoreCollection<Proveedor> {
    return this.afs.collection<Proveedor>('Asociacion/AEIS/Filial');
  }
  getCollectionID(idFilial: string): AngularFirestoreCollection<Proveedor> {
    //console.log(">>>Path: Asociacion/AEIS/Filial/"+idFilial+"/Proveedor");
    return this.afs.collection<Proveedor>('Asociacion/AEIS/Filial/'+idFilial+"/Proveedor");
  }

  getProveedores(idFilial:string): Observable<Proveedor[]> {
    //console.log(">>>Llego: ");
    return this.getCollectionID(idFilial).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Proveedor;
        //console.log(">>>Proveedores1: ",data);
        Object.keys(data).filter(
          key => data[key] instanceof firebase.firestore.Timestamp
        ).forEach(
          key => data[key] = data[key].toDate()
        ) //convierte todos los objetos Timestamp a Date
        //console.log(">>>Proveedores2: ",data);
        return data;
      }))
    )
  }

  getProveedor(id: string, idFilial: string ): Observable<Proveedor> {
    return this.getCollection().doc<Proveedor>('/'+idFilial+'/Proveedor/'+id).snapshotChanges().pipe(
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

  updateProveedor(proveedor: Proveedor, idFilial: string) {
    this.afs.collection('Asociacion/AEIS/Filial/'+idFilial+'/Proveedor').doc(proveedor.id).set(proveedor)
  }

  deleteProveedor(idproveedor: string, idFilial: string) {
    this.getCollection().doc('/'+idFilial+'/Proveedor/'+idproveedor).delete();
    let bool = true; 
    this.filialService.getContador('Proveedor',idFilial).subscribe(
      (contador: Contador) => {
        if (bool) {        
          this.getCollection().doc('/'+idFilial+'/Proveedor/'+'PRD' + contador.contador).delete();
          this.filialService.decreaseContador('Proveedor',idFilial);
          bool = false
        }
      },
      error => {
        console.error(error);
      }
    )
    }

  addProveedor(nuevaProveedor: Proveedor, idFilial:string) {
    let idcontador: number;
    let bool = true; //eveita un bucle infinito X((
    this.filialService.getContador('Proveedor',idFilial).subscribe(
      (contador: Contador) => {
        if(contador.contador>=1){
          idcontador=contador.contador+1;
        }else{
          idcontador=1
        }
        if (bool) {
          nuevaProveedor.id = 'PRD' + idcontador;
          this.getCollection().doc('/'+idFilial+'/Proveedor/'+'PRD' + idcontador).set(nuevaProveedor);
          if(idcontador==1){
            this.filialService.createContador('Proveedor',idFilial);
          }else{
            this.filialService.increaseContador('Proveedor',idFilial);
          }
          
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

  addProveedorX(proveedorPrueba:Proveedor, idFilial:string) {
    this.getCollectionX().doc('/'+idFilial+'/Proveedor/'+'PRD1').set(proveedorPrueba);
  }

  darDeBaja(id: string, idFilial:string) {
    const recursoDoc: AngularFirestoreDocument<Proveedor> = this.getCollection().doc('/'+idFilial+'/Proveedor/'+id);
    recursoDoc.update({
      estado: false
    });
  }

  cargaMasivaProveedores(file,idFilial:string): Promise<string[]> {
    return new Promise(
      (resF) => {
        Papa.parse(file, {
          complete: res => {
            this.firethisProveedor(res['data'], idFilial).then(
              proveedoresNoIngresados => resF(proveedoresNoIngresados)
            ).catch (
              e => console.error('Archivo no admitido')
            )
          },
          header: true
        });
      }
    )
  }
  private firethisProveedor(proveedores: Proveedor[], idFilial: string): Promise<string[]> {
    const proveedoresNoIngresados: string[] = [];
    return new Promise((resolve) => {
      proveedores.forEach((proveedor) => {
        
        if(proveedor.descripcion!= null)proveedor.descripcion = proveedor.descripcion.toUpperCase();
        proveedor.nombre = proveedor.nombre.toUpperCase();
        const razon = this.comprobarEstructura(proveedor);
        if (!razon) {
          this.getCollection().doc('/'+idFilial+'/Proveedor/'+proveedor.id).set(proveedor);
        } else {
          proveedoresNoIngresados.push(
            'ID: ' + 
            proveedor.id + 
            'Razón: ' + 
            razon  
          );
        }
      })
      resolve(proveedoresNoIngresados);
    })
  }

  private comprobarEstructura(proveedor: Proveedor): string {
    let razon: string = '';
    if (
      proveedor.contacto != ""||proveedor.contacto.length>10
    ) {
      razon = 'Telefono De Contacto No Admitido';
    }
    return razon;
  }

}
