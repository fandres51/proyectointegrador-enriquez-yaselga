import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Autoridad } from '../models/autoridad';
import { Consejo } from '../models/consejo';
import { AsociacionService } from './asociacion.service';
import { EstudiantesService } from './estudiantes.service';

@Injectable({
  providedIn: 'root'
})
export class AutoridadesService {

  private asociacionActual = 'AEIS2019';

  constructor(
    private afs: AngularFirestore,
    private asociacionService: AsociacionService,
    private estudianteService: EstudiantesService
  ) {
    asociacionService.getAsociacion().subscribe(
      asociacion => {
        this.asociacionActual = asociacion.AsociacionActual;
      }
    )
  }

  getConsejoActual(): Observable<Consejo[]> {
    return this.afs.collection<Consejo>('Asociacion/AEIS/Consejo', ref => ref.where('Vigencia','==',true)).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Consejo;
        data.nombre = a.payload.doc.id;
        return data;
      }))
    )
  } 
  
  getAutoridades(consejo:string): Observable<Autoridad[]> {
    return this.afs.collection<Autoridad>(`Asociacion/AEIS/Consejo/${consejo}/Autoridad`).valueChanges();
  }

  private crearAutoridad(autoridad: Autoridad) {

    //TODO comprobar si estudiante existe

    this.estudianteService.getEstudiante(autoridad.NoUnico).subscribe(
      estudiante => {
        autoridad.Nombre = estudiante.Nombre.toLocaleUpperCase() + ' ' + estudiante.Apellido.toLocaleUpperCase();
        autoridad.Cedula = estudiante.Cedula;
      }
    )

    const autoridadesCollection: AngularFirestoreCollection = this.afs.collection(`Asociacion/AEIS/Consejo/${this.asociacionActual}/Autoridad`);
    autoridadesCollection.add(autoridad);
  }

  cambiarAsociacion(anio: string, autoridades: Autoridad[]): void {

    this.afs.collection(`Asociacion/AEIS/Consejo`).doc(this.asociacionActual).update({Vigencia: false})

    const nuevoConsejo: Consejo = {
      Vigencia: true,
      nombre: 'AEIS' + anio,
      AnioDePosecion: anio
    }

    this.afs.collection('Asociacion/AEIS/Consejo').doc(nuevoConsejo.nombre).set(nuevoConsejo);

    this.asociacionService.updateAsociacion({
      AsociacionActual: nuevoConsejo.nombre
    })

    autoridades.forEach(autoridad => {
      this.crearAutoridad(autoridad)
    })

  }

  cambiarAutoridad(cargo: string, noUnico: string): void {
    //comporbar que num unico sea de un estudiante

  }



  eliminarAutoridad(cargo: string): void { }



  obtenerNivelDeAcceso(correoInstitucional: string): number {
    return 0;
  }

  obtenerAsociacionAnterior(anio: string): Autoridad[] {
    return null;
  }









}
