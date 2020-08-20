import { Component } from '@angular/core';
// import { AuthService } from './services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AsociacionService } from './services/asociacion.service';
import { AutoridadesService } from './services/autoridades.service';
import { EstudiantesService } from './services/estudiantes.service';
import { EventosService } from './services/eventos.service';
import { TransaccionesService } from './services/transacciones.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'front-end';

  // json: string;

  constructor(
    public auth: AngularFireAuth,
    // public estudianteService: EstudiantesService,
    // public transaccionService: TransaccionesService,
    // public autoridadService: AutoridadesService,
    // public eventoService: EventosService,
    // public asociacionService: AsociacionService
  ) { }

  // ejecutarAccion() {
  //   this.estudianteService.getEstudiante('20ad193').subscribe(
  //     estudiante => {
  //       this.json = JSON.stringify(estudiante);
  //       console.log(estudiante.FechaNacimiento instanceof Date)
  //     }
  //   )

  //   this.estudianteService.updateEstudiante(
  //     {
  //       Apellido: 'Arcos Astudillo',
  //       Carrera: "Sistemas",
  //       Cedula: "173476123876",
  //       EstadoAfiliacion: "Aportante",
  //       NoUnico: '202047193',
  //       SemestreReferencial: "1",
  //       FechaNacimiento: new Date('2003-02-07T05:00:00.000Z'),
  //       CorreoPersonal: 'pdarcosa@hotmail.com',
  //       Telefono: '025121448',
  //       Nombre: 'Pablo David',
  //       SectorDomiciliario: 'Parque bicentenario'
  //     }
  //   )
  //   this.asociacionService.increaseContador('Evento')
  // }
  // clean() {
  //   this.json = "";
  // }


}
