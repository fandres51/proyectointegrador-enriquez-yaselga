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

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    events: [],
  };

  constructor(
    private eventosService: EventosService
  ) { }

  ngOnInit() {
    this.eventosService.getEventos().subscribe(
      eventos => {
        this.calendarOptions.events = eventos.map( (n: Evento) => {
          return {
            allDay: n.allDay,
            start: n.start,
            end: n.end,
            title: n.title,
            backgroundColor: n.backgroundColor
          }
        });
      }
    );
  }
}
