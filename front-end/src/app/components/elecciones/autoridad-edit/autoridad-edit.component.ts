import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Autoridad } from 'src/app/models/autoridad';
import { EleccionService } from 'src/app/services/eleccion.service';

@Component({
  selector: 'app-autoridad-edit',
  templateUrl: './autoridad-edit.component.html',
  styleUrls: ['./autoridad-edit.component.scss']
})
export class AutoridadEditComponent implements OnInit {

  autoridad: Autoridad;
  eleccion: string;
  lista: string;
  rutaDeRegreso: string = '/elecciones';
  dignidadParam: string;

  constructor(
    public eleccionService: EleccionService,
    public route: ActivatedRoute,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.autoridad = {
      Cargo: '',
      CorreoInstitucional: '',
      NoUnico: '',
      Nombre: '',
      Cedula: '',
      CorreoPersonal: '',
      Telefono: ''
    }
    this.route.paramMap.subscribe(
      params => {
        this.eleccion = params.get('eleccion');
        this.lista = params.get('lista');
        this.dignidadParam = params.get('dignidad');
        this.rutaDeRegreso = '/elecciones/' + this.eleccion + '/' + this.lista;
        this.eleccionService.getDignidad(this.dignidadParam, this.lista, this.eleccion).subscribe(
          dignidad => {
            this.autoridad = dignidad;
          }
        )
      }
    )
  }

  editar() {
    const estaSeguro = confirm('¿Está seguro que desea editar los datos de esta dignidad?');
    if(estaSeguro)
      this.eleccionService.updateDignidad(this.autoridad, this.lista, this.eleccion);
  }

  eliminar() {
    const estaSeguro = confirm('¿Está seguro que desea elliminar esta dignidad?');
    if(estaSeguro)
      this.eleccionService.deleteDignidad(this.autoridad, this.lista, this.eleccion);
  }

}
