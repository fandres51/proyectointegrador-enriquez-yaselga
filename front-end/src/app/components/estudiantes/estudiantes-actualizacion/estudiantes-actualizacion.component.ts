import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Estudiante } from 'src/app/models/estudiante';
import { AuthService } from 'src/app/services/auth.service';
import { EstudiantesService } from 'src/app/services/estudiantes.service';

@Component({
  selector: 'app-estudiantes-actualizacion',
  templateUrl: './estudiantes-actualizacion.component.html',
  styleUrls: ['./estudiantes-actualizacion.component.scss']
})
export class EstudiantesActualizacionComponent implements OnInit {

  carreras: string[] = ['Sistemas', 'Computacion', 'Software'];
  semestres: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Retirado', 'Egresado', 'Graduado'];

  public estudiante: Estudiante;
  public date: string = '';

  constructor(
    public estudiantesService: EstudiantesService,
    private router: Router,
    public authService: AuthService,
    private route: ActivatedRoute
  ) { }


  ngOnInit() {
    
    this.estudiante = {
      Apellido: '',
      Carrera: 'Sistemas',
      Cedula: '',
      EstadoAfiliacion: 'No afiliado',
      NoUnico: '',
      SemestreReferencial: '1',
      CorreoInstitucional: '',
      CorreoPersonal: '',
      FechaNacimiento: new Date(),
      Nombre: '',
      SectorDomiciliario: '',
      Telefono: ''
    }
    this.route.params.subscribe(params => {
      const noUnicoParam = params['id'];
      this.estudiantesService.getEstudiante(noUnicoParam).subscribe(estudiante => {
        this.estudiante = estudiante;
        let estFecha: Date = estudiante.FechaNacimiento;
        estFecha = new Date(estFecha);
        this.date = estFecha.getFullYear() +'-'+ ('0' + estFecha.getMonth()).slice(-2) + '-' + ('0' + estFecha.getDate()).slice(-2);
      },
      error => {
        console.error(error);
      })
    },
    error => {
      console.error(error);
    });
  }

  editEstudiante(estudiante: Estudiante) {
    this.authService.auth.user.subscribe(
      user => {
        this.authService.getPermiso(user.email, 'Estudiantes_edit').subscribe(
          permiso => {
            if (permiso.length > 0) {
              this.estudiante.FechaNacimiento = new Date(this.date);
              this.estudiantesService.updateEstudiante(estudiante);
              this.router.navigateByUrl('/estudiantes');
            }
            else
              alert('Usted no tiene permiso para realizar esa acción');
          }
        )
      }
    )
  }

  regresar() {
    this.router.navigateByUrl('/estudiantes');
  }
}
