import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Autoridad } from 'src/app/models/autoridad';
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
    public autoridadService: AutoridadesService
  ) { }

  ngOnInit() {
    this.autoridadService.getConsejoActual().subscribe(
      consejo =>{
        this.autoridadService.getAutoridades(consejo[0].nombre).subscribe(
          autoridades => {
            this.autoridades = autoridades;
          }
        )
      }
    )
  }

  devolverAutoridad(autoridad: Autoridad) {
    this.devolverAutoridadSeleccionada.emit(autoridad);
  }

}
