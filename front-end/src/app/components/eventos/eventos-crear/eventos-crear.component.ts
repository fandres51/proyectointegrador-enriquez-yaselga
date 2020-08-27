import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Evento } from 'src/app/models/evento';
import { AsociacionService } from 'src/app/services/asociacion.service';
import { AutoridadesService } from 'src/app/services/autoridades.service';
import { EventosService } from 'src/app/services/eventos.service';

@Component({
  selector: 'app-eventos-crear',
  templateUrl: './eventos-crear.component.html',
  styleUrls: ['./eventos-crear.component.scss']
})
export class EventosCrearComponent implements OnInit {

  public autoridades: string[] = [];

  public nuevoEvento: Evento = {
    id: '',
    title: '',
    allDay: false,
    color: 'blue',
    tipo: 'Evento',
    responsables: [],
    lugar: ''
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

  constructor (
    private autoridadesService: AutoridadesService,
    private eventoService: EventosService,
    private router: Router
  ) { }

  ngOnInit() {
    this.autoridadesService.getAutoridadesActuales().then(
      autoridades => {
        autoridades.subscribe(
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
    return arregloResp.filter( (n, i) => {
      if(arregloResp.indexOf(n) === i)
        return n
    })
  }

  crearEvento() {
    this.nuevoEvento.responsables = this.crearArregoResp();
    if(this.nuevoEvento.tipo !== 'Evento')
      this.nuevoEvento.daysOfWeek = this.crearArregoDias();
    this.eventoService.addEvento(this.nuevoEvento);
  }

  regresar() {
    this.router.navigateByUrl('/eventos');
  }
}
