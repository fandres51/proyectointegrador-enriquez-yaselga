import { Component, OnInit } from '@angular/core';
import { EstudiantesService } from '../../services/estudiantes.service'
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { Estudiante } from 'src/app/models/estudiante';

@Component({
  selector: 'app-estudiantes',
  templateUrl: './estudiantes.component.html',
  styleUrls: ['./estudiantes.component.scss']
})
export class EstudiantesComponent implements OnInit {

  estudiantes: Estudiante[] = [];
  estudiantesMostrados: Estudiante[] = [];
  
  porNombreInput:string = "";
  porCedulaInput:string = "";

  filtroAfiliado:string = "";
  filtroSemestre:string = "";
  filtroGenero:string = "";
  filtroCarrera:string = "";

  constructor(
    public EstudiantesService:EstudiantesService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.EstudiantesService.getEstudiante().subscribe( estudiante => {
      this.estudiantes = estudiante;
      this.estudiantesMostrados = estudiante;
    })
  }

  openDialog(index:number):void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '500px',
      data: this.estudiantes[index]
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    })
  } 

  buscarPorNombre() {
    this.estudiantesMostrados = this.estudiantes.filter( n => {
      return n.Nombre.search(this.porNombreInput) != -1 || n.Apellido.search(this.porNombreInput) != -1;
    })
  }

  buscarPorCedula() {
    this.estudiantesMostrados = this.estudiantes.filter( n => {
      return n.id.search(this.porCedulaInput) != -1;
    })
  }

  filtroGeneroFun(valor: string) {
    this.filtroGenero = valor;
    this.filtrar();
  }

  filtroCarreraFun(valor:string) {
    this.filtroCarrera = valor;
    this.filtrar();
  }

  filtroSmestreFun(valor:string) {
    this.filtroSemestre = valor;
    this.filtrar();
  }

  filtroAfiliadoFun(valor:string) {
    this.filtroAfiliado = valor;
    this.filtrar();
  }

  filtrar() {
    this.estudiantesMostrados = this.estudiantes.filter ( n => {
      if(this.filtroAfiliado == "true") {
        return n.EstadoAfiliacion && (n.Genero.search(this.filtroGenero) + 1) && (n.SemestreReferencial.search(this.filtroSemestre) + 1) && (n.Carrera.search(this.filtroCarrera) + 1);
      } else {
        return (n.Genero.search(this.filtroGenero) + 1) && (n.SemestreReferencial.search(this.filtroSemestre) + 1) && (n.Carrera.search(this.filtroCarrera) + 1);
      }
    })
  }
  

}
