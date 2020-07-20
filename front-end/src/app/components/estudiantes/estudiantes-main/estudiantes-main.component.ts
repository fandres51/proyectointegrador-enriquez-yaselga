import { Component, Input, OnInit } from '@angular/core';
import { Estudiante } from 'src/app/models/estudiante';
import { EstudiantesService } from 'src/app/services/estudiantes.service';

@Component({
  selector: 'app-estudiantes-main',
  templateUrl: './estudiantes-main.component.html',
  styleUrls: ['./estudiantes-main.component.scss']
})
export class EstudiantesMainComponent implements OnInit {

  public estudiantes: Estudiante[] = [];

  constructor(
    public EstudiantesService: EstudiantesService
  ) { }

  ngOnInit() { }

  cargaMasiva(event: FileList) {
    const file = event.item(0);
    if (file.type.split('/')[1] !== 'csv') {
      console.error('Unsupported file type!!');
    }
    this.EstudiantesService.cargaMasivaEstudiantes(file);
  }


  //TODO implementar funciones y probar ( afiliaciones e historial de afiliaciones )
}
