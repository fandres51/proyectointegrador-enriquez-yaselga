import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Transaccion } from '../../../models/transaccion'
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-filtros-financiero',
  templateUrl: './filtros-financiero.component.html',
  styleUrls: ['./filtros-financiero.component.scss']
})
export class FiltrosFinancieroComponent implements OnInit {

  @Input() public transacciones: Transaccion[] = [];
  @Output() public listaAMostrarEmitter = new EventEmitter();
  public transaccionesMostradas: Transaccion[] = [];

  public tipoDeOrdenamiento:string = '';

  constructor() { }

  ngOnInit(): void { }

  /***Filtros****************************************** */

  filtrarPorFecha(fechaInicial, fechaFinal) {
    
    if(!fechaInicial) { fechaInicial = '1900-01-01' }
    if(!fechaFinal) { fechaFinal = '2100-01-01' }

    const fechaInicialDate = new Date(fechaInicial);
    const fechaFinalDate = new Date(fechaFinal);

    if(fechaInicialDate > fechaFinalDate) {
      alert('Error: Fecha inicial posterior a fecha final');
    } else {
      this.transaccionesMostradas = this.transacciones.filter((n) => {
        return n.Fecha >= fechaInicialDate && n.Fecha <= fechaFinalDate;
      })
      // console.log('Transacciones: ', this.transaccionesMostradas);
      this.enviarTransacciones();
    }
  }

  filtrarPorMonto(montoInicial, montoFinal) {
    
    if(!montoInicial) { montoInicial = '0' }
    if(!montoFinal) { montoFinal = '1000000' }

    if(montoInicial > montoFinal) {
      alert('Error: Monto inicial superior a monto final');
    } else if(montoInicial < 0 || montoFinal < 0) {
        alert('Error: Monto inferior a cero');
    } else {
      this.transaccionesMostradas = this.transacciones.filter((n) => {
        return n.Monto >= montoInicial && n.Monto <= montoFinal;
      })
      this.enviarTransacciones();
    }
  }
  
  limpiarFiltro() {
    this.transaccionesMostradas = Object.assign([], this.transacciones);
    console.log('Transacciones limpiadas: ', this.transaccionesMostradas);
    this.enviarTransacciones();
  }

  /***Ordenamiento****************************************** */

  compararPorFecha(a, b) {
    if (a.Fecha < b.Fecha) {
      return -1;
    }
    if (a.Fecha > b.Fecha) {
      return 1;
    }
    return 0;
  }

  compararPorMonto(a, b) {
    if (a.Monto < b.Monto) {
      return -1;
    }
    if (a.Monto > b.Monto) {
      return 1;
    }
    return 0;
  }

  ordenar(tipo: string) {
    this.tipoDeOrdenamiento = tipo;
    
    if (tipo == 'fecha') {
      this.transaccionesMostradas = Object.assign([], this.transacciones.sort(this.compararPorFecha));
    } else {
      this.transaccionesMostradas = Object.assign([], this.transacciones.sort(this.compararPorMonto));
    }
    this.enviarTransacciones();
  }

  /***Enviar*******************************************/

  public enviarTransacciones() {
    console.log('Transacciones por enviar: ',this.transaccionesMostradas);
    this.listaAMostrarEmitter.emit(this.transaccionesMostradas);
  }
}
