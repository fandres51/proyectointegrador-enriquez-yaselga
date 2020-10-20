import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Autoridad } from '../models/autoridad';
import { Consejo } from '../models/consejo';
import { AsociacionService } from './asociacion.service';
import { AuthService } from './auth.service';
import { EstudiantesService } from './estudiantes.service';

@Injectable({
  providedIn: 'root'
})
export class AutoridadesService {

  private asociacionActual;

  constructor(
    private afs: AngularFirestore,
    private asociacionService: AsociacionService,
    private estudianteService: EstudiantesService,
    private authService: AuthService
  ) {
    asociacionService.getAsociacion().subscribe(
      asociacion => {
        this.asociacionActual = asociacion.AsociacionActual;
      },
      error => {
        console.error(error);
      }
    )
  }
  
  public getAutoridadesActuales(periodoActual) {
    return this.afs.collection<Autoridad>(`Asociacion/AEIS/Consejo/${periodoActual}/Autoridad`).valueChanges();
  }

  public getAutoridad(cargo, periodoActual) {
    return this.afs.collection(`Asociacion/AEIS/Consejo/${periodoActual}/Autoridad`).doc<Autoridad>(cargo).valueChanges();
  }

  public updateAutoridad(cargo, periodoActual, autoridad) {
    this.afs.collection(`Asociacion/AEIS/Consejo/${periodoActual}/Autoridad`).doc<Autoridad>(cargo).update(autoridad);
  }

  public deleteAutoridad(cargo, periodoActual) {
    this.afs.collection(`Asociacion/AEIS/Consejo/${periodoActual}/Autoridad`).doc<Autoridad>(cargo).delete();
  }
  
  getAutoridades(anio:string): Observable<Autoridad[]> {
    return this.afs.collection<Autoridad>(`Asociacion/AEIS/Consejo/${'AEIS'+anio}/Autoridad`).valueChanges();
  }

  crearAutoridad(autoridad: Autoridad) {
    if(this.estudianteService.existeEstudiante(autoridad.NoUnico)) {
      this.afs.collection(`Asociacion/AEIS/Consejo/${this.asociacionActual}/Autoridad`).doc(autoridad.Cargo).set(autoridad);
      this.authService.createPermiso({email: autoridad.CorreoInstitucional, modulo: 'Estudiantes'})
      this.authService.createPermiso({email: autoridad.CorreoInstitucional, modulo: 'Estudiantes_new'})
      this.authService.createPermiso({email: autoridad.CorreoInstitucional, modulo: 'Estudiantes_edit'})
      this.authService.createPermiso({email: autoridad.CorreoInstitucional, modulo: 'Estudiantes_delete'})
      this.authService.createPermiso({email: autoridad.CorreoInstitucional, modulo: 'Financiero'})
      this.authService.createPermiso({email: autoridad.CorreoInstitucional, modulo: 'Financiero_new'})
      this.authService.createPermiso({email: autoridad.CorreoInstitucional, modulo: 'Financiero_edit'})
      this.authService.createPermiso({email: autoridad.CorreoInstitucional, modulo: 'Financiero_delete'})
      this.authService.createPermiso({email: autoridad.CorreoInstitucional, modulo: 'Eventos'})
      this.authService.createPermiso({email: autoridad.CorreoInstitucional, modulo: 'Eventos_new'})
      this.authService.createPermiso({email: autoridad.CorreoInstitucional, modulo: 'Eventos_edit'})
      this.authService.createPermiso({email: autoridad.CorreoInstitucional, modulo: 'Eventos_delete'})
      this.authService.createPermiso({email: autoridad.CorreoInstitucional, modulo: 'Filiales'})
      this.authService.createPermiso({email: autoridad.CorreoInstitucional, modulo: 'Filiales_new'})
      this.authService.createPermiso({email: autoridad.CorreoInstitucional, modulo: 'Filiales_edit'})
      this.authService.createPermiso({email: autoridad.CorreoInstitucional, modulo: 'Filiales_delete'})
      this.authService.createPermiso({email: autoridad.CorreoInstitucional, modulo: 'Autoridades'})
      this.authService.createPermiso({email: autoridad.CorreoInstitucional, modulo: 'Autoridades_new'})
      this.authService.createPermiso({email: autoridad.CorreoInstitucional, modulo: 'Autoridades_edit'})
      this.authService.createPermiso({email: autoridad.CorreoInstitucional, modulo: 'Autoridades_delete'})
      this.authService.createPermiso({email: autoridad.CorreoInstitucional, modulo: 'Recursos'})
      this.authService.createPermiso({email: autoridad.CorreoInstitucional, modulo: 'Recursos_new'})
      this.authService.createPermiso({email: autoridad.CorreoInstitucional, modulo: 'Recursos_edit'})
      this.authService.createPermiso({email: autoridad.CorreoInstitucional, modulo: 'Recursos_delete'})
      this.authService.createPermiso({email: autoridad.CorreoInstitucional, modulo: 'Elecciones'})
      this.authService.createPermiso({email: autoridad.CorreoInstitucional, modulo: 'Elecciones_new'})
      this.authService.createPermiso({email: autoridad.CorreoInstitucional, modulo: 'Elecciones_edit'})
      this.authService.createPermiso({email: autoridad.CorreoInstitucional, modulo: 'Elecciones_delete'})
      this.authService.createPermiso({email: autoridad.CorreoInstitucional, modulo: 'Contratos'})
      this.authService.createPermiso({email: autoridad.CorreoInstitucional, modulo: 'Contratos_new'})
      this.authService.createPermiso({email: autoridad.CorreoInstitucional, modulo: 'Contratos_edit'})
      this.authService.createPermiso({email: autoridad.CorreoInstitucional, modulo: 'Contratos_delete'})
      this.authService.createPermiso({email: autoridad.CorreoInstitucional, modulo: 'Incidentes'})
      this.authService.createPermiso({email: autoridad.CorreoInstitucional, modulo: 'Incidentes_new'})
      this.authService.createPermiso({email: autoridad.CorreoInstitucional, modulo: 'Incidentes_edit'})
      this.authService.createPermiso({email: autoridad.CorreoInstitucional, modulo: 'Incidentes_delete'})
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
      this.crearAutoridad(autoridad);
    })
  }
}
