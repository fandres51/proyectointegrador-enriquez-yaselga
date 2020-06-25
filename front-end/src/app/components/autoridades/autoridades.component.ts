import { Component, OnInit } from '@angular/core';
import { Estudiante } from 'src/app/models/estudiante';
import { EstudiantesService } from 'src/app/services/estudiantes.service';

@Component({
  selector: 'app-autoridades',
  templateUrl: './autoridades.component.html',
  styleUrls: ['./autoridades.component.scss']
})
export class AutoridadesComponent implements OnInit {

  public autoridades:Estudiante[];
  public autoridadMostrada: Estudiante = null;

  constructor(
    public EstudiantesService: EstudiantesService
  ) { }

  ngOnInit(): void {
    this.EstudiantesService.getEstudiante().subscribe( estudiante => {
      this.autoridades = Object.assign([],estudiante);
      this.autoridades = this.autoridades.filter( n => {
        return n.EsAutoridad == true;
      })
    })
  }

}
