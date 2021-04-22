import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Eleccion } from 'src/app/models/eleccion';
import { AsociacionService } from 'src/app/services/asociacion.service';
import { AutoridadesService } from 'src/app/services/autoridades.service';
import { EleccionService } from 'src/app/services/eleccion.service';

@Component({
  selector: 'app-ajustes-terminar-periodo',
  templateUrl: './ajustes-terminar-periodo.component.html',
  styleUrls: ['./ajustes-terminar-periodo.component.scss']
})
export class AjustesTerminarPeriodoComponent implements OnInit {

  public elecciones: Eleccion[] = [];
  public eleccionesTit: string[] = [];
  public listas: string[] = [];
  public mostrarListasBool: boolean = false;
  public eleccionSeleccinada: string;

  constructor(
    private readonly asociacionService: AsociacionService,
    private readonly eleccionService: EleccionService,
    private readonly autoridadService: AutoridadesService,
    private readonly router: Router
  ) { }

  ngOnInit(): void { 
    this.eleccionService.getElecciones().subscribe(
      elecciones => {
        this.elecciones = elecciones.filter(n => n.listaGanadora === '');
        this.eleccionesTit = this.elecciones.map(e => e.titulo);
      }
    )
  }

  mostrarListas(eleccionTitulo: string) {
    const eleccion = this.elecciones.find((elec)=>elec.titulo===eleccionTitulo).id;
    
    this.eleccionService.getListas(eleccion).subscribe(
      listas => {
        this.listas = listas.map( n => n.nombre );
        this.mostrarListasBool = true;
        this.eleccionSeleccinada = eleccion;
      }
    )
  }

  definirListaGanadora(lista: string) {
    const estaSeguro = confirm('¿Está seguro que desea definir esta lista como ganadora? \nEsta acción generará un nuevo consejo de autoridades y eliminará todas las actividades del consejo anterior');
    if(estaSeguro) {
      const estaSeguro2 = confirm('¿Está seguro de proceder? \nEsta acción no se puede deshacer');
      if(estaSeguro && estaSeguro2) {
        this.asociacionService.updateAsociacion({AsociacionActual: 'AEIS'+(new Date()).getFullYear()});
        this.eleccionService.definirListaGanadora(lista, this.eleccionSeleccinada);
        this.eleccionService.getDignidadesDeLista(lista, this.eleccionSeleccinada).subscribe(
          dignidades => {
            this.autoridadService.cambiarAsociacion(dignidades);
            this.router.navigate(['/']);
          },
          error => {
            console.error(error);
          }
        )
      }
    }
  }

}
