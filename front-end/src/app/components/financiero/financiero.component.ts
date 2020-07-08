import { Component, OnInit } from '@angular/core';
import { Transaccion } from 'src/app/models/transaccion';
import { TransaccionesService } from 'src/app/services/transacciones.service';
import { DialogCargaMasivaFinancieroComponent } from './dialog-carga-masiva-financiero/dialog-carga-masiva-financiero.component';
import { MatDialog } from '@angular/material/dialog';

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
    public TransaccionService:TransaccionesService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.TransaccionService.getTransaccion().subscribe( transaccion => {
      
      this.transacciones = transaccion;
      this.transaccionesMostradas = Object.assign([], transaccion);

      this.ingresos = this.transaccionesMostradas.reduce((valorAcumulado, valorActual) => {
        if(valorActual.Ingreso) {
          return Number( Number(valorAcumulado) + Number(valorActual.Monto) );
        }
        return valorAcumulado;
      }, 0);
      
      this.egresos = this.transaccionesMostradas.reduce((valorAcumulado, valorActual) => {
        if(!valorActual.Ingreso) {
          return Number( Number(valorAcumulado) + Number(valorActual.Monto) );
        }
        return valorAcumulado;
      }, 0);
    })
  }

  public openDialog():void {
    const dialogRef = this.dialog.open(DialogCargaMasivaFinancieroComponent, {
      width: '800px'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    })
  }

  cargarTransaccionesMostradas(transaccionesMostradas: Transaccion[]) {
    this.transaccionesMostradas = Object.assign([], transaccionesMostradas);

    this.ingresos = this.transaccionesMostradas.reduce((valorAcumulado, valorActual) => {
      if(valorActual.Ingreso) {
        return Number( Number(valorAcumulado) + Number(valorActual.Monto) );
      }
      return valorAcumulado;
    }, 0);
    
    this.egresos = this.transaccionesMostradas.reduce((valorAcumulado, valorActual) => {
      if(!valorActual.Ingreso) {
        return Number( Number(valorAcumulado) + Number(valorActual.Monto) );
      }
      return valorAcumulado;
    }, 0);
  }
}
