import { Component, OnInit } from '@angular/core';
import { Evento } from 'src/app/models/evento';
import { EventosService } from 'src/app/services/eventos.service';

@Component({
  selector: 'app-eventos-crear',
  templateUrl: './eventos-crear.component.html',
  styleUrls: ['./eventos-crear.component.scss']
})
export class EventosCrearComponent implements OnInit {

  public nuevoEvento: Evento = {
    allDay: false, 
    backgroundColor: "",
    end: "",
    start: "",
    title: "",
    id: ""
  };

  constructor(
    private eventoService: EventosService
  ) { }

  ngOnInit() { }

  crearEvento() {
    this.nuevoEvento.id = this.nuevoEvento.start + this.nuevoEvento.title;
    // console.log(this.nuevoEvento);
    this.eventoService.addEvento(this.nuevoEvento);
  }

}
