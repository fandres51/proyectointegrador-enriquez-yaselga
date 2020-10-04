import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Autoridad } from 'src/app/models/autoridad';
import { EleccionService } from 'src/app/services/eleccion.service';
import { EstudiantesService } from 'src/app/services/estudiantes.service';

@Component({
  selector: 'app-autoridad-form',
  templateUrl: './autoridad-form.component.html',
  styleUrls: ['./autoridad-form.component.scss']
})
export class AutoridadFormComponent implements OnInit {

  autoridad: Autoridad;
  eleccion: string;
  lista: string;
  rutaDeRegreso: string = '/elecciones';

  constructor(
    public estudianteService: EstudiantesService,
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
        this.rutaDeRegreso = '/elecciones/' + this.eleccion + '/' + this.lista;

      }
    )
  }

  crear() {
    //1) verificar si existe
    let noUnico = this.autoridad.NoUnico;
    this.estudianteService.existeEstudiante(noUnico).then(
      existe => {
        if (existe) {
          //2) agregar autoridad a lista
          console.log(this.eleccion);
          console.log(this.lista);
          this.eleccionService.createDignidad(this.autoridad, this.lista, this.eleccion);
          //3) regresar
          this.router.navigate(['/elecciones', this.eleccion, this.lista]);

        } else {
          alert('No existe estudiante con numero unico indicado');
        }
      }
    );
  }

}
