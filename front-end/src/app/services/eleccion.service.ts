import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
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

    private getListaCollection(eleccion: Eleccion): AngularFirestoreCollection<Lista> {
        return this.afs.collection<Lista>(`Asociacion/AEIS/Eleccion/${this.getFechaID(eleccion.fecha)}/Lista`);
    }
    
    private getDignidadesCollection(eleccion: Eleccion, lista: Lista): AngularFirestoreCollection<Dignidad> {
        return this.afs.collection<Dignidad>(`Asociacion/AEIS/Eleccion/${this.getFechaID(eleccion.fecha)}/Lista/${lista.nombre}`);
    }

    getEleccion(dateEleccion: string): Observable<Eleccion> {
        return this.getEleccionCollection().doc<Eleccion>(dateEleccion).valueChanges();
    }

    deleteEleccion(eleccion: Eleccion) {
        this.getEleccionCollection().doc(this.getFechaID(eleccion.fecha)).delete();
    }

    createEleccion(eleccion: Eleccion) {
        this.getEleccionCollection().doc(this.getFechaID(eleccion.fecha)).set(eleccion);
    }

    getLista(nombreLista: string, eleccion: Eleccion) {
        return this.getListaCollection(eleccion).doc(nombreLista).valueChanges();
    }

    createLista(lista: Lista, eleccion: Eleccion) {
        this.getListaCollection(eleccion).doc(lista.nombre).set(lista);
    }
    
    updateLista(lista: Lista, eleccion: Eleccion) {
        this.getListaCollection(eleccion).doc(lista.nombre).set(lista);
    }
    
    deleteLista(lista: Lista, eleccion: Eleccion) {
        this.getListaCollection(eleccion).doc(lista.nombre).delete();
    }

    getDignidadesDeLista(lista: Lista, eleccion: Eleccion): Observable<Dignidad[]> {
        return this.getDignidadesCollection(eleccion, lista).valueChanges();
    }
    
    getDignidad(cargo: string, lista: Lista, eleccion: Eleccion): Observable<Dignidad> {
        return this.getDignidadesCollection(eleccion, lista).doc<Dignidad>(cargo).valueChanges();
    }

    createDignidad(dignidad: Dignidad, lista: Lista, eleccion: Eleccion) {
        this.getDignidadesCollection(eleccion, lista).doc(dignidad.cargo).set(dignidad);
    }
    
    updateDignidad(dignidad: Dignidad, lista: Lista, eleccion: Eleccion) {
        this.getDignidadesCollection(eleccion, lista).doc(dignidad.cargo).set(dignidad);
    }
    
    deleteDignidad(dignidad: Dignidad, lista: Lista, eleccion: Eleccion) {
        this.getDignidadesCollection(eleccion, lista).doc(dignidad.cargo).delete();
    }

    definirListaGanadora(nombreLista: String, eleccion: Eleccion) {
        this.getEleccionCollection().doc(this.getFechaID(eleccion.fecha)).update(
            {listaGanadora: nombreLista}
        )
    }

    private getFechaID(fecha: Date): string {
        return fecha.getFullYear() + '-' + fecha.getMonth() + '-' + fecha.getDate();
    }
}