import { Injectable } from '@angular/core';
import { Transaccion } from '../models/transaccion';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase';
import { AsociacionService } from './asociacion.service';
import { Contador } from '../models/contador';
import * as Papa from 'papaparse';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TransaccionesService {

  nombreUsuario: string;

  constructor(
    private afs: AngularFirestore,
    private authService: AuthService
  ) { 
    this.authService.auth.user.subscribe(
      user => {
        this.nombreUsuario = user.displayName;
      },
      error => {
        console.error(error);
      }
    )
  }

  getCollection(): AngularFirestoreCollection<Transaccion> {
    return this.afs.collection<Transaccion>('Asociacion/AEIS/Transaccion');
  }

  getTransacciones(): Observable<Transaccion[]> {
    return this.getCollection().snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Transaccion;
        Object.keys(data).filter(
          key => data[key] instanceof firebase.firestore.Timestamp
        ).forEach(
          key => data[key] = data[key].toDate()
        ) //convierte todos los objetos Timestamp a Date
        data.id = a.payload.doc.id;
        return data;
      }))
    )
  }

  getTransaccionesPorFilial(filialID:string): Observable<Transaccion[]> {
    return this.afs.collection(
      'Asociacion/AEIS/Transaccion',
      ref => ref.where('FilialID', '==', filialID)
    ).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Transaccion;
        Object.keys(data).filter(
          key => data[key] instanceof firebase.firestore.Timestamp
        ).forEach(
          key => data[key] = data[key].toDate()
        ) //convierte todos los objetos Timestamp a Date

        data.id = a.payload.doc.id;
        return data;
      }))
    )
  }

  getTransaccion(id: string): Observable<Transaccion> {
    return this.getCollection().doc<Transaccion>(id).snapshotChanges().pipe(
      map( a => {
        const data = a.payload.data() as Transaccion;

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

  updateTransaccion(transaccion: Transaccion) {
    this.afs.collection('Asociacion/AEIS/Transaccion').doc(transaccion.id).set(transaccion)
  }

  addTransaccion(nuevaTransaccion: Transaccion) {
    nuevaTransaccion.PersonaIngreso = this.nombreUsuario;
    nuevaTransaccion.FechaIngreso = new Date();
    this.getCollection().add(nuevaTransaccion);
  }

  darDeBajaTransaccion(transaccionId: string) {
    this.getCollection().doc(transaccionId).update({Activa: false})
  }

  reactivarTransaccion(transaccionId: string) {
    this.getCollection().doc(transaccionId).update({Activa: true})
  }

  cargaMasivaTransaccion(file, tipo='n/a', FilialID=''): Promise<string[]> {
    return new Promise(
      (resF) => {
        Papa.parse(file, {
          complete: res => {
            this.firethisTransaccion(res['data'], tipo,FilialID).then(
              transaccionesNoIngresadas => resF(transaccionesNoIngresadas)
            ).catch (
              e => console.error('Archivo no admitido')
            )
          },
          header: true
        });
      }
    )
  }

  private firethisTransaccion(transacciones: Transaccion[], tipo='n/a',FilialID=''): Promise<string[]> {
    const transaccionesNoIngresadas: string[] = [];
    return new Promise((resolve) => {
      transacciones.forEach((transaccion) => {
        transaccion.Fecha = new Date(transaccion.Fecha);
        transaccion.Monto = Number(transaccion.Monto)
        transaccion.Ingreso = true;
        transaccion.Activa = true;
        transaccion.Tipo = tipo;
        transaccion.FilialID = FilialID;
        const respuesta = this.comprobarEstructura(transaccion);
        if (!respuesta) {
          this.addTransaccion(transaccion);
        } else {
          transaccionesNoIngresadas.push(
            'Fecha: ' + 
            transaccion.Fecha.getDay() + '/' + 
            transaccion.Fecha.getMonth() + '/' + 
            transaccion.Fecha.getFullYear() + ' ' + 
            'Monto: ' + 
            transaccion.Monto + ' ' + 
            'Razón: ' + 
            respuesta
          );
        }
      })
      resolve(transaccionesNoIngresadas);
    })
  }

  private comprobarEstructura(transaccion: Transaccion): string {
    
    let respuesta: string = '';

    if (
      !transaccion.Fecha ||
      !(transaccion.Fecha instanceof Date)
    ) {
      respuesta = 'fecha';
    }
    if (
      !transaccion.Monto ||
      transaccion.Monto <= 0 ||
      typeof transaccion.Monto !== 'number'
    ) {
      respuesta = 'monto';
    }
    if (
      typeof transaccion.Ingreso !== 'boolean'
    ) {
      respuesta = 'tipo ingreso/egreso';
    }

    return respuesta;
  }
}
