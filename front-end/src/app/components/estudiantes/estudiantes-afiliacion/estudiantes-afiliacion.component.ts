import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Estudiante } from 'src/app/models/estudiante';
import { EstudiantesService } from 'src/app/services/estudiantes.service';

@Component({
  selector: 'app-estudiantes-afiliacion',
  templateUrl: './estudiantes-afiliacion.component.html',
  styleUrls: ['./estudiantes-afiliacion.component.scss']
})
export class EstudiantesAfiliacionComponent implements OnInit {

  estudiante: Estudiante = window.history.state;

  // transaccionACrear: Transaccion = {
  //   // id:,
  //   Fecha:new Date,
  //   // Monto:30,
  //   Tipo:'afiliacion',
  //   TipoMonetario:'ingreso',
  //   PersonaID:this.estudiante.id,
  // };

  constructor(
    private router: Router,
    private estudianteService: EstudiantesService
  ) { }


  ngOnInit(): void {
  }

  regresar() {
    this.router.navigateByUrl('/main/estudiantes');
  }

  afiliarEstudiante() {
    this.estudianteService.addAfiliation(this.estudiante, 20, new Date());
    this.router.navigateByUrl('/main/estudiantes');
  }
}
