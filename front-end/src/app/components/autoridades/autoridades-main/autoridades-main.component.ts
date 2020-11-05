import { Component, OnInit } from '@angular/core';
import { Autoridad } from 'src/app/models/autoridad';

@Component({
  selector: 'app-autoridades-main',
  templateUrl: './autoridades-main.component.html',
  styleUrls: ['./autoridades-main.component.scss']
})
export class AutoridadesMainComponent implements OnInit {

  public autoridadMostrada: Autoridad = null;

  constructor() { }

  ngOnInit(): void { }

  cargarAutoridadMostrada(autoridad: Autoridad) {
    this.autoridadMostrada = autoridad;
  }

}
