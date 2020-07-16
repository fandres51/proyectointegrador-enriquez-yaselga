import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { ActivatedRoute, Router } from '@angular/router';
import { Estudiante } from 'src/app/models/estudiante';
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
  public date: FormControl;

  constructor(
    public estudiantesService: EstudiantesService,
    private router: Router,
    private route: ActivatedRoute
  ) { }


  ngOnInit() {
    this.route.params.subscribe(params => {
      const noUnicoParam = params['id'];
      this.estudiantesService.getEstudiante(noUnicoParam).subscribe(estudiante => {
        this.estudiante = estudiante;
        this.date = new FormControl(this.estudiante.FechaNacimiento);
      })
    });
  }

  agregarFechaAEsudiante(event: MatDatepickerInputEvent<Date>) {
    this.estudiante.FechaNacimiento = event.value;
  }

  editEstudiante(estudiante: Estudiante) {
    this.estudiantesService.updateEstudiante(estudiante);
    this.router.navigateByUrl('/estudiantes');
  }

  regresar() {
    this.router.navigateByUrl('/estudiantes');
  }

}
