import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Incidente } from 'src/app/models/incidente';
import { IncidenteService } from 'src/app/services/incidente.service';

@Component({
  selector: 'app-incidentes-filtros',
  templateUrl: './incidentes-filtros.component.html',
  styleUrls: ['./incidentes-filtros.component.scss']
})
export class IncidentesFiltrosComponent implements OnInit {

  @Output() onSearch: EventEmitter<Incidente[]> = new EventEmitter<Incidente[]>();
  incidentes: Incidente[] = [];

  constructor(
    private readonly incidentesService: IncidenteService
  ) { }

  ngOnInit(): void { 
    this.incidentesService.getIncidentes().subscribe(
      incidentes => {
        this.incidentes = incidentes;
      },
      error => {
        console.error(error);
      }
    )
  }


  buscarPorNoUnico(busqueda: string) {
    let incidentesAMostrar = this.incidentes.filter( n => {
      return n.estudiante.includes(busqueda);
    })
    this.onSearch.emit(incidentesAMostrar);
  }
  
  buscarPorNombre(busqueda: string) {
    let incidentesAMostrar = this.incidentes.filter( n => {
      return n.nombre.includes(busqueda);
    })
    this.onSearch.emit(incidentesAMostrar);
  }
  
  buscarPorEvento(busqueda: string) {
    let incidentesAMostrar = this.incidentes.filter( n => {
      return n.evento.includes(busqueda);
    })
    this.onSearch.emit(incidentesAMostrar);
  }
  
  limpiarBusqueda() {
    this.onSearch.emit(this.incidentes);
  }

}
