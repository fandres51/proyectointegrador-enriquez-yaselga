import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Eleccion } from 'src/app/models/eleccion';
import { AuthService } from 'src/app/services/auth.service';
import { EleccionService } from 'src/app/services/eleccion.service';

@Component({
  selector: 'app-elecciones-main',
  templateUrl: './elecciones-main.component.html',
  styleUrls: ['./elecciones-main.component.scss']
})
export class EleccionesMainComponent implements OnInit {

  public elecciones: string[] = [];
  public rutaDeRegreso: string = "/";
  public texto: string = "Elecciones";

  constructor(
    private eleccionService: EleccionService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.eleccionService.getElecciones().subscribe(
      elecciones => {
        this.elecciones = elecciones.map(n => n.fecha.getMonth() + '-' + n.fecha.getDate() + '-' + n.fecha.getFullYear());
      },
      error => {
        console.error(error);
      }
    )
  }

  crearEleccion(nueva) {
    this.authService.auth.user.subscribe(
      user => {
        this.authService.getPermiso(user.email, 'Elecciones_new').subscribe(
          permiso => {
            if (permiso.length > 0) {
              const conf = confirm('Está por crear una nueva elección con la fecha actual, ¿está seguro que desea continuar?');
              if (conf) {
                this.eleccionService.createEleccion({
                  fecha: new Date(),
                  listaGanadora: ''
                })
              }
            }
            else
              alert('Usted no tiene permiso para realizar esa acción');
          }
        )
      }
    )

  }

  irAEleccion(eleccion: string) {
    this.router.navigate(['/elecciones', eleccion])
  }



}
