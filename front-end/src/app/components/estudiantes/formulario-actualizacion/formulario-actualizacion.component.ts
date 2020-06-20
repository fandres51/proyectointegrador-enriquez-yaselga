import { Component, OnInit, Input } from '@angular/core';
import { Estudiante } from 'src/app/models/estudiante';

@Component({
  selector: 'app-formulario-actualizacion',
  templateUrl: './formulario-actualizacion.component.html',
  styleUrls: ['./formulario-actualizacion.component.scss']
})
export class FormularioActualizacionComponent implements OnInit {

  constructor() { }

  estudiante: Estudiante = window.history.state;

  ngOnInit(): void {
  }

}
