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

  public tipoDeOrdenamiento: string = '';
  public ingresoFiltro: 'ingreso' | 'egreso' | 't' = 't';
  public startDateFiltro: string = (new Date('2020-01-01')).toDateString();
  public endDateFiltro: string = this.getTomorrowDate().toDateString();
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

  buscarPorEstudiante(noUnico: string) {
    let transaccionesAMostrar = this.transacciones.filter( n => {
      if(n.PersonaID)
        return n.PersonaID.includes(noUnico);
    })
    this.enviarTransacciones(transaccionesAMostrar);
  }

  private getTomorrowDate(): Date {
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)
    return tomorrow;
  }

  filtrar() {
    let transaccionesAMostrar = this.transacciones.filter((transaccion) => {
      // console.log('Tipo: ',(transaccion.Tipo === this.tipoFiltro || this.tipoFiltro === ''));
      // console.log('Ingreso: ',this.esIngresoFiltro(transaccion.Ingreso));
      // console.log('Fecha: ',(transaccion.Fecha >= new Date(this.startDateFiltro)));
      // console.log('Fecha: ',(transaccion.Fecha <= new Date(this.endDateFiltro)));
      // console.log('Monto: ',(transaccion.Monto > this.startMontoFiltro));
      // console.log('Monto: ',(transaccion.Monto < this.endMontoFiltro));
      return (transaccion.Tipo === this.tipoFiltro || this.tipoFiltro === '') &&
             this.esIngresoFiltro(transaccion.Ingreso) &&
             (transaccion.Fecha >= new Date(this.startDateFiltro)) &&
             (transaccion.Fecha <= new Date(this.endDateFiltro)) &&
             (transaccion.Monto >= this.startMontoFiltro) &&
             (transaccion.Monto <= this.endMontoFiltro)
    })

    // console.log(new Date(this.startDateFiltro));
    // console.log(new Date(this.endDateFiltro));
    this.enviarTransacciones(transaccionesAMostrar);
  }

  private esIngresoFiltro(ingreso: boolean): boolean {
    if (this.ingresoFiltro === 'ingreso') {
      if (ingreso)
        return true;
      else
        return false;
    } else if (this.ingresoFiltro === 'egreso') {
      if (ingreso)
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

  /***Ordenamiento****************************************** */

  compararPorFecha(a, b) {
    if (a.Fecha > b.Fecha) {
      return -1;
    }
    if (a.Fecha < b.Fecha) {
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

  compararPorTipo(a, b) {
    if (a.Tipo < b.Tipo) {
      return -1;
    }
    if (a.Tipo > b.Tipo) {
      return 1;
    }
    return 0;
  }

  ordenar(tipo: string) {
    this.tipoDeOrdenamiento = tipo;

    if (tipo == 'fecha') {
      this.transacciones = Object.assign([], this.transacciones.sort(this.compararPorFecha));
    } else if (tipo == 'monto') {
      this.transacciones = Object.assign([], this.transacciones.sort(this.compararPorMonto));
    } else {
      this.transacciones = Object.assign([], this.transacciones.sort(this.compararPorTipo));
    }
    this.filtrar()
  }

  /***Enviar*******************************************/

  public enviarTransacciones(transaccionesAMostrar: Transaccion[]) {
    this.listaAMostrarEmitter.emit(transaccionesAMostrar);
  }

}
