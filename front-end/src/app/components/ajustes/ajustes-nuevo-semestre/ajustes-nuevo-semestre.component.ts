import { Component, OnInit } from '@angular/core';
import { AsociacionService } from 'src/app/services/asociacion.service';
import { EstudiantesService } from 'src/app/services/estudiantes.service';

@Component({
  selector: 'app-ajustes-nuevo-semestre',
  templateUrl: './ajustes-nuevo-semestre.component.html',
  styleUrls: ['./ajustes-nuevo-semestre.component.scss']
})
export class AjustesNuevoSemestreComponent implements OnInit {

  periodoActual: string;

  constructor(
    private readonly estudianteService: EstudiantesService,
    private readonly asociacionService: AsociacionService
  ) { }

  ngOnInit(): void {
  }

  reiniciarAportes() {
    const estaSeguro = confirm(`¿Está seguro de querer iniciar un nuevo semestre con el nombre ${this.periodoActual}? Esta acción reiniciará los aportes de todos los estudiantes aportantes`);
    if(estaSeguro) {
      this.asociacionService.updateAsociacion({PeriodoActual: this.periodoActual})
      this.estudianteService.crearAportesNuevoSemestre();
      alert('Acción realizada');
    }
  }

}
