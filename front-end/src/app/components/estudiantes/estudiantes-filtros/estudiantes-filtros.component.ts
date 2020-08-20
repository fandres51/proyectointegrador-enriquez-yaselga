import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Estudiante } from 'src/app/models/estudiante';
import { EstudiantesService } from 'src/app/services/estudiantes.service';

@Component({
  selector: 'app-estudiantes-filtros',
  templateUrl: './estudiantes-filtros.component.html',
  styleUrls: ['./estudiantes-filtros.component.scss']
})
export class EstudiantesFiltrosComponent implements OnInit {

  private estudiantes: Estudiante[];
  @Output() private mostrarEstudiantes = new EventEmitter();

  public filtroCarrera: 'Sistemas' | 'Computacion' | 'Software' | '' = '';
  public filtroSemestre: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'Egresado' | 'Retirado' | 'Graduado' | '' = '';
  public filtroAfiliacion: 'Aportante' | 'No aportante' | 'No afiliado' | '' = '';
  public tipoOrdenamiento: 'Carrera' | 'Semestre' | 'Apellido' | '' = '';

  constructor(
    private estudiantesService: EstudiantesService
  ) { }

  ngOnInit() {
    this.estudiantesService.getEstudiantes().subscribe(estudiantes => {
      this.estudiantes = estudiantes;
      this.enviarEstudiantes(this.estudiantes);
    })
  }

  /***Filtros*******************************************/

  public buscarPorNombre(input: string) {
    const estudiantesAMostrar = this.estudiantes.filter(estudiante => {
      return estudiante.Nombre.search(input) != -1 || estudiante.Apellido.search(input) != -1;
    })
    this.enviarEstudiantes(estudiantesAMostrar);
  }

  public buscarPorCedula(input: string) {
    const estudiantesAMostrar = this.estudiantes.filter(estudiante => {
      return estudiante.Cedula.search(input) != -1;
    })
    this.enviarEstudiantes(estudiantesAMostrar);
  }

  /***Filtros*******************************************/
  
  public filtrarPorCarrera(carrera) {
    this.filtroCarrera = carrera;
    this.filtrar();
  }
  
  public filtrarPorSemestre(semestre) {
    this.filtroSemestre = semestre;
    this.filtrar();
  }
  
  public filtrarPorAporte(afiliacion) {
    this.filtroAfiliacion = afiliacion;
    this.filtrar();
  }

  private filtrar() {
    const estudiantesAMostrar = this.estudiantes.filter( estudiante => {
      return (estudiante.Carrera.search(this.filtroCarrera) + 1) && 
             (estudiante.EstadoAfiliacion.search(this.filtroAfiliacion) + 1) && 
             (estudiante.SemestreReferencial.search(this.filtroSemestre) + 1);
    })
    this.enviarEstudiantes(estudiantesAMostrar);
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

  ordenar(tipo) {
    this.tipoOrdenamiento = tipo
    switch(this.tipoOrdenamiento) {
      case 'Carrera':
        this.estudiantes.sort(this.compararPorCarrera);
        break;
      case 'Semestre':
        this.estudiantes.sort(this.compararPorSemestre);
        break;
      case 'Apellido':
        this.estudiantes.sort(this.compararPorApellido);
        break;
      default:
        break;    
    }
    this.filtrar()
  }

  /***Enviar****************************************** */

  private enviarEstudiantes(estudiantesAMostrar: Estudiante[]) {
    this.mostrarEstudiantes.emit(estudiantesAMostrar);
  }

}
