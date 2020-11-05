import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Contrato } from '../models/contrato';

@Injectable({
    providedIn: 'root'
  })
  export class ContratoService { 
      
    constructor(
        private afs: AngularFirestore
    ) { }

    private getContratoCollection(): AngularFirestoreCollection<Contrato> {
        return this.afs.collection('Asociacion/AEIS/Contrato');
    }

    public getContratos(): Observable<Contrato[]> {
        return this.getContratoCollection().snapshotChanges().pipe(
            map(actions => actions.map( a => {
                const data = a.payload.doc.data() as Contrato;
                
                Object.keys(data).filter(
                    key => data[key] instanceof firebase.firestore.Timestamp
                  ).forEach(
                    key => data[key] = data[key].toDate()
                  ) //convierte todos los objetos Timestamp a Date

                return data;
            }))
        )
    }

    public getContrato(id: string): Observable<Contrato> {
        return this.getContratoCollection().doc<Contrato>(id).snapshotChanges().pipe(
            map(a => {
              const data = a.payload.data() as Contrato;
      
              Object.keys(data).filter(
                key => data[key] instanceof firebase.firestore.Timestamp
              ).forEach(
                key => data[key] = data[key].toDate()
              ) //convierte todos los objetos Timestamp a Date
      
              return data;
              })
        )
    }
    
    public addContrato(contrato: Contrato) {
        this.getContratoCollection().doc(contrato.id).set(contrato);
    }

    public updateContrato(contrato: Contrato) {
        return this.getContratoCollection().doc(contrato.id).set(contrato);
    }

    public deleteContrato(contrato: Contrato) {
        return this.getContratoCollection().doc(contrato.id).delete();
    }
  }