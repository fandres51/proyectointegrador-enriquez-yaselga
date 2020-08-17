import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
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

  private getAsociacionActual(): Promise<string> {
    return new Promise(
      (res, rej) => {
        this.asociacionService.getAsociacion().subscribe(
          asociacion => {
            res(asociacion.AsociacionActual);
          },
          error => {
            rej(error);
          }
        )
      }
    )
  }

  private async getAutoridadesActualesCollection() {
    // console.log(this.asociacionActual); 
    try {
      const asociacionActual = await this.getAsociacionActual();
      return this.afs.collection<Autoridad>(`Asociacion/AEIS/Consejo/${asociacionActual}/Autoridad`);
    } catch (e) {
      console.error(e);
    }
  }
  
  async getAutoridadesActuales() {
    try {
      const autActualesColl = await this.getAutoridadesActualesCollection();
      return autActualesColl.valueChanges();
    } catch (e) {
      console.error(e);
    }
  } 
  
  getAutoridades(anio:string): Observable<Autoridad[]> {
    return this.afs.collection<Autoridad>(`Asociacion/AEIS/Consejo/${'AEIS'+anio}/Autoridad`).valueChanges();
  }

  crearAutoridad(autoridad: Autoridad) {
    if(this.estudianteService.existeEstudiante(autoridad.NoUnico)) {
      this.afs.collection('Asociacion/AEIS/Consejo/AEIS2020').doc(autoridad.NoUnico).set(autoridad);
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
