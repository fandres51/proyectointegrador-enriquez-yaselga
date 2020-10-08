import { Component, OnInit } from '@angular/core';
import { Autoridad } from 'src/app/models/autoridad';
import { AutoridadesService } from 'src/app/services/autoridades.service';

@Component({
  selector: 'app-ajustes-consultar-asociacion',
  templateUrl: './ajustes-consultar-asociacion.component.html',
  styleUrls: ['./ajustes-consultar-asociacion.component.scss']
})
export class AjustesConsultarAsociacionComponent implements OnInit {

  infoCargada = false;
  autoridades: Autoridad[] = [];
  anio: string;

  constructor(
    private readonly autoridadesService: AutoridadesService
  ) { }

  ngOnInit(): void { }

  cargarAutoridades() {
    this.autoridadesService.getAutoridades(this.anio).subscribe(
      autoridades => {
        this.autoridades = autoridades;
        this.infoCargada = true;
      },
      error => {
        console.error(error);
      }
    )
  }



}
