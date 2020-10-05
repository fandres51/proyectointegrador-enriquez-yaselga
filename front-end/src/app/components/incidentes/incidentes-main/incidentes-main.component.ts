import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Incidente } from 'src/app/models/incidente';
import { IncidenteService } from 'src/app/services/incidente.service';

@Component({
  selector: 'app-incidentes-main',
  templateUrl: './incidentes-main.component.html',
  styleUrls: ['./incidentes-main.component.scss']
})
export class IncidentesMainComponent implements OnInit {
  
  public incidentes: Incidente[];

  constructor(
    private readonly incidenteService: IncidenteService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.incidenteService.getIncidentes().subscribe(
      incidentes => {
        this.incidentes = incidentes;
      }
    )
  }

  mostrarElementos(incidentes: Incidente[]) {
    this.incidentes = incidentes;
  }

  nuevo() {
    this.router.navigate(['/incidentes', 'nuevo']);
  }

}
