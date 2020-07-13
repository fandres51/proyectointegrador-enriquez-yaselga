import { Component, OnInit } from '@angular/core';
import { Estudiante } from 'src/app/models/estudiante';
import { Router } from '@angular/router';
import { TransaccionesService } from 'src/app/services/transacciones.service';
import { Transaccion } from 'src/app/models/transaccion';
import { EstudiantesService } from 'src/app/services/estudiantes.service';

@Component({
  selector: 'app-formulario-afiliacion',
  templateUrl: './formulario-afiliacion.component.html',
  styleUrls: ['./formulario-afiliacion.component.scss']
})
export class FormularioAfiliacionComponent implements OnInit {
  
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
