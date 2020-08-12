import { Component, Input, OnInit } from '@angular/core';
import { Transaccion } from 'src/app/models/transaccion';

@Component({
  selector: 'app-financiero-listar',
  templateUrl: './financiero-listar.component.html',
  styleUrls: ['./financiero-listar.component.scss']
})
export class FinancieroListarComponent implements OnInit {

  @Input() set _transacciones(transacciones: Transaccion[]) {
    this.transacciones = transacciones;
    this.changePagination();
  }

  private pageIndex: number = 0;
  private pageSize: number = 9;
  public transaccionesPaginadas: Transaccion[];
  public transacciones: Transaccion[] = [];

  constructor( ) { }

  ngOnInit(): void { }

  onPageChange($event) {
    this.pageIndex = $event.pageIndex;
    this.pageSize = $event.pageSize;
    this.changePagination();
  }
  
  changePagination() {
    this.transaccionesPaginadas = this.transacciones.slice(this.pageIndex*this.pageSize, this.pageIndex*this.pageSize + this.pageSize);
  }

}
