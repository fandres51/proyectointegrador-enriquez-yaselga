import { Component, OnInit } from '@angular/core';
import { Estudiante } from 'src/app/models/estudiante';

@Component({
  selector: 'app-formulario-afiliacion',
  templateUrl: './formulario-afiliacion.component.html',
  styleUrls: ['./formulario-afiliacion.component.scss']
})
export class FormularioAfiliacionComponent implements OnInit {

  constructor() { }

  estudiante: Estudiante = window.history.state;

  ngOnInit(): void {
  }

}
