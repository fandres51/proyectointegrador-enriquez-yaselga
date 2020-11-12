import { Component, OnInit } from '@angular/core';
import { Permiso } from 'src/app/models/permiso';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-crear-permiso',
  templateUrl: './crear-permiso.component.html',
  styleUrls: ['./crear-permiso.component.scss']
})
export class CrearPermisoComponent implements OnInit {

  email: string;
  permisos: Permiso[];
  mostrarPermisos = false;

  modulos = {
    Estudiantes:false,
    Financiero:false,
    Eventos:false,
    Filiales:false,
    Notificaciones:false,
    Autoridades:false,
    Recursos:false,
    Elecciones:false,
    Contratos:false,
    Incidentes:false
  }

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void { }

  cargarPermiso() {
    this.mostrarPermisos = true;
    this.authService.getPermisos(this.email).subscribe(
      permisos => {
        this.permisos = permisos;
        let modulosP = Object.keys(this.modulos);
        modulosP.forEach( mod => {
          if(permisos.some( n => n.modulo===mod )) {
            this.modulos[mod] = true;
          } else {
            this.modulos[mod] = false;
          }
        })
      },
      error => {
        console.error(error);
      }
    )
  }

  crearPermiso() {
    let modulosNombres = Object.keys(this.modulos);
    this.permisos.forEach( n => {
      this.authService.deletePermiso(n);
    })
    modulosNombres.forEach( n => {
      if(this.modulos[n])
        this.authService.createPermiso({
          email: this.email,
          modulo: n
        })
    })
  }

}
