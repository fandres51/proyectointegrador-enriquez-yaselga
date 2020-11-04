import { Injectable } from '@angular/core';
import { Filial } from '../models/filial';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase';
import { AsociacionService } from './asociacion.service';
import { Contador } from '../models/contador';
import * as Papa from 'papaparse';
import { Recurso } from '../models/recurso';
import { Asignacion } from '../models/asignacion';
import { AsignacionesService } from './asignaciones.service';

@Injectable({
  providedIn: 'root'
})
export class FilialService {

  filialesCollection: AngularFirestoreCollection<Filial>;
  filiales: Observable<Filial[]>;
  filialDoc: AngularFirestoreDocument<Filial>;
  asignacion : Asignacion;

  constructor(
    private afs: AngularFirestore,
    private asociacionService: AsociacionService,
    private asignacionService: AsignacionesService
  ) { }

  getCollection(): AngularFirestoreCollection<Filial> {
    return this.afs.collection<Filial>('Asociacion/AEIS/Filial');
  }

  getFiliales(): Observable<Filial[]>{
    return this.getCollection().snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Filial;
        Object.keys(data).filter(
          key => data[key] instanceof firebase.firestore.Timestamp
        ).forEach(
          key => data[key] = data[key].toDate()
        ) //convierte todos los objetos Timestamp a Date
        return data;
      }))
    )
  }

  getFilial(id: string):Observable<Filial>{
    return this.getCollection().doc<Filial>(id).snapshotChanges().pipe(
      map( a => {
        const data = a.payload.data() as Filial;

        Object.keys(data).filter(
          key => data[key] instanceof firebase.firestore.Timestamp
        ).forEach(
          key => data[key] = data[key].toDate()
        ) //convierte todos los objetos Timestamp a Date

        return data;
      })
    )
  }

  updateFilial(filial: Filial){
    this.afs.collection('Asociacion/AEIS/Filial').doc(filial.id).set(filial)
  }

  addFilial(nuevaFilial: Filial) {
    let bool = true; //eveita un bucle infinito X((
    this.asociacionService.getContador('Filial').subscribe(
      (contador: Contador) => {
        if (bool) {
          nuevaFilial.id = 'FIL' + contador.contador;
          this.getCollection().doc('FIL' + contador.contador).set(nuevaFilial);
          this.asociacionService.increaseContador('FIL');
          bool = false
        }
      },
      error => {
        console.error(error);
      }
    )
  }

  eliminarFilial(filial: Filial){
    this.afs.collection('Asociacion/AEIS/Filial').doc(filial.id).delete();
  }

  asignarRecurso(filialid: string, recurso: Recurso[]){
    this.asignacion.idFilial=filialid;
    recurso.forEach(element => {
      this.asignacion.idRecurso=element.id;
      this.asignacionService.addAsignacion(this.asignacion);
    });
  }

  desasignarRecurso(asignaciones: Asignacion[]){
    
    asignaciones.forEach(element => {
      this.asignacionService.desasignar(element.id);
    });
  }

}
