import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Evento } from 'src/app/models/evento';
import { EventosService } from 'src/app/services/eventos.service';

@Component({
  selector: 'app-eventos-info',
  templateUrl: './eventos-info.component.html',
  styleUrls: ['./eventos-info.component.scss']
})
export class EventosInfoComponent implements OnInit {

  public evento: Evento;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventoService: EventosService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.eventoService.getEvento(params['id']).subscribe(
        evento => this.evento = evento
      )
    })
  }

  regresar() {
    this.router.navigateByUrl('/eventos');
  }

  editarEvento() {
    
    this.router.navigate(['/eventos/actualizar', this.evento.id]);
  }

  borrarEvento() {
    if (window.confirm('¿Está seguro que desea eliminar el evento?')) {
      this.eventoService.deleteEvento(this.evento.id);
      this.router.navigateByUrl('/eventos');
    }
  }
}
