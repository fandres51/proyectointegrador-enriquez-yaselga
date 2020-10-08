import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Notificacion } from 'src/app/models/notificacion';
import { NotificacionService } from 'src/app/services/notificacion.service';

@Component({
  selector: 'app-notificaciones-main',
  templateUrl: './notificaciones-main.component.html',
  styleUrls: ['./notificaciones-main.component.scss']
})
export class NotificacionesMainComponent implements OnInit {

  notificaciones: Notificacion[];
  notNombres: string[];

  constructor(
    private readonly notificacionService: NotificacionService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.notificacionService.getNotificacions().subscribe(
      notif => {
        this.notificaciones = notif;
        this.notNombres = notif.map(n=>n.nombre);
      },
      error => {
        console.error(error);
      }
    )
  }

  edit(nombre) {
    let notificacion = this.notificaciones.find(n=>n.nombre===nombre);
    this.router.navigate(['/notificaciones', 'editar', notificacion.id]);
  }
  
  new() {
    this.router.navigate(['/notificaciones', 'nuevo']);
  }

}
