import { Component, OnInit } from '@angular/core';
import { EstudiantesService } from '../../services/estudiantes.service'

@Component({
  selector: 'app-estudiantes',
  templateUrl: './estudiantes.component.html',
  styleUrls: ['./estudiantes.component.scss']
})
export class EstudiantesComponent implements OnInit {

  estudiantes = [];

  constructor(public EstudiantesService:EstudiantesService) { }

  ngOnInit() {
    this.EstudiantesService.getEstudiante().subscribe( estudiante => {
      this.estudiantes = estudiante;
    })
  }

}
