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
    // this.eventosService.getEventos().subscribe(
    //   eventos => {
    //     this.autoridadMostrada = autoridadMostrada;
    //     this.calendarOptions.events = eventos.map( (n: Evento) => {
    //       if(autoridadMostrada.Nombre === n.responsables[0]) {
    //         return {
    //           allDay: n.allDay,
    //           start: n.start,
    //           end: n.end,
    //           title: n.title,
    //           backgroundColor: n.backgroundColor
    //         }
    //       }
    //     })
    //   }
    // );
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

  regresar() {
    this.enviarNull.emit(null);
  }

}
