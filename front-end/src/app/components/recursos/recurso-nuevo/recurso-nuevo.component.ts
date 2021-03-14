import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Recurso } from 'src/app/models/recurso'
import { RecursosService } from 'src/app/services/recursos.service'
import { Filial } from 'src/app/models/filial';
import { FilialService } from 'src/app/services/filial.service';
@Component({
  selector: 'app-recurso-nuevo',
  templateUrl: './recurso-nuevo.component.html',
  styleUrls: ['./recurso-nuevo.component.scss']
})
export class RecursoNuevoComponent implements OnInit {

  Estados: string[] = ['Libre','Ocupado','Alquilado','Reservado','Baja','Reparacion'];
  Condiciones: ['Nuevo','Usado','Averiado','Perdido'];
  filiales: Filial[];

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
    private router: Router,
    private filialService: FilialService,
  ) { }

  ngOnInit(): void {
    this.filialService.getFiliales().subscribe(
      filiales => {
        
        this.filiales = filiales;
        ////console.log(">>>>Filiales: ",filiales);
        
      },
      error => {
        console.error(error);
      }
    )
  }

    addRecurso(recurso){
      this.recursosService.crearRecurso(recurso);
      this.router.navigateByUrl('/recursos')
    }

    

}
