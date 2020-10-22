import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import { Evento } from 'src/app/models/evento';
import { EventosService } from 'src/app/services/eventos.service';

@Component({
  selector: 'app-eventos-main',
  templateUrl: './eventos-main.component.html',
  styleUrls: ['./eventos-main.component.scss']
})
export class EventosMainComponent implements OnInit {

  private eventos: Evento[] = []

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    events: this.eventos,
  };

  constructor(
    private eventosService: EventosService
  ) { }

  ngOnInit() {
    this.eventosService.getEventos().subscribe(
      eventos => {
        this.calendarOptions.events = eventos;
      }
    );
  }
}
