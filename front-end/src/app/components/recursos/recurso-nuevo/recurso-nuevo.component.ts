import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Recurso } from 'src/app/models/recurso'
import { RecursosService } from 'src/app/services/recursos.service'
@Component({
  selector: 'app-recurso-nuevo',
  templateUrl: './recurso-nuevo.component.html',
  styleUrls: ['./recurso-nuevo.component.scss']
})
export class RecursoNuevoComponent implements OnInit {

  public recurso: Recurso = {
    id : "",
    descripcion : "",
    espacio : false,
    estado :'Libre',
    nombre : "",
    tipo : "",
    ubicacion : "",
    valor : 0,
    condicion : 'Nuevo'
  };

  constructor(
    public recursosService:RecursosService,
    private router: Router
  ) { }

  ngOnInit(): void {}

    addRecurso(recurso){
      this.recursosService.crearRecurso(recurso);
      this.router.navigateByUrl('/recursos')
    }

}
