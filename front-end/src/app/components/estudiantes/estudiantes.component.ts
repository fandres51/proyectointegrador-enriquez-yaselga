import { Component, OnInit } from '@angular/core';
import { EstudiantesService } from '../../services/estudiantes.service';
import { Estudiante } from 'src/app/models/estudiante';

@Component({
  selector: 'app-estudiantes',
  templateUrl: './estudiantes.component.html',
  styleUrls: ['./estudiantes.component.scss']
})
export class EstudiantesComponent implements OnInit {

  public estudiantes: Estudiante[] = [];
  public estudiantesMostrados: Estudiante[] = [];

  constructor(
    public EstudiantesService:EstudiantesService
  ) { }

  ngOnInit() {
    this.EstudiantesService.getEstudiante().subscribe( estudiante => {
      this.estudiantes = estudiante;
      this.estudiantesMostrados = estudiante;
    })
  }
}
