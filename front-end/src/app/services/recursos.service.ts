import { Injectable } from '@angular/core';
import { Recurso } from '../models/recurso';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase';
import { AsociacionService } from './asociacion.service';
import { Contador } from '../models/contador';
import * as Papa from 'papaparse';



@Injectable({
  providedIn: 'root'
})
export class RecursosService {

  recursosCollection: AngularFirestoreCollection<Recurso>;
  recursos: Observable<Recurso[]>;
  recursoDoc: AngularFirestoreDocument<Recurso>;

  constructor(
    private afs: AngularFirestore,
    private asociacionService: AsociacionService
  ){}

  getCollection(): AngularFirestoreCollection<Recurso> {
    return this.afs.collection<Recurso>('Asociacion/AEIS/Recurso');
  }

  getRecursos(): Observable<Recurso[]>{
    return this.getCollection().snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Recurso;

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
  
  getRecurso(id: string): Observable<Recurso> {
    return this.afs.doc<Recurso>(`Asociacion/AEIS/Recurso/${id}`).snapshotChanges().pipe(
      map(a => {
        const data = a.payload.data() as Recurso;

        Object.keys(data).filter(
          key => data[key] instanceof firebase.firestore.Timestamp
        ).forEach(
          key => data[key] = data[key].toDate()
        ) //convierte todos los objetos Timestamp a Date

        return data;
      })
    );
  }

  crearRecurso(nuevoRecurso: Recurso){
    let bool=true; //eveita un bucle infinito X((
      //console.log("Contador de recurso", this.asociacionService.getContador('Recurso'));
    this.asociacionService.getContador('Recurso').subscribe(
      (contador: Contador) => {
        if(bool){
          nuevoRecurso.id = 'REC' + contador.contador;
          this.getCollection().doc('REC' + contador.contador).set(nuevoRecurso);
          this.asociacionService.increaseContador('Recurso');
          bool=false;
        }
      },
      error => {
        console.error(error);
      }
    )
  }
  
  existeRecurso(id: string): Promise<boolean> {
    return new Promise(
      (res) => {
        return this.afs.collection<Recurso>('Asociacion/AEIS/Recurso', ref => ref.where('id', '==', id)).valueChanges().subscribe(
          recursos => {
            if (recursos.length)
              res(true);
            else
              res(false)
          },
          error => {
            console.error(error);
          }
        );
      }
    )
  }

  update(recurso: Recurso) {
    const recursoDoc: AngularFirestoreDocument<Recurso> = this.afs.collection('Asociacion/AEIS/Recurso').doc(recurso.id);
    recursoDoc.update(recurso);
  }


  darDeBaja(id: string) {
    const recursoDoc: AngularFirestoreDocument<Recurso> = this.getCollection().doc(id);
    recursoDoc.update({
      estado: 'Baja'
    });
  }

  actualizarEstado(id: string, nuevoestado: string) {
    const recursoDoc: AngularFirestoreDocument<Recurso> = this.getCollection().doc(id);
    switch(nuevoestado){
      case 'Libre':
        recursoDoc.update({estado: 'Libre'});
        break;
      case 'Ocupado':
        recursoDoc.update({estado: 'Ocupado'});
        break;
      case 'Alquilado':
        recursoDoc.update({estado: 'Alquilado'});
        break;
      case 'Reservado':
        recursoDoc.update({estado: 'Reservado'});
        break;
      case 'Baja':
        recursoDoc.update({estado: 'Baja'});
        break;
      case 'Reparacion':
        recursoDoc.update({estado: 'Reparacion'});
        break;
    }
  }

  actualizarCondicion(id: string, nuevacondicion: string) {
    const recursoDoc: AngularFirestoreDocument<Recurso> = this.getCollection().doc(id);
    switch(nuevacondicion){
      case 'Nuevo':
        recursoDoc.update({condicion: 'Nuevo'});
        break;
      case 'Usado':
        recursoDoc.update({condicion: 'Usado'});
        break;
      case 'Averiado':
        recursoDoc.update({condicion: 'Averiado'});
        break;
      case 'Perdido':
        recursoDoc.update({condicion: 'Perdido'});
        break;
    }
    
  }
  
  delete(idrecurso:string){
    //return this.getContratoCollection().doc(contrato.id).delete();
    /* this.recursoDoc = this.afs.doc<Recurso>(`items/${idrecurso}`);
    this.recursoDoc.delete(); */
    return this.getCollection().doc(idrecurso).delete();
  }

  cargaMasivaRecursos(file): Promise<string[]> {
    return new Promise(
      (resF) => {
        Papa.parse(file, {
          complete: res => {
            this.firethisRecurso(res['data']).then(
              recursosNoIngresados => resF(recursosNoIngresados)
            ).catch (
              e => console.error('Archivo no admitido')
            )
          },
          header: true
        });
      }
    )
  }

  private firethisRecurso(recursos: Recurso[]): Promise<string[]> {
    const recursosNoIngresados: string[] = [];
    return new Promise((resolve) => {
      recursos.forEach((recurso) => {
        //recurso.FechaNacimiento = new Date(recurso.FechaNacimiento);
        //recurso.Apellido = recurso.Apellido.toUpperCase();
        recurso.nombre = recurso.nombre.toUpperCase();
        const razon = this.comprobarEstructura(recurso);
        if (!razon) {
          this.getCollection().doc(recurso.id).set(recurso);
        } else {
          recursosNoIngresados.push(
            'id: ' + 
            recurso.id + 
            'Razón: ' + 
            razon  
          );
        }
      })
      resolve(recursosNoIngresados);
    })
  }
  

  private comprobarEstructura(recurso: Recurso): string {
    let razon: string = '';
    if(recurso.espacio==null){
      razon = 'espacio';
    }
    if (
      recurso.estado !== 'Libre' &&
      recurso.estado !== 'Ocupado' &&
      recurso.estado !== 'Alquilado' &&
      recurso.estado !== 'Reservado' &&
      recurso.estado !== 'Baja' &&
      recurso.estado !== 'Reparacion'
    ) {
      razon = 'estado';
    }
    
    if (
      recurso.condicion !== 'Nuevo' &&
      recurso.condicion !== 'Usado' &&
      recurso.condicion !== 'Averiado' &&
      recurso.condicion !== 'Perdido'
    ) {
      razon = 'condicion';
    }
    return razon;
  }

  AsignarFilial(id: string, idFilial: string) {
    const recursoDoc: AngularFirestoreDocument<Recurso> = this.getCollection().doc(id);
    recursoDoc.update({idfilial: idFilial});
  }
  
}