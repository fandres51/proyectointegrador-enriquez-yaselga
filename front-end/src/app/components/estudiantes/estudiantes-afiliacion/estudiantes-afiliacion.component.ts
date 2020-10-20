import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Estudiante } from 'src/app/models/estudiante';
import { Transaccion } from 'src/app/models/transaccion';
import { AuthService } from 'src/app/services/auth.service';
import { EstudiantesService } from 'src/app/services/estudiantes.service';
import { TransaccionesService } from 'src/app/services/transacciones.service';

@Component({
  selector: 'app-estudiantes-afiliacion',
  templateUrl: './estudiantes-afiliacion.component.html',
  styleUrls: ['./estudiantes-afiliacion.component.scss']
})
export class EstudiantesAfiliacionComponent implements OnInit {

  estudiante: Estudiante = window.history.state;

  constructor(
    private router: Router,
    private estudiantesService: EstudiantesService,
    public authService: AuthService,
    private transaccionService: TransaccionesService,
    private route: ActivatedRoute
  ) { }


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const noUnicoParam = params['id'];
      this.estudiantesService.getEstudiante(noUnicoParam).subscribe( estudiante => {
        this.estudiante = estudiante;
      },
      error => {
        console.error(error);
      })
    },
    error => {
      console.error(error);
    });
  }

  regresar() {
    this.router.navigateByUrl('/estudiantes');
  }

  afiliarEstudiante() {
    this.authService.auth.user.subscribe(
      user => {
        this.authService.getPermiso(user.email, 'Estudiantes_edit').subscribe(
          permiso => {
            if (permiso.length > 0) {
              this.estudiantesService.afiliarEstudiante( this.estudiante.NoUnico );
              this.router.navigateByUrl('/estudiantes');
            }
            else
              alert('Usted no tiene permiso para realizar esa acción');
          }
        )
      }
    )
  }
}
