import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Router } from '@angular/router';
import { Estudiante } from 'src/app/models/estudiante';
import { EstudiantesService } from 'src/app/services/estudiantes.service';

@Component({
  selector: 'app-estudiantes-actualizacion',
  templateUrl: './estudiantes-actualizacion.component.html',
  styleUrls: ['./estudiantes-actualizacion.component.scss']
})
export class EstudiantesActualizacionComponent implements OnInit {

  carreras: string[] = ['Sistemas', 'Computacion', 'Software'];
  semestres: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', 'Retirado', 'Egresado', 'Graduado'];
  

  public estudiante: Estudiante = window.history.state;
  public estudianteAActualizar: Estudiante = this.estudiante;
  date = new FormControl(this.estudiante.FechaNacimiento);

  constructor(
    public estudiantesService: EstudiantesService,
    private router: Router
  ) { }


  ngOnInit(): void { }

  agregarFechaAEsudiante(event: MatDatepickerInputEvent<Date>) {
    this.estudianteAActualizar.FechaNacimiento = event.value;
  }

  editEstudiante(Estudiante){
    this.estudiantesService.updateEstudiante(Estudiante);
    this.router.navigateByUrl('/main/estudiantes');
  }

  regresar() {
    this.router.navigateByUrl('/main/estudiantes');
  }

}
