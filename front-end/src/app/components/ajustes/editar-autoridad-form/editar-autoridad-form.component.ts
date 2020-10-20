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
