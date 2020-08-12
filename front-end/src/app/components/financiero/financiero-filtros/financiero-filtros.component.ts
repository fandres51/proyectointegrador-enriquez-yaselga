import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Transaccion } from 'src/app/models/transaccion';
import { TransaccionesService } from 'src/app/services/transacciones.service';

@Component({
  selector: 'app-financiero-filtros',
  templateUrl: './financiero-filtros.component.html',
  styleUrls: ['./financiero-filtros.component.scss']
})
export class FinancieroFiltrosComponent implements OnInit {

  private transacciones: Transaccion[];
  @Output() public listaAMostrarEmitter = new EventEmitter();

  public tipoDeOrdenamiento:string = '';
  public ingresoFiltro: 'ingreso' | 'egreso' | 't' = 't';
  public startDateFiltro: string = (new Date('2020-01-01')).toDateString();
  public endDateFiltro: string = (new Date()).toDateString();
  public startMontoFiltro: number = 0;
  public endMontoFiltro: number = 1000000;
  public tipoFiltro: string = '';

  constructor(
    private transaccionesService: TransaccionesService
  ) { }

  ngOnInit(): void {
    this.transaccionesService.getTransacciones().subscribe(
      transacciones => {
        this.transacciones = transacciones;
        this.enviarTransacciones(this.transacciones) 
      }
    )
  }

  /***Filtros****************************************** */

  filtrar() {
    let transaccionesAMostrar = this.transacciones.filter( (transaccion) => {  
      return (transaccion.Tipo.search(this.tipoFiltro) + 1) &&
             this.esIngresoFiltro(transaccion.Ingreso) &&
        	   (transaccion.Fecha > new Date(this.startDateFiltro)) &&
        	   (transaccion.Fecha < new Date(this.endDateFiltro)) &&
        	   (transaccion.Monto > this.startMontoFiltro) &&
             (transaccion.Monto < this.endMontoFiltro) 
    })
    this.enviarTransacciones(transaccionesAMostrar);
  }

  private esIngresoFiltro(ingreso: boolean): boolean {
    if(this.ingresoFiltro === 'ingreso') {
      if(ingreso)
        return true;
      else
        return false;
    } else if(this.ingresoFiltro === 'egreso') {
      if(ingreso)
        return false;
      else
        return true;
    } else {
      return true;
    }
  }

  limpiarFiltro() { 
    this.enviarTransacciones(this.transacciones);
  }

  // buscarPorTipo() {
    
  // }

  // filtrarPorIngresoEgreso() {

  // }

  // filtrarPorFecha(fechaInicial, fechaFinal) {
  //   if(!fechaInicial) { fechaInicial = '1900-01-01' }
  //   if(!fechaFinal) { fechaFinal = '2100-01-01' }

  //   const fechaInicialDate = new Date(fechaInicial);
  //   const fechaFinalDate = new Date(fechaFinal);

  //   if(fechaInicialDate > fechaFinalDate) {
  //     alert('Error: Fecha inicial posterior a fecha final');
  //   } else {
  //     let transaccionesAMostrar: Transaccion[];
  //     transaccionesAMostrar = this.transacciones.filter((n) => {
  //       return n.Fecha >= fechaInicialDate && n.Fecha <= fechaFinalDate;
  //     })
  //     this.enviarTransacciones(transaccionesAMostrar);
  //   }
  // }

  // filtrarPorMonto(montoInicial, montoFinal) {
  //   if(!montoInicial) { montoInicial = '0' }
  //   if(!montoFinal) { montoFinal = '1000000' }

  //   if(montoInicial > montoFinal) {
  //     alert('Error: Monto inicial superior a monto final');
  //   } else if(montoInicial < 0 || montoFinal < 0) {
  //       alert('Error: Monto inferior a cero');
  //   } else {
  //     let transaccionesAMostrar: Transaccion[];
  //     transaccionesAMostrar = this.transacciones.filter((n) => {
  //       return n.Monto >= montoInicial && n.Monto <= montoFinal;
  //     })
  //     this.enviarTransacciones(transaccionesAMostrar);
  //   }
  // }


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
    let transaccionesAMostrar: Transaccion[];
    this.tipoDeOrdenamiento = tipo;
    
    if (tipo == 'fecha') {
      transaccionesAMostrar = Object.assign([], this.transacciones.sort(this.compararPorFecha));
    } else {
      transaccionesAMostrar = Object.assign([], this.transacciones.sort(this.compararPorMonto));
    }
    this.enviarTransacciones(transaccionesAMostrar);
  }

  /***Enviar*******************************************/

  public enviarTransacciones(transaccionesAMostrar: Transaccion[]) {
    console.log('Transacciones por enviar: ',transaccionesAMostrar);
    this.listaAMostrarEmitter.emit(transaccionesAMostrar);
  }

}
