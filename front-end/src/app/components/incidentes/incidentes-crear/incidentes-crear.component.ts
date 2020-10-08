import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Incidente } from 'src/app/models/incidente';
import { EstudiantesService } from 'src/app/services/estudiantes.service';
import { IncidenteService } from 'src/app/services/incidente.service';

@Component({
  selector: 'app-incidentes-crear',
  templateUrl: './incidentes-crear.component.html',
  styleUrls: ['./incidentes-crear.component.scss']
})
export class IncidentesCrearComponent implements OnInit {

  incidente: Incidente;
  fecha: string;

  constructor(
    private readonly estudianteService: EstudiantesService,
    private readonly incidenteService: IncidenteService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.incidente = {
      descripcion: '',
      estudiante: '',
      evento: '',
      fecha: new Date(),
      id: '',
      nombre: ''
    }
  }

  nuevo() {
    this.incidente.fecha = new Date(this.fecha);
    this.estudianteService.existeEstudiante(this.incidente.estudiante).then(
      existe => {
        if(existe) {
          this.incidenteService.addIncidente(this.incidente);
          this.router.navigate(['/incidentes']);
        } else {
          alert('No existe estudiante con número único seleccionado');
        }
      }
    )
  }

}
