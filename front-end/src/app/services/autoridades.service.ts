import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
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

  private asociacionActual;

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

  // private getConsejos() {
  //   return this.afs.collection<Autoridad>('Asociacion/AEIS/Consejo');
  // }

  private getAutoridadesActualesCollection() {
    return this.afs.collection<Autoridad>(`Asociacion/AEIS/Consejo/${this.asociacionActual}/Autoridad`);
  }
  
  getAutoridadesActuales(): Observable<Autoridad[]> {
    return this.getAutoridadesActualesCollection().valueChanges();
  } 
  
  getAutoridades(anio:string): Observable<Autoridad[]> {
    return this.afs.collection<Autoridad>(`Asociacion/AEIS/Consejo/${'AEIS'+anio}/Autoridad`).valueChanges();
  }

  crearAutoridad(autoridad: Autoridad) {
    if(this.estudianteService.existeEstudiante(autoridad.NoUnico)) {
      console.log(autoridad);
      this.getAutoridadesActualesCollection().doc(autoridad.NoUnico).set(autoridad);
    } else {
      console.log('Estudainte no existe: ', autoridad.NoUnico);
    }
  }

  cambiarAsociacion(autoridades: Autoridad[]): void {

    const anioActual: string = new Date().getFullYear().toString();

    const nuevoConsejo: Consejo = {
      nombre: 'AEIS' + anioActual,
      AnioDePosecion: anioActual
    }

    this.afs.collection('Asociacion/AEIS/Consejo').doc(nuevoConsejo.nombre).set(nuevoConsejo);
    this.asociacionService.updateAsociacion({ AsociacionActual: nuevoConsejo.nombre })

    autoridades.forEach(autoridad => {
      this.crearAutoridad(autoridad)
    })
  }

  obtenerNivelDeAcceso(correoInstitucional: string): number {
    return 0;
  }

  obtenerAsociacionAnterior(anio: string): Autoridad[] {
    return null;
  }









}
