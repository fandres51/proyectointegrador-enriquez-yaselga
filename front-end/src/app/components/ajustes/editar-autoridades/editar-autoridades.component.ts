import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Autoridad } from 'src/app/models/autoridad';
import { AsociacionService } from 'src/app/services/asociacion.service';
import { AutoridadesService } from 'src/app/services/autoridades.service';

@Component({
  selector: 'app-editar-autoridades',
  templateUrl: './editar-autoridades.component.html',
  styleUrls: ['./editar-autoridades.component.scss']
})
export class EditarAutoridadesComponent implements OnInit {

  autoridades: Autoridad[] = [];
  autoridadesNombres: string[] = [];

  constructor(
    private readonly autoridadService: AutoridadesService,
    private readonly asociacionService: AsociacionService,
    private readonly router: Router,
  ) { }

  ngOnInit(): void {
    this.asociacionService.getAsociacion().subscribe(
      asociacion => {
        this.autoridadService.getAutoridadesActuales(asociacion.AsociacionActual).subscribe(
          autoridades => {
            console.log(autoridades);
            this.autoridades = autoridades;
            this.autoridadesNombres = autoridades.map(n=>n.Cargo);
          }
        )
      }
    )
  }

  irAEditarAutoridad(cargo) {
    this.router.navigate(['/ajustes', cargo]);
  }
}
