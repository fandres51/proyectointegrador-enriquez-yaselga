import { Component, OnInit } from '@angular/core';
import { Evento } from 'src/app/models/evento';
import { AutoridadesService } from 'src/app/services/autoridades.service';
import { EventosService } from 'src/app/services/eventos.service';

@Component({
  selector: 'app-eventos-crear',
  templateUrl: './eventos-crear.component.html',
  styleUrls: ['./eventos-crear.component.scss']
})
export class EventosCrearComponent implements OnInit {

  public autoridades: string[] = [];

  public nuevoEvento: Evento = {
    allDay: false,
    backgroundColor: "",
    end: "",
    start: "",
    title: "",
    responsables: []
  };

  constructor(
    private eventoService: EventosService,
    private autoridadService: AutoridadesService
  ) {
    this.autoridadService.getConsejoActual()
  }

  ngOnInit() {
    this.autoridadService.getConsejoActual().subscribe(
      consejo => {
        this.autoridadService.getAutoridades(consejo[0].nombre).subscribe(
          autoridades => {
            this.autoridades = autoridades.map( n => n.Nombre );
          }
        )
      }
    )
  }

  crearEvento(responsable: string) {
    this.nuevoEvento.responsables[0] = responsable;
    console.log(this.nuevoEvento);
    this.eventoService.addEvento(this.nuevoEvento);
  }

}
