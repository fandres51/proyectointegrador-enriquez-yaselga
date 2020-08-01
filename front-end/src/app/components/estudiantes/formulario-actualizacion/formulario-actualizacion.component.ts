import { Component, OnInit, Input } from '@angular/core';
import { Estudiante } from 'src/app/models/estudiante';
import { EstudiantesService } from 'src/app/services/estudiantes.service';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-formulario-actualizacion',
  templateUrl: './formulario-actualizacion.component.html',
  styleUrls: ['./formulario-actualizacion.component.scss']
})
export class FormularioActualizacionComponent implements OnInit {

  carreras: string[] = ['Sistemas', 'Computacion', 'Software'];
  sexos: string[] = ['M', 'F'];
  semestres: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', 'Retirado', 'Egresado', 'Graduado'];
  generos: string[] = ['M', 'F', 'O'];
  

  public estudiante: Estudiante = window.history.state;
  public estudianteAActualizar: Estudiante = this.estudiante;
  date = new FormControl(this.estudiante.FechaNacimiento);

  constructor(
    public estudiantesService: EstudiantesService,
    private router: Router
  ) { }


  ngOnInit(): void { 
  }

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
