import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Estudiante } from 'src/app/models/estudiante';

@Component({
  selector: 'app-filtros-estudiantes',
  templateUrl: './filtros-estudiantes.component.html',
  styleUrls: ['./filtros-estudiantes.component.scss']
})
export class FiltrosEstudiantesComponent implements OnInit {

  @Input() public estudiantes: Estudiante[] = [];
  @Output() public eventEmitter = new EventEmitter();
  public estudiantesMostrados: Estudiante[] = [];

  public porNombreInput: string = "";
  public porCedulaInput: string = "";

  public filtroAfiliado: string = "";
  public filtroSemestre: string = "";
  public filtroGenero: string = "";
  public filtroCarrera: string = "";

  public tipoOrdenamiento: string = "";

  constructor() {
  }

  ngOnInit(): void {
  }

  /***Búsqueda****************************************** */

  public buscarPorNombre() {
    this.estudiantesMostrados = this.estudiantes.filter(n => {
      return n.Nombre.search(this.porNombreInput) != -1 || n.Apellido.search(this.porNombreInput) != -1;
    })
    this.enviarEstudiantes();
  }

  public buscarPorCedula() {
    this.estudiantesMostrados = this.estudiantes.filter(n => {
      return n.id.search(this.porCedulaInput) != -1;
    })
    this.enviarEstudiantes();
  }

  /***Filtros****************************************** */

  public filtroGeneroFun(valor: string) {
    this.filtroGenero = valor;
    this.filtrar();
  }

  public filtroCarreraFun(valor: string) {
    this.filtroCarrera = valor;
    console.log(this.filtroCarrera);
    this.filtrar();
  }

  public filtroSmestreFun(valor: string) {
    this.filtroSemestre = valor;
    this.filtrar();
  }

  public filtroAfiliadoFun(valor: string) {
    this.filtroAfiliado = valor;
    this.filtrar();
  }

  public filtrar() {
    this.estudiantesMostrados = this.estudiantes.filter(n => {
      if (this.filtroAfiliado == '') {
        return (n.Genero.search(this.filtroGenero) + 1) && (n.SemestreReferencial.search(this.filtroSemestre) + 1) && (n.Carrera.search(this.filtroCarrera) + 1);
      } else {
        return ((this.filtroAfiliado == 'true') == n.EstadoAfiliacion) && (n.Genero.search(this.filtroGenero) + 1) && (n.SemestreReferencial.search(this.filtroSemestre) + 1) && (n.Carrera.search(this.filtroCarrera) + 1);
      }
    })
    this.enviarEstudiantes();
  }

  /***Ordenamiento*******************************************/

  compararPorApellido(a, b) {
    if (a.Apellido < b.Apellido) {
      return -1;
    }
    if (a.Apellido > b.Apellido) {
      return 1;
    }
    return 0;
  }

  compararPorSemestre(a, b) {
    if (a.SemestreReferencial < b.SemestreReferencial) {
      return -1;
    }
    if (a.SemestreReferencial > b.SemestreReferencial) {
      return 1;
    }
    return 0;
  }

  compararPorCarrera(a, b) {
    if (a.Carrera < b.Carrera) {
      return -1;
    }
    if (a.Carrera > b.Carrera) {
      return 1;
    }
    return 0;
  }

  ordenar(tipo: string) {
    this.tipoOrdenamiento = tipo;
    if (this.estudiantesMostrados != []) {
      if (tipo == 'apellido') {
        this.estudiantes.sort(this.compararPorApellido);
      } else if (tipo == 'carrera') {
        this.estudiantes.sort(this.compararPorCarrera);
      } else {
        this.estudiantes.sort(this.compararPorSemestre);
      }
    } else {
      if (tipo == 'apellido') {
        this.estudiantesMostrados.sort(this.compararPorApellido);
      } else if (tipo == 'carrera') {
        this.estudiantesMostrados.sort(this.compararPorCarrera);
      } else {
        this.estudiantesMostrados.sort(this.compararPorSemestre);
      }
    }
    this.enviarEstudiantes;
  }

  /***Enviar****************************************** */

  public enviarEstudiantes() {
    this.eventEmitter.emit(this.estudiantesMostrados);
  }
}
