import { Component, OnInit, Input } from '@angular/core';
import { Estudiante } from 'src/app/models/estudiante';

@Component({
  selector: 'app-listar-estudiantes',
  templateUrl: './listar-estudiantes.component.html',
  styleUrls: ['./listar-estudiantes.component.scss']
})
export class ListarEstudiantesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
