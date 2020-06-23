import { Component, OnInit, Input } from '@angular/core';
import { Estudiante } from 'src/app/models/estudiante';
import { EstudiantesService } from 'src/app/services/estudiantes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-formulario-actualizacion',
  templateUrl: './formulario-actualizacion.component.html',
  styleUrls: ['./formulario-actualizacion.component.scss']
})
export class FormularioActualizacionComponent implements OnInit {

  public estudiante: Estudiante = window.history.state;
  public estudianteAActualizar: Estudiante = this.estudiante;

  constructor(
    public estudiantesService: EstudiantesService,
    private router: Router
  ) { }


  ngOnInit(): void { }

  editEstudiante(Estudiante){
    this.estudiantesService.updateEstudiante(Estudiante);
    this.router.navigateByUrl('/main/estudiantes');
  }
}
