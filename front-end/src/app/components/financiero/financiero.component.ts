import { Component, OnInit } from '@angular/core';
import { Transaccion } from 'src/app/models/transaccion';
import { TransaccionesService } from 'src/app/services/transacciones.service';

@Component({
  selector: 'app-financiero',
  templateUrl: './financiero.component.html',
  styleUrls: ['./financiero.component.scss']
})
export class FinancieroComponent implements OnInit {

  public transacciones: Transaccion[] = [];
  public transaccionesMostradas: Transaccion[] = [];

  constructor(
    public TransaccionService:TransaccionesService
  ) { }

  ngOnInit() {
    this.TransaccionService.getTransaccion().subscribe( transaccion => {
      this.transacciones = transaccion;
      this.transaccionesMostradas = transaccion;
    })
  }

}
