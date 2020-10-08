import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Evento } from 'src/app/models/evento';
import { AsociacionService } from 'src/app/services/asociacion.service';
import { AutoridadesService } from 'src/app/services/autoridades.service';
import { EventosService } from 'src/app/services/eventos.service';

@Component({
  selector: 'app-eventos-editar',
  templateUrl: './eventos-editar.component.html',
  styleUrls: ['./eventos-editar.component.scss']
})
export class EventosEditarComponent implements OnInit {

  public autoridades: string[] = [];
  public editable = false;

  public evento: Evento = {
    id: '',
    title: '',
    allDay: false,
    color: 'blue',
    tipo: 'Evento',
    responsables: [],
    lugar: 'EPN'
  };

  public dias = {
    lunes: false,
    martes: false,
    miercoles: false,
    jueves: false,
    viernes: false,
    sabado: false,
    domingo: false
  };

  public responsables = {
    resp1: "",
    resp2: "",
    resp3: ""
  }

  constructor(
    public eventosService: EventosService,
    public autoridadesService: AutoridadesService,
    private router: Router,
    private route: ActivatedRoute,
    private asociacionService: AsociacionService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.eventosService.getEvento(id).subscribe(evento => {
        this.evento = evento;
        if (evento.responsables[0]) { this.responsables.resp1 = evento.responsables[0]; }
        if (evento.responsables[1]) { this.responsables.resp2 = evento.responsables[1]; }
        if (evento.responsables[2]) { this.responsables.resp3 = evento.responsables[2]; }
        if (evento.tipo !== 'Evento') {
          if (evento.daysOfWeek.find(n => n === 0)) { this.dias.domingo = true }
          if (evento.daysOfWeek.find(n => n === 1)) { this.dias.lunes = true }
          if (evento.daysOfWeek.find(n => n === 2)) { this.dias.martes = true }
          if (evento.daysOfWeek.find(n => n === 3)) { this.dias.miercoles = true }
          if (evento.daysOfWeek.find(n => n === 4)) { this.dias.jueves = true }
          if (evento.daysOfWeek.find(n => n === 5)) { this.dias.viernes = true }
          if (evento.daysOfWeek.find(n => n === 6)) { this.dias.sabado = true }
        }
      })
    });
    this.asociacionService.getAsociacion().subscribe(
      asociacion => {
        this.autoridadesService.getAutoridadesActuales(asociacion.AsociacionActual).subscribe(
          autoridades => {
            this.autoridades = autoridades.map(n => n.Nombre);
          }
        )
      }
    )
  }

  crearArregoDias(): number[] {
    const arregloDias: number[] = [];
    if (this.dias.domingo)
      arregloDias.push(0);
    if (this.dias.lunes)
      arregloDias.push(1);
    if (this.dias.martes)
      arregloDias.push(2);
    if (this.dias.miercoles)
      arregloDias.push(3);
    if (this.dias.jueves)
      arregloDias.push(4);
    if (this.dias.viernes)
      arregloDias.push(5);
    if (this.dias.sabado)
      arregloDias.push(6);
    return arregloDias;
  }

  crearArregoResp(): string[] {
    const arregloResp: string[] = [];
    if (this.responsables.resp1)
      arregloResp.push(this.responsables.resp1);
    if (this.responsables.resp2)
      arregloResp.push(this.responsables.resp2);
    if (this.responsables.resp3)
      arregloResp.push(this.responsables.resp3);
    return arregloResp.filter((n, i) => {
      if (arregloResp.indexOf(n) === i)
        return n
    })
  }

  editEvento() {
    let validado = true;
    this.evento.responsables = this.crearArregoResp();
    if (this.evento.tipo !== 'Evento') {
      this.evento.daysOfWeek = this.crearArregoDias();
      if (this.evento.daysOfWeek.length < 1) {
        alert('Debe ingresar al menos un día de la semana');
        validado = false;
      }
      if (this.evento.startTime > this.evento.endTime) {
        alert('Error: hora de inicio debe ser anterior a hora de finalización');
        validado = false;
      }
    }

    if (this.evento.tipo === 'Evento') {
      if (this.evento.start > this.evento.end) {
        alert('Error: hora de inicio debe ser anterior a hora de finalización');
        validado = false;
      }
    }

    if (validado) {
      this.eventosService.updateEvento(this.evento);
      alert('Evento editado');
      this.router.navigate(['/eventos']);
    }
  }

  cambiarEditable() {
    this.editable = !this.editable;
  }

  regresar() {
    this.router.navigateByUrl('/eventos');
  }

  delete() {
    let estaSeguro = confirm('¿Está seguro que desea eliminar este evento?');
    if(estaSeguro) {
      this.eventosService.deleteEvento(this.evento.id);
      this.router.navigate(['/eventos']);
    }
  }
}
