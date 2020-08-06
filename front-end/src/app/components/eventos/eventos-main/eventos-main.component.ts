import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CalendarOptions } from '@fullcalendar/angular';
import { Evento } from 'src/app/models/evento';
import { EventosService } from 'src/app/services/eventos.service';
import { EventosInfoComponent } from '../eventos-info/eventos-info.component';

@Component({
  selector: 'app-eventos-main',
  templateUrl: './eventos-main.component.html',
  styleUrls: ['./eventos-main.component.scss']
})

export class EventosMainComponent implements OnInit {

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    events: [],
    eventClick: this.openDialog.bind(this)
  };

  constructor(
    public router: Router,
    public dialog: MatDialog,
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

  public openDialog(event) {
    console.log(event.event.title);
    this.router.navigate(['/eventos/info', event.event.title]);
  } 
}
