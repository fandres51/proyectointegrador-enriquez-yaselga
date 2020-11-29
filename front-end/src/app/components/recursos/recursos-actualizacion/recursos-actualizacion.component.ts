import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recurso } from 'src/app/models/recurso'
import { RecursosService } from 'src/app/services/recursos.service'

@Component({
  selector: 'app-recursos-actualizacion',
  templateUrl: './recursos-actualizacion.component.html',
  styleUrls: ['./recursos-actualizacion.component.scss']
})
export class RecursosActualizacionComponent implements OnInit {

  Estados: string[] = ['Libre','Ocupado','Alquilado','Reservado','Baja','Reparacion'];
  Condiciones: ['Nuevo','Usado','Averiado','Perdido'];

  public recurso: Recurso;

  constructor(
    public recursosService:RecursosService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    
    this.route.params.subscribe(params =>{
      const noUnicoParam = params['id'];
      this.recursosService.getRecurso(noUnicoParam).subscribe(recurso =>{
        this.recurso = recurso;
      },
      error => {
        console.error(error);
      })
    },
    error => {
      console.error(error);
    });
  }

  editRecurso(recurso: Recurso) {
    this.recursosService.update(recurso);
    this.router.navigateByUrl('/recursos');
  }

  eliminar() {
    const estaSeguro = confirm('¿Está seguro que desea eliminar este recurso?');
    if(estaSeguro){
      this.recursosService.delete(this.recurso.id);
      this.router.navigateByUrl('/recursos');
    }
      
  }


}
