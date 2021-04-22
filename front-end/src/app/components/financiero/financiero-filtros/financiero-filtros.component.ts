import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Transaccion } from 'src/app/models/transaccion';
import { TransaccionesService } from 'src/app/services/transacciones.service';
import { ActivatedRoute } from '@angular/router';
import { Filial } from 'src/app/models/filial';
import { FilialService } from 'src/app/services/filial.service';

@Component({
  selector: 'app-financiero-filtros',
  templateUrl: './financiero-filtros.component.html',
  styleUrls: ['./financiero-filtros.component.scss']
})
export class FinancieroFiltrosComponent implements OnInit {

  idFilial: string;
  filial: Filial = {
    id: "0",
    nombre: ""
  };

  private transacciones: Transaccion[];
  @Output() public listaAMostrarEmitter = new EventEmitter();

  public tipoDeOrdenamiento: string = '';
  public ingresoFiltro: 'ingreso' | 'egreso' | 't' = 't';
  public startDateFiltro: string = (new Date('2020-01-01')).toDateString();
  public endDateFiltro: string = this.getTomorrowDate().toDateString();
  public startDateFiltroIn: string = (new Date('2020-01-01')).toDateString();
  public endDateFiltroIn: string = this.getTomorrowDate().toDateString();
  public startMontoFiltro: number = 0;
  public endMontoFiltro: number = 1000000;
  public tipoFiltro: string = '';

  constructor(
    private transaccionesService: TransaccionesService,
    private route: ActivatedRoute,
    private filialService: FilialService,
  ) { }

  ngOnInit(): void {
    if (this.route.snapshot.params['id']) {
      this.idFilial = this.route.snapshot.params['id'];
      this.filialService.getFilial(this.idFilial).subscribe(item => { this.filial = item })
      this.transaccionesService.getTransaccionesPorFilial(this.idFilial).subscribe(
        transacciones => {
          this.transacciones = transacciones.sort(this.compararPorFechaIngreso);
          this.enviarTransacciones(this.transacciones)
        },
        error => {
          console.error(error);
        }
      )
    }
    else {
      this.transaccionesService.getTransacciones().subscribe(
        transacciones => {
          this.transacciones = transacciones.sort(this.compararPorFechaIngreso);
          this.enviarTransacciones(this.transacciones)
        },
        error => {
          console.error(error);
        }
      )
    }
  }

  /***Filtros****************************************** */

  buscarPorEstudiante(noUnico: string) {
    let transaccionesAMostrar = this.transacciones.filter(n => {
      if (n.PersonaID)
        return n.PersonaID.includes(noUnico);
    })
    this.enviarTransacciones(transaccionesAMostrar);
  }

  private getTomorrowDate(): Date {
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 2)
    return tomorrow;
  }

  private getTomorrowDateOf(date: Date): Date {
    const tomorrow = new Date(date)
    tomorrow.setDate(tomorrow.getDate() + 1)
    return tomorrow;
  }

  filtrar() {
    let transaccionesAMostrar = this.transacciones.filter((transaccion) => {

      return (transaccion.Tipo === this.tipoFiltro || this.tipoFiltro === '') &&
        this.esIngresoFiltro(transaccion.Ingreso) &&
        (transaccion.Fecha >= this.getTomorrowDateOf(new Date(this.startDateFiltro))) &&
        (transaccion.Fecha <= this.getTomorrowDateOf(new Date(this.endDateFiltro))) &&
        (transaccion.FechaIngreso >= this.getTomorrowDateOf(new Date(this.startDateFiltroIn))) &&
        (transaccion.FechaIngreso <= this.getTomorrowDateOf(new Date(this.endDateFiltroIn))) &&
        (transaccion.Monto >= this.startMontoFiltro) &&
        (transaccion.Monto <= this.endMontoFiltro)
    })

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
    this.startDateFiltro = (new Date('2020-01-01')).toDateString();
    this.endDateFiltro = this.getTomorrowDate().toDateString();
    this.startDateFiltroIn = (new Date('2020-01-01')).toDateString();
    this.endDateFiltroIn = this.getTomorrowDate().toDateString();
    this.startMontoFiltro = 0;
    this.endMontoFiltro = 1000000;
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

  compararPorFechaIngreso(a, b) {
    if (a.FechaIngreso > b.FechaIngreso) {
      return -1;
    }
    if (a.FechaIngreso < b.FechaIngreso) {
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
    } else if (tipo == 'fecha2') {
      this.transacciones = Object.assign([], this.transacciones.sort(this.compararPorFechaIngreso));
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
