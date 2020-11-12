import { Component, Input, OnInit } from '@angular/core';
import { Incidente } from 'src/app/models/incidente';
import { IncidenteService } from 'src/app/services/incidente.service';

@Component({
  selector: 'app-incidentes-listar',
  templateUrl: './incidentes-listar.component.html',
  styleUrls: ['./incidentes-listar.component.scss']
})
export class IncidentesListarComponent implements OnInit {

  public incidentes: Incidente[] = [];

  @Input() set _incidentes(incidentes: Incidente[]) {
    this.incidentes = incidentes;
    this.changePagination();
  }
  private pageIndex: number = 0;
  private pageSize: number = 9;
  public incidentesPaginados: Incidente[];

  constructor(
    private readonly incidenteService: IncidenteService
  ) { }

  ngOnInit(): void {
  }

  onPageChange($event) {
    this.pageIndex = $event.pageIndex;
    this.pageSize = $event.pageSize;
    this.changePagination();
  }
  
  changePagination() {
    this.incidentesPaginados = this.incidentes.slice(this.pageIndex*this.pageSize, this.pageIndex*this.pageSize + this.pageSize);
  }

  eliminar(id: Incidente) {
    const estaSeguro = confirm('¿Está seguro que desea eliminar el elemento sleccionado?');
    if(estaSeguro)
      this.incidenteService.deleteIncidente(id);
  }

  resolver(id) {
    const estaSeguro = confirm('¿Está seguro que desea marcar este incidente como resuelto?');
    if(estaSeguro)
      this.incidenteService.updateIncidente({
        id: id,
        resuelto: true
    });
  }

  noResuelto(id) {
    const estaSeguro = confirm('¿Está seguro que desea marcar este incidente como no resuelto?');
    if(estaSeguro)
      this.incidenteService.updateIncidente({
        id: id,
        resuelto: false
    });
  }


}
