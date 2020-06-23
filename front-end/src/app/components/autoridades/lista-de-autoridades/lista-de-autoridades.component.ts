import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Estudiante } from 'src/app/models/estudiante';

@Component({
  selector: 'app-lista-de-autoridades',
  templateUrl: './lista-de-autoridades.component.html',
  styleUrls: ['./lista-de-autoridades.component.scss']
})
export class ListaDeAutoridadesComponent implements OnInit {

  @Input() public autoridades: Estudiante[] = [];
  @Output() public autoridadSeleccionada = new EventEmitter();
  public autoridadSeleccionadaEst: Estudiante;
  
  constructor() { }

  ngOnInit(): void { }

  devolverAutoridad(idAutoridad:String) {
    this.autoridadSeleccionadaEst = this.autoridades.find( n => {
      return idAutoridad == n.id;
    })
    this.autoridadSeleccionada.emit(this.autoridadSeleccionadaEst);
  }

}
