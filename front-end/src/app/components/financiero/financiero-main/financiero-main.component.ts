import { Component, OnInit } from '@angular/core';
import { Transaccion } from 'src/app/models/transaccion';
import { TransaccionesService } from 'src/app/services/transacciones.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-financiero-main',
  templateUrl: './financiero-main.component.html',
  styleUrls: ['./financiero-main.component.scss']
})
export class FinancieroMainComponent implements OnInit {

  public transacciones: Transaccion[] = [];

  public ingresos: number = 0;
  public egresos: number = 0;

  constructor(
    public transaccionService:TransaccionesService,
    private readonly router: Router
  ) { }

  ngOnInit() { }

  crearIngresosYEgresos(transacciones: Transaccion[]) {
    
    this.transacciones = transacciones;

    this.ingresos = Math.round( this.transacciones.reduce((valorAcumulado, valorActual) => {
      if(valorActual.Ingreso && valorActual.Activa) {
        return Number( Number(valorAcumulado) + Number(valorActual.Monto) );
      }
      return valorAcumulado;
    }, 0) * 100)/100;
    
    this.egresos = Math.round(this.transacciones.reduce((valorAcumulado, valorActual) => {
      if(!valorActual.Ingreso && valorActual.Activa) {
        return Number( Number(valorAcumulado) + Number(valorActual.Monto) );
      }
      return valorAcumulado;
    }, 0) * 100)/100;
  }

  cargaMasiva(event: FileList) {
    const file = event.item(0);
    if (file.type.split('/')[1] !== 'csv') {
      console.error('Unsupported file type!!');
    }
    this.transaccionService.cargaMasivaTransaccion(file).then(
      noingresados => {
        if(noingresados.length > 0) {
          let registros: string = '';
          noingresados.forEach( n => {
            registros = registros + n + '\n';
          })
          alert('Registros no ingresados: \n' + registros);
        }
      }
    );
  }
}
