import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Dignidad } from '../models/dignidad';
import { Eleccion } from '../models/eleccion';
import { Lista } from '../models/lista';

@Injectable({
    providedIn: 'root'
})
export class EleccionService {

    constructor(
        private afs: AngularFirestore
    ) { }

    private getEleccionCollection(): AngularFirestoreCollection<Eleccion> {
        return this.afs.collection<Eleccion>('Asociacion/AEIS/Eleccion');
    }

    private getListaCollection(eleccion: string): AngularFirestoreCollection<Lista> {
        return this.afs.collection<Lista>(`Asociacion/AEIS/Eleccion/${eleccion}/Lista`);
    }
    
    private getDignidadesCollection(eleccion: string, lista: string): AngularFirestoreCollection<Dignidad> {
        return this.afs.collection<Dignidad>(`Asociacion/AEIS/Eleccion/${eleccion}/Lista/${lista}`);
    }

    getElecciones(): Observable<Eleccion[]> {
        return this.getEleccionCollection().snapshotChanges().pipe(
            map(actions => actions.map(a => {
              const data = a.payload.doc.data() as Eleccion;
      
              Object.keys(data).filter(
                key => data[key] instanceof firebase.firestore.Timestamp
              ).forEach(
                key => data[key] = data[key].toDate()
              ) //convierte todos los objetos Timestamp a Date

              return data;
            }))
        )
    }

    getEleccion(dateEleccion: string): Observable<Eleccion> {
        return this.getEleccionCollection().doc<Eleccion>(dateEleccion).snapshotChanges().pipe(
            map(a => {
              const data = a.payload.data() as Eleccion;
      
              Object.keys(data).filter(
                key => data[key] instanceof firebase.firestore.Timestamp
              ).forEach(
                key => data[key] = data[key].toDate()
              ) //convierte todos los objetos Timestamp a Date
      
              return data;
            })
        )
    }

    deleteEleccion(eleccion: Eleccion) {
        this.getEleccionCollection().doc(this.getFechaID(eleccion.fecha)).delete();
    }

    createEleccion(eleccion: Eleccion) {
        this.getEleccionCollection().doc(this.getFechaID(eleccion.fecha)).set(eleccion);
    }

    getLista(nombreLista: string, eleccion: string): Observable<Lista> {
        return this.getListaCollection(eleccion).doc<Lista>(nombreLista).valueChanges();
    }

    getListas(eleccion: string): Observable<Lista[]> {
        return this.getListaCollection(eleccion).valueChanges();
    }

    createLista(lista: Lista, eleccion: string) {
        this.getListaCollection(eleccion).doc(lista.nombre).set(lista);
    }
    
    updateLista(lista: Lista, eleccion: string) {
        this.getListaCollection(eleccion).doc(lista.nombre).set(lista);
    }
    
    deleteLista(lista: Lista, eleccion: string) {
        this.getListaCollection(eleccion).doc(lista.nombre).delete();
    }

    getDignidadesDeLista(lista: string, eleccion: string): Observable<Dignidad[]> {
        return this.getDignidadesCollection(eleccion, lista).valueChanges();
    }
    
    getDignidad(cargo: string, lista: string, eleccion: string): Observable<Dignidad> {
        return this.getDignidadesCollection(eleccion, lista).doc<Dignidad>(cargo).valueChanges();
    }

    createDignidad(dignidad: Dignidad, lista: string, eleccion: string) {
        this.getDignidadesCollection(eleccion, lista).doc(dignidad.cargo).set(dignidad);
    }
    
    updateDignidad(dignidad: Dignidad, lista: string, eleccion: string) {
        this.getDignidadesCollection(eleccion, lista).doc(dignidad.cargo).set(dignidad);
    }
    
    deleteDignidad(dignidad: Dignidad, lista: string, eleccion: string) {
        this.getDignidadesCollection(eleccion, lista).doc(dignidad.cargo).delete();
    }

    definirListaGanadora(nombreLista: String, eleccion: string) {
        this.getEleccionCollection().doc(eleccion).update(
            {listaGanadora: nombreLista}
        )
    }

    private getFechaID(fecha: Date): string {
        return fecha.getMonth() + '-' + fecha.getDate() + '-' + fecha.getFullYear();
    }
}