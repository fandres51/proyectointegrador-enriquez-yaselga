import { Component, Input, OnInit } from '@angular/core';
import { Incidente } from 'src/app/models/incidente';
import { AuthService } from 'src/app/services/auth.service';
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
    private readonly incidenteService: IncidenteService,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  onPageChange($event) {
    this.pageIndex = $event.pageIndex;
    this.pageSize = $event.pageSize;
    this.changePagination();
  }

  changePagination() {
    this.incidentesPaginados = this.incidentes.slice(this.pageIndex * this.pageSize, this.pageIndex * this.pageSize + this.pageSize);
  }

  eliminar(id: Incidente) {
    this.authService.auth.user.subscribe(
      user => {
        this.authService.getPermiso(user.email, 'Incidentes_delete').subscribe(
          permiso => {
            if (permiso.length > 0) {
              const estaSeguro = confirm('¿Está seguro que desea eliminar el elemento sleccionado?');
              if (estaSeguro)
                this.incidenteService.deleteIncidente(id);
            }
            else
              alert('Usted no tiene permiso para realizar esa acción');
          }
        )
      }
    )
  }
}
