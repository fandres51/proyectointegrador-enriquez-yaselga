import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Notificacion } from '../models/notificacion';

@Injectable({
    providedIn: 'root'
})
export class NotificacionService {

    constructor(
        private afs: AngularFirestore
    ) { }

    private getNotificacionCollection(): AngularFirestoreCollection<Notificacion> {
        return this.afs.collection('Asociacion/AEIS/Notificacion');
    }

    public getNotificacions(): Observable<Notificacion[]> {
        return this.getNotificacionCollection().snapshotChanges().pipe(
            map(actions => actions.map(a => {
                const data = a.payload.doc.data() as Notificacion;

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

    public getNotificacion(id: string): Observable<Notificacion> {
        return this.getNotificacionCollection().doc<Notificacion>(id).snapshotChanges().pipe(
            map(a => {
                const data = a.payload.data() as Notificacion;

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

    public addNotificacion(notificacion: Notificacion) {
        this.getNotificacionCollection().add(notificacion);
    }

    public updateNotificacion(notificacion: Notificacion) {
        return this.getNotificacionCollection().doc(notificacion.id).set(notificacion);
    }

    public deleteNotificacion(notificacion: Notificacion) {
        return this.getNotificacionCollection().doc(notificacion.id).delete();
    }
}