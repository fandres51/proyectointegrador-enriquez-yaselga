import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Eleccion } from 'src/app/models/eleccion';
import { Lista } from 'src/app/models/lista';
import { AsociacionService } from 'src/app/services/asociacion.service';
import { AuthService } from 'src/app/services/auth.service';
import { AutoridadesService } from 'src/app/services/autoridades.service';
import { EleccionService } from 'src/app/services/eleccion.service';

@Component({
  selector: 'app-elecciones-detalle',
  templateUrl: './elecciones-detalle.component.html',
  styleUrls: ['./elecciones-detalle.component.scss']
})
export class EleccionesDetalleComponent implements OnInit {

  public eleccion: Eleccion;
  public fechaEleccion: string;
  public listas: string[] = [];
  public rutaDeRegreso: string = "/elecciones";

  constructor(
    private route: ActivatedRoute,
    private eleccionService: EleccionService,
    private autoridadService: AutoridadesService,
    private asociacionService: AsociacionService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const fechaParam = params['id'];
      this.fechaEleccion = fechaParam;
      this.eleccionService.getEleccion(fechaParam).subscribe(
        eleccion => {
          this.eleccion = eleccion;
          this.eleccionService.getListas(fechaParam).subscribe(
            listas => {
              this.listas = listas.map(n => n.nombre);
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
      });
  }

  irALista(lista: string) {
    this.router.navigate(['/elecciones' + '/' + this.fechaEleccion + '/' + lista]);
  }

  nuevaLista() {
    this.authService.auth.user.subscribe(
      user => {
        this.authService.getPermiso(user.email, 'Elecciones_edit').subscribe(
          permiso => {
            if (permiso.length > 0) {
              const estaSeguro = confirm('¿Está seguro que desea eliminar este contrato?');
              if (estaSeguro) {
                const nombreLista = prompt("Ingrese el nombre de la nueva lista");
                if (nombreLista !== null || nombreLista !== "") {
                  const lista: Lista = { nombre: nombreLista }
                  this.eleccionService.createLista(lista, this.fechaEleccion)
                }
              }
            }
            else
              alert('Usted no tiene permiso para realizar esa acción');
          }
        )
      }
    )
  }

  definirListaGanadora(lista: string) {

    this.authService.auth.user.subscribe(
      user => {
        this.authService.getPermiso(user.email, 'Autoridades_new').subscribe(
          permiso => {
            if (permiso.length > 0) {
              const estaSeguro = confirm('¿Está seguro que desea definir esta lista como ganadora? \nEsta acción generará un nuevo consejo de autoridades y eliminará todas las actividades del consejo anterior');
              if (estaSeguro) {
                const estaSeguro2 = confirm('¿Está seguro de proceder? \nEsta acción no se puede deshacer');
                if (estaSeguro && estaSeguro2) {
                  this.asociacionService.updateAsociacion({ AsociacionActual: 'AEIS' + (new Date()).getFullYear() });
                  this.eleccionService.definirListaGanadora(lista, this.fechaEleccion);
                  this.eleccionService.getDignidadesDeLista(lista, this.fechaEleccion).subscribe(
                    dignidades => {
                      this.autoridadService.cambiarAsociacion(dignidades);
                    },
                    error => {
                      console.error(error);
                    }
                  )
                }
              }
            }
            else
              alert('Usted no tiene permiso para realizar esa acción');
          }
        )
      }
    )
  }

  deleteElection() {
    this.authService.auth.user.subscribe(
      user => {
        this.authService.getPermiso(user.email, 'Elecciones_delete').subscribe(
          permiso => {
            if (permiso.length > 0) {
              const estaSeguro = confirm('¿Está seguro que desea eliminar esta elección?');
              if (estaSeguro) {
                this.eleccionService.deleteEleccion(this.eleccion);
                this.router.navigate(['/elecciones']);
              }
            }
            else
              alert('Usted no tiene permiso para realizar esa acción');
          }
        )
      }
    )
  }
}
