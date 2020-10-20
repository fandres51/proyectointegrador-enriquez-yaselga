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
    Estudiantes_new:false,
    Estudiantes_edit:false,
    Estudiantes_delete:false,
    Financiero:false,
    Financiero_new:false,
    Financiero_edit:false,
    Financiero_delete:false,
    Eventos:false,
    Eventos_new:false,
    Eventos_edit:false,
    Eventos_delete:false,
    Filiales:false,
    Filiales_new:false,
    Filiales_edit:false,
    Filiales_delete:false,
    Autoridades:false,
    Autoridades_new:false,
    Autoridades_edit:false,
    Autoridades_delete:false,
    Recursos:false,
    Recursos_new:false,
    Recursos_edit:false,
    Recursos_delete:false,
    Elecciones:false,
    Elecciones_new:false,
    Elecciones_edit:false,
    Elecciones_delete:false,
    Contratos:false,
    Contratos_new:false,
    Contratos_edit:false,
    Contratos_delete:false,
    Incidentes:false,
    Incidentes_new:false,
    Incidentes_edit:false,
    Incidentes_delete:false
  }

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void { }

  cargarPermiso() {
    this.mostrarPermisos = true;
    let permisosP = Object.keys(this.modulos);
    this.authService.getPermisos(this.email).subscribe( permisos => {
      this.permisos = permisos;
    })
    permisosP.forEach( n => {
      this.authService.getPermiso(this.email, n).subscribe( permiso => {
        if( permiso.length > 0 )
          this.modulos[n] = true;
      })
    })
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
    alert('Permisos creados!');
  }

}
