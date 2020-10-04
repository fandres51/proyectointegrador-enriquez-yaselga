import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Eleccion } from 'src/app/models/eleccion';
import { Lista } from 'src/app/models/lista';
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
              this.listas = listas.map( n => n.nombre );
            }
          )
        }
      )
    });
  }

  irALista(lista: string) {
    this.router.navigate(['/elecciones' + '/' + this.fechaEleccion + '/' + lista]);
  }

  nuevaLista() {
    const nombreLista = prompt("Ingrese el nombre de la nueva lista");
    if(nombreLista !== null || nombreLista !== "") {
        const lista: Lista = { nombre: nombreLista }
        this.eleccionService.createLista(lista, this.fechaEleccion)
    }
  }

  definirListaGanadora(lista: string) {
    const estaSeguro = confirm('¿Está seguro que desea definir esta lista como ganadora? \nEsta acción generará un nuevo consejo de autoridades y eliminará todas las actividades del consejo anterior');
    if(estaSeguro) {
      const estaSeguro2 = confirm('¿Está seguro de proceder? \nEsta acción no se puede deshacer');
      if(estaSeguro && estaSeguro2) {
        this.eleccionService.definirListaGanadora(lista, this.fechaEleccion);
        this.eleccionService.getDignidadesDeLista(lista, this.fechaEleccion).subscribe(
          dignidades => {
            this.autoridadService.cambiarAsociacion(dignidades);
          }
        )
      }
    }
  }

  deleteElection() {
    const estaSeguro = confirm('¿Está seguro que desea eliminar esta elección?');
    if(estaSeguro) {
      this.eleccionService.deleteEleccion(this.eleccion);
      this.router.navigate(['/elecciones']);
    }
  }
}
