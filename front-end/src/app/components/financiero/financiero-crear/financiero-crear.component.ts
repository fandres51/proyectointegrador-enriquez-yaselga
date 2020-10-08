import { Component, OnInit } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Router } from '@angular/router';
import { Transaccion } from 'src/app/models/transaccion';
import { TransaccionesService } from 'src/app/services/transacciones.service';

@Component({
  selector: 'app-financiero-crear',
  templateUrl: './financiero-crear.component.html',
  styleUrls: ['./financiero-crear.component.scss']
})
export class FinancieroCrearComponent implements OnInit {

  public fecha;

  public transaccion: Transaccion = {
    Monto: 0.05,
    Descripcion: "",
    Fecha: new Date(),
    Ingreso: false,
    Tipo: 'Otro',
    id: "",
    Activa: true
  };

  constructor(
    public transaccionService:TransaccionesService,
    private router: Router
  ) { }

  ngOnInit(): void { }

  addTransaccion(transaccion) {
    this.transaccion.Fecha = new Date(this.fecha);
    this.transaccionService.addTransaccion(transaccion);
    this.router.navigateByUrl('/financiero')
  }

}
