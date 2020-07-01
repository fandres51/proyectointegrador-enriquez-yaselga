import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as Papa from 'papaparse';
import * as _ from 'lodash';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})

export class CsvToFireService {

  csv_rec: any[] = [];
  header = false;

  constructor(private afs: AngularFirestore) { }

  process(file, collection) {
    Papa.parse(file, {
      complete: res => {
        this.csv_rec = res;
        this.firethis(this.csv_rec['data'], collection);
      },
      header: true
    });
  }

  firethis(json, collection) {
    return new Promise((resolve) => {
      _.map(json, (e, i) => {
        _.keys(e).map(() => {
          e.FechaNacimiento = firebase.firestore.Timestamp.fromDate( new Date(e.FechaNacimiento) );
          this.afs.collection(collection).doc('EST' + e.Nro).set(e);
        })
      })
      resolve();
    })
  }
}