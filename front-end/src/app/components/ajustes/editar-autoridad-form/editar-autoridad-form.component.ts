import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Autoridad } from 'src/app/models/autoridad';
import { Permiso } from 'src/app/models/permiso';
import { AsociacionService } from 'src/app/services/asociacion.service';
import { AuthService } from 'src/app/services/auth.service';
import { AutoridadesService } from 'src/app/services/autoridades.service';

@Component({
  selector: 'app-editar-autoridad-form',
  templateUrl: './editar-autoridad-form.component.html',
  styleUrls: ['./editar-autoridad-form.component.scss']
})
export class EditarAutoridadFormComponent implements OnInit {

  autoridad: Autoridad;
  autoridadCargo: string;
  periodoActual: string;
  permisos: Permiso[];

  modulos = {
    Estudiantes:true,
    Financiero:true,
    Eventos:true,
    Filiales:true,
    Notificaciones:true,
    Autoridades:true,
    Recursos:true,
    Elecciones:true,
    Contratos:true,
    Incidentes:true
  }

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly autoridadService: AutoridadesService,
    private readonly asociacionService: AsociacionService,
    private readonly authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.autoridad = {
      Cargo: '',
      CorreoInstitucional: '',
      NoUnico: '',
      Nombre: '', 
      Cedula: '',
      CorreoPersonal: '',
      Telefono: ''
    }
    this.route.paramMap.subscribe(
      params => {
        this.autoridadCargo = params.get('cargo');
        this.asociacionService.getAsociacion().subscribe(
          asociacion => {
            this.periodoActual = asociacion.AsociacionActual;
            this.autoridadService.getAutoridad(this.autoridadCargo, this.periodoActual).subscribe(
              autoridad => {
                this.autoridad = autoridad;
                this.authService.getPermisos(this.autoridad.CorreoInstitucional).subscribe(
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
      },
      error => {
        console.error(error);
      }
    )
  }

  editar() {
    const estaSeguro = confirm('¿Está seguro de querer editar los datos de esta autoridad?');
    if(estaSeguro) {
      this.autoridadService.updateAutoridad(this.autoridadCargo, this.periodoActual, this.autoridad);
      alert('Autoridad editada correctamente');
      this.router.navigate(['/ajustes/editar-autoridades']);
    }
  }

  cambiarPermisos() {
    const estaSeguro = confirm('¿Está seguro de querer cambiar los permisos de esta autoridad?');
    if(estaSeguro) {
      let modulosNombres = Object.keys(this.modulos);
      this.permisos.forEach( n => {
        this.authService.deletePermiso(n);
      })
      modulosNombres.forEach( n => {
        if(this.modulos[n])
          this.authService.createPermiso({
            email: this.autoridad.CorreoInstitucional,
            modulo: n
          })
      })
      alert('Permisos cambiados');
    }
  }

  crearPermiso(modulo: string) {
    if(this.modulos[modulo]) {
      this.authService.createPermiso({
        email: this.autoridad.CorreoInstitucional,
        modulo: modulo
      })
    }
  }

  return() {
    this.router.navigate(['/ajustes', 'editar-autoridades']);
  }
}
