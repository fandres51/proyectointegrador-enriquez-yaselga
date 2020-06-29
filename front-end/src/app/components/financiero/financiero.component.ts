import { Component, OnInit } from '@angular/core';
import { Transaccion } from 'src/app/models/transaccion';
import { TransaccionesService } from 'src/app/services/transacciones.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-financiero',
  templateUrl: './financiero.component.html',
  styleUrls: ['./financiero.component.scss']
})
export class FinancieroComponent implements OnInit {

  public transacciones: Transaccion[] = [];
  public transaccionesMostradas: Transaccion[] = [];

  public ingresos: number = 0;
  public egresos: number = 0;

  constructor(
    public TransaccionService:TransaccionesService
  ) { }

  ngOnInit() {
    this.TransaccionService.getTransaccion().subscribe( transaccion => {
      
      this.transacciones = transaccion;
      this.transaccionesMostradas = Object.assign([], transaccion);

      this.ingresos = this.transaccionesMostradas.reduce((valorAcumulado, valorActual) => {
        if(valorActual.Ingreso) {
          console.log(valorAcumulado);
          return Number( valorAcumulado + valorActual.Monto );
        }
        return valorAcumulado;
      }, 0);
      
      this.egresos = this.transaccionesMostradas.reduce((valorAcumulado, valorActual) => {
        if(!valorActual.Ingreso) {
          console.log(valorAcumulado);
          return Number( valorAcumulado + valorActual.Monto );
        }
        return valorAcumulado;
      }, 0);
    })
  }
}
