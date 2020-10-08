import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Autoridad } from 'src/app/models/autoridad';
import { AsociacionService } from 'src/app/services/asociacion.service';
import { AutoridadesService } from 'src/app/services/autoridades.service';

@Component({
  selector: 'app-autoridades-listar',
  templateUrl: './autoridades-listar.component.html',
  styleUrls: ['./autoridades-listar.component.scss']
})
export class AutoridadesListarComponent implements OnInit {

  @Output() public devolverAutoridadSeleccionada = new EventEmitter();
  public autoridades: Autoridad[] = [];
  
  constructor(
    public autoridadService: AutoridadesService,
    public asociacionService: AsociacionService
  ) { }

  ngOnInit() {
    this.asociacionService.getAsociacion().subscribe(
      asociacion => {
        this.autoridadService.getAutoridadesActuales(asociacion.AsociacionActual).subscribe(
          autoridades => {
            this.autoridades = autoridades;
          },
          error => {
            console.error(error);
          }
        )
      },
      error => {
        console.error(error);
      }
    )
  }

  devolverAutoridad(autoridad: Autoridad) {
    this.devolverAutoridadSeleccionada.emit(autoridad);
  }

}
