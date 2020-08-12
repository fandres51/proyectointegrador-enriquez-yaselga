import { Component, OnInit } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Transaccion } from 'src/app/models/transaccion';
import { TransaccionesService } from 'src/app/services/transacciones.service';

@Component({
  selector: 'app-financiero-crear',
  templateUrl: './financiero-crear.component.html',
  styleUrls: ['./financiero-crear.component.scss']
})
export class FinancieroCrearComponent implements OnInit {
  public transaccion: Transaccion = {
    Monto: 0,
    Descripcion: "",
    Fecha: null,
    Ingreso: false,
    Tipo: "",
    TipoMonetario: "",
    id: ""
  };

  constructor(
    public transaccionService:TransaccionesService
  ) { }

  ngOnInit(): void { }

  agregarFechaATransaccion(event: MatDatepickerInputEvent<Date>) {
    this.transaccion.Fecha = event.value;
  }

  addTransaccion(transaccion) {
    this.transaccionService.addTransaccion(transaccion);
  }

}
