import { Component, OnInit } from '@angular/core';
import { Estudiante } from 'src/app/models/estudiante';
import { Router } from '@angular/router';

@Component({
  selector: 'app-formulario-afiliacion',
  templateUrl: './formulario-afiliacion.component.html',
  styleUrls: ['./formulario-afiliacion.component.scss']
})
export class FormularioAfiliacionComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }

  estudiante: Estudiante = window.history.state;

  ngOnInit(): void {
  }

  regresar() {
    this.router.navigateByUrl('/main/estudiantes');
  }

}
