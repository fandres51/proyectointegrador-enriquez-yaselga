import { Component, OnInit } from '@angular/core';
import { Estudiante } from 'src/app/models/estudiante';
import { EstudiantesService } from 'src/app/services/estudiantes.service';

@Component({
  selector: 'app-estudiantes-main',
  templateUrl: './estudiantes-main.component.html',
  styleUrls: ['./estudiantes-main.component.scss']
})
export class EstudiantesMainComponent implements OnInit {

  public estudiantes: Estudiante[] = [];

  constructor(
    public EstudiantesService: EstudiantesService
  ) {}

  ngOnInit() {
    //trae el string de estudiantes de la base
    this.EstudiantesService.getEstudiantes().subscribe( estudiante => {
        this.estudiantes = estudiante;
    })
  }

  cargaMasiva(){}
}
