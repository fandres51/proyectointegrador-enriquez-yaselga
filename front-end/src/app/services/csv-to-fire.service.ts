import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as Papa from 'papaparse';
import * as _ from 'lodash';
import { EstudiantesService } from './estudiantes.service';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})

export class CsvToFireService {

  csv_rec: any[] = [];
  header = false;

  constructor(
    private afs: AngularFirestore,
    private estudianteService: EstudiantesService
  ) { }

  process(file, collection, tipo:string) {
    Papa.parse(file, {
      complete: res => {
        this.csv_rec = res;
        if(tipo === 'estudiante') {
          this.firethisEstudiante(this.csv_rec['data'], collection);
        } else {
          this.firethisTransaccion(this.csv_rec['data'], collection);
        }
      },
      header: true
    });
  }

  firethisEstudiante(json, collection) {
    return new Promise((resolve) => {
      _.map(json, (e, i) => {
        _.keys(e).map(() => {
          if(e.Nro) {
            const idEst = 'EST' + e.Nro;
            delete e.Nro;
            e["EstadoAfiliacion"] = true;
            // this.estudianteService.addAfiliation(e, 30, new Date())
            this.afs.collection(collection).doc(idEst).set(e);
          }
        })
      })
      resolve();
    })
  }

  firethisTransaccion(json, collection) {
    return new Promise((resolve) => {
      _.map(json, (e, i) => {
        _.keys(e).map(() => {
          if(e.Nro) {
            e["Fecha"] = firebase.firestore.Timestamp.fromDate(new Date());
            e.Monto = parseInt(e.Monto);
            if(e.TipoIngreso == 'Ingreso') {
              e.Ingreso = true;
            } else {
              e.Ingreso = false;
            }
            delete e.TipoIngreso;
            this.afs.collection(collection).doc('TRS' + e.Nro).set(e);
          }
        })
      })
      resolve();
    })
  }
}