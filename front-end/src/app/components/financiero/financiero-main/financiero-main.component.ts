import { Component, OnInit } from '@angular/core';
import { Transaccion } from 'src/app/models/transaccion';
import { TransaccionesService } from 'src/app/services/transacciones.service';

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
    public transaccionService:TransaccionesService
  ) { }

  ngOnInit() { }

  crearIngresosYEgresos(transacciones: Transaccion[]) {
    
    this.transacciones = transacciones;

    this.ingresos = this.transacciones.reduce((valorAcumulado, valorActual) => {
      if(valorActual.Ingreso) {
        return Number( Number(valorAcumulado) + Number(valorActual.Monto) );
      }
      return valorAcumulado;
    }, 0);
    
    this.egresos = this.transacciones.reduce((valorAcumulado, valorActual) => {
      if(!valorActual.Ingreso) {
        return Number( Number(valorAcumulado) + Number(valorActual.Monto) );
      }
      return valorAcumulado;
    }, 0);
  }

  cargaMasiva(event: FileList) {
    const file = event.item(0);
    if (file.type.split('/')[1] !== 'csv') {
      console.error('Unsupported file type!!');
    }
    // this.transaccionService.cargaMasivaTransacciones(file);
  }
}
