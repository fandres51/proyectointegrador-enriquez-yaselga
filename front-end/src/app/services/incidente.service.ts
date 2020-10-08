import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Incidente } from '../models/incidente';

@Injectable({
    providedIn: 'root'
})
export class IncidenteService {

    constructor(
        private afs: AngularFirestore
    ) { }

    private getIncidenteCollection(): AngularFirestoreCollection<Incidente> {
        return this.afs.collection('Asociacion/AEIS/Incidente');
    }

    public getIncidentes(): Observable<Incidente[]> {
        return this.getIncidenteCollection().snapshotChanges().pipe(
            map(actions => actions.map(a => {
                const data = a.payload.doc.data() as Incidente;

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

    public getIncidente(id: string): Observable<Incidente> {
        return this.getIncidenteCollection().doc<Incidente>(id).snapshotChanges().pipe(
            map(a => {
                const data = a.payload.data() as Incidente;

                Object.keys(data).filter(
                    key => data[key] instanceof firebase.firestore.Timestamp
                ).forEach(
                    key => data[key] = data[key].toDate()
                ) //convierte todos los objetos Timestamp a Date
                data.id = a.payload.id;
                return data;
            })
        )
    }

    public addIncidente(incidente: Incidente) {
        this.getIncidenteCollection().add(incidente);
    }

    public updateIncidente(incidente: Incidente) {
        return this.getIncidenteCollection().doc(incidente.id).set(incidente);
    }

    public deleteIncidente(incidente: Incidente) {
        return this.getIncidenteCollection().doc(incidente.id).delete();
    }
}