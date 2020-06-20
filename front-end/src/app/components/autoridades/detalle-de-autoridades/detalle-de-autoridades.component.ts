import { Component, OnInit, Input } from '@angular/core';
import { Estudiante } from 'src/app/models/estudiante';

@Component({
  selector: 'app-detalle-de-autoridades',
  templateUrl: './detalle-de-autoridades.component.html',
  styleUrls: ['./detalle-de-autoridades.component.scss']
})
export class DetalleDeAutoridadesComponent implements OnInit {

  @Input()
  public autoridadMostrada: Estudiante;

  constructor() { }

  ngOnInit(): void {
  }

}
