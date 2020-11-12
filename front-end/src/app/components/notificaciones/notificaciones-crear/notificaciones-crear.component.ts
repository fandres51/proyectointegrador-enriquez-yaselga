import { Component, OnInit } from '@angular/core';
import { Notificacion } from 'src/app/models/notificacion';
import { NotificacionService } from 'src/app/services/notificacion.service';

@Component({
  selector: 'app-notificaciones-crear',
  templateUrl: './notificaciones-crear.component.html',
  styleUrls: ['./notificaciones-crear.component.scss']
})
export class NotificacionesCrearComponent implements OnInit {

  notificacion: Notificacion;
  tiempo: string;

  constructor(
    private readonly notificService: NotificacionService
  ) { }

  ngOnInit(): void {
    this.notificacion = {
      descripcion: '',
      nombre: '',
      tiempo: new Date(),
      tipo: 'Aviso'
    }
  }

  nueva() {
    this.notificacion.tiempo = new Date(this.tiempo);
    this.notificService.addNotificacion(this.notificacion);
  }



}
