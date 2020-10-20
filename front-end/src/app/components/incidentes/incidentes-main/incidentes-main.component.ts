import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Incidente } from 'src/app/models/incidente';
import { AuthService } from 'src/app/services/auth.service';
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
    private readonly router: Router,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.incidenteService.getIncidentes().subscribe(
      incidentes => {
        this.incidentes = incidentes;
      },
      error => {
        console.error(error);
      }
    )
  }

  mostrarElementos(incidentes: Incidente[]) {
    this.incidentes = incidentes;
  }

  nuevo() {
    this.authService.auth.user.subscribe(
      user => {
        this.authService.getPermiso(user.email, 'Incidentes_new').subscribe(
          permiso => {
            if (permiso.length > 0) {
              this.router.navigate(['/incidentes', 'nuevo']);
            }
            else
              alert('Usted no tiene permiso para realizar esa acción');
          }
        )
      }
    )
  }

}
