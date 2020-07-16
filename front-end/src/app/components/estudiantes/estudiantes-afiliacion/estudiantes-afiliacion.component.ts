import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Estudiante } from 'src/app/models/estudiante';
import { EstudiantesService } from 'src/app/services/estudiantes.service';

@Component({
  selector: 'app-estudiantes-afiliacion',
  templateUrl: './estudiantes-afiliacion.component.html',
  styleUrls: ['./estudiantes-afiliacion.component.scss']
})
export class EstudiantesAfiliacionComponent implements OnInit {

  estudiante: Estudiante = window.history.state;

  constructor(
    private router: Router,
    private estudiantesService: EstudiantesService,
    private route: ActivatedRoute
  ) { }


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const noUnicoParam = params['id'];
      this.estudiantesService.getEstudiante(noUnicoParam).subscribe( estudiante => {
        this.estudiante = estudiante;
      })
    });
  }

  regresar() {
    this.router.navigateByUrl('/estudiantes');
  }

  afiliarEstudiante() {
    this.estudiantesService.afiliarEstudiante( this.estudiante )
    this.router.navigateByUrl('/estudiantes');
  }
}
