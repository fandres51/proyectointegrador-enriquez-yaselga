import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Autoridad } from 'src/app/models/autoridad';

@Component({
  selector: 'app-autoridades-detalle',
  templateUrl: './autoridades-detalle.component.html',
  styleUrls: ['./autoridades-detalle.component.scss']
})
export class AutoridadesDetalleComponent implements OnInit {

  @Input() public autoridadMostrada: Autoridad;
  @Output() public enviarNull = new EventEmitter();

  constructor() { }

  ngOnInit(): void { }

  regresar() {
    this.enviarNull.emit(null);
  }

}
