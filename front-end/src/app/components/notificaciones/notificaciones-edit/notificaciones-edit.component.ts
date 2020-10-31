import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Notificacion } from 'src/app/models/notificacion';
import { NotificacionService } from 'src/app/services/notificacion.service';

@Component({
  selector: 'app-notificaciones-edit',
  templateUrl: './notificaciones-edit.component.html',
  styleUrls: ['./notificaciones-edit.component.scss']
})
export class NotificacionesEditComponent implements OnInit {

  notificacion: Notificacion;
  notificacionID: string;
  tiempo: string;

  constructor(
    private readonly notificService: NotificacionService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
  ) { }

  ngOnInit(): void {
    this.notificacion = {
      descripcion: '',
      nombre: '',
      tiempo: new Date(),
      tipo: 'Alerta'
    }
    this.route.paramMap.subscribe(
      params => {
        this.notificacionID = params.get('nombre');
        this.notificService.getNotificacion(this.notificacionID).subscribe(
          notif => {
            this.notificacion = notif;
            this.tiempo = this.formatDate(notif.tiempo);
          },
          error => {
            console.error(error);
          }
        )
      },
      error => {
        console.error(error);
      }
    )
  }

  private formatDate(fecha:Date): string {
    return fecha.getFullYear() + '-' + ('0' + fecha.getMonth()).slice(-2) + '-' +  ('0' + fecha.getDate()).slice(-2) + 'T' + ('0' + fecha.getHours()).slice(-2) + ':' + ('0' + fecha.getMinutes()).slice(-2);
  }

  editar() {
    this.notificacion.tiempo = new Date(this.tiempo);
    let estaSeguro = confirm('¿Está seguro que desea editar la información de esta notificación?')
    if (estaSeguro) {
      this.notificService.updateNotificacion(this.notificacion);
      this.router.navigate(['/notificaciones'])
    }
  }

  eliminar() {
    let estaSeguro = confirm('¿Está seguro que desea eliminar esta notificación?')
    if (estaSeguro) {
      this.notificService.deleteNotificacion(this.notificacion);
      this.router.navigate(['/notificaciones']);
    }
  }

}
