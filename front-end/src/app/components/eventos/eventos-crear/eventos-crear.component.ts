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
    title: ""
  };

  constructor(
    private eventoService: EventosService
  ) { }

  ngOnInit() { }

  crearEvento() {
    // console.log(this.nuevoEvento);
    this.eventoService.addEvento(this.nuevoEvento);
  }

}
