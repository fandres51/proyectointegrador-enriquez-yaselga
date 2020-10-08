import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import { Autoridad } from 'src/app/models/autoridad';
import { Evento } from 'src/app/models/evento';
import { EventosService } from 'src/app/services/eventos.service';

@Component({
  selector: 'app-autoridades-detalle',
  templateUrl: './autoridades-detalle.component.html',
  styleUrls: ['./autoridades-detalle.component.scss']
})
export class AutoridadesDetalleComponent implements OnInit {

  public autoridadMostrada: Autoridad;
  @Input() set _autoridadMostrada(autoridadMostrada: Autoridad) {
    this.autoridadMostrada = autoridadMostrada;
    this.eventosService.getEventos().subscribe(
      eventos => {
        this.generarCalendario(eventos.filter(n => {
          return n.responsables.find( n => n === this.autoridadMostrada.Nombre )
        }))
      },
      error => {
        console.error(error);
      }
    )
  }
  @Output() public enviarNull = new EventEmitter();

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    events: [],
  };

  constructor(
    private eventosService: EventosService
  ) { }

  ngOnInit() {}

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

  regresar() {
    this.enviarNull.emit(null);
  }

}
