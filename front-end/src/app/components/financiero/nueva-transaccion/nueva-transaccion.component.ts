import { Component, OnInit } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Transaccion } from 'src/app/models/transaccion';
import { TransaccionesService } from 'src/app/services/transacciones.service';

@Component({
  selector: 'app-nueva-transaccion',
  templateUrl: './nueva-transaccion.component.html',
  styleUrls: ['./nueva-transaccion.component.scss']
})
export class NuevaTransaccionComponent implements OnInit {

  public transaccion: Transaccion = {
    Monto: 0,
    Descripcion: "",
    Fecha: null,
    Ingreso: false,
    Tipo: "",
    TipoMonetario: "",
    id: "03712897594875"
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
