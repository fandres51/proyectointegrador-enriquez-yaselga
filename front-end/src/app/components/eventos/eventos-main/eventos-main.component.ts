import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CalendarOptions } from '@fullcalendar/angular';
import { Evento } from 'src/app/models/evento';
import { EventosService } from 'src/app/services/eventos.service';

@Component({
  selector: 'app-eventos-main',
  templateUrl: './eventos-main.component.html',
  styleUrls: ['./eventos-main.component.scss']
})

export class EventosMainComponent implements OnInit {

  private eventos: Evento[] = [];
  tipoFiltro: 'Evento' | 'Curso' | 'Club' | 'Todos' = 'Todos';

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    events: [],
    eventClick: this.openEventWindow.bind(this)
  };

  constructor(
    public router: Router,
    public dialog: MatDialog,
    private eventosService: EventosService
  ) { }

  ngOnInit() {
    this.eventosService.getEventos().subscribe(
      eventos => {
        this.eventos = eventos;
        this.generarCalendario(eventos);
      }
    );
  }

  private generarCalendario(eventos: Evento[]) {
    this.calendarOptions.events = eventos.map((n: Evento) => {
      if (n.tipo === 'Evento') {
        return {
          id: n.id,
          allDay: n.allDay,
          start: n.start,
          end: n.end,
          title: n.title,
          color: n.color
        }
      } else {
        return {
          id: n.id,
          allDay: n.allDay,
          startRecur: n.startRecur,
          endRecur: n.endRecur,
          startTime: n.startTime,
          endTime: n.endTime,
          daysOfWeek: n.daysOfWeek,
          title: n.title,
          color: n.color
        }
      }
    })
  }

  private generarCalendarioCondicion(eventos: Evento[], condicion: string) {
    this.calendarOptions.events = eventos.map((n: Evento) => {
      if(n.tipo === condicion || condicion === 'Todos') {
        if (n.tipo === 'Evento') {
          return {
            id: n.id,
            allDay: n.allDay,
            start: n.start,
            end: n.end,
            title: n.title,
            color: n.color
          }
        } else {
          return {
            id: n.id,
            allDay: n.allDay,
            startRecur: n.startRecur,
            endRecur: n.endRecur,
            startTime: n.startTime,
            endTime: n.endTime,
            daysOfWeek: n.daysOfWeek,
            title: n.title,
            color: n.color
          }
        }
      }
    })
  }

  public eventosPorCurso(mostrar: boolean) {
    this.generarCalendarioCondicion(this.eventos, 'Curso')
  }

  public eventosPorClub(mostrar: boolean) {
    this.generarCalendarioCondicion(this.eventos, 'Club')
  }

  public eventosPorEvento(mostrar: boolean) {
    this.generarCalendarioCondicion(this.eventos, 'Evento')
  }

  cambiarFiltro() {
    if(this.tipoFiltro !== 'Todos')
      this.generarCalendario(this.eventos.filter( n => n.tipo === this.tipoFiltro ));
    else 
      this.generarCalendario(this.eventos);
  }

  public openEventWindow(event) {
    console.log(event.event);
    this.router.navigate(['/eventos/info', event.event.id]);
  }


  irANuevoEvento() {
    this.router.navigateByUrl('/eventos/nuevo');
  }
}
