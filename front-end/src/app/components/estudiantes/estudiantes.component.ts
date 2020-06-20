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

  public estudiantes: Estudiante[] = [];
  public estudiantesMostrados: Estudiante[] = [];

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

  public openDialog(index:number):void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '500px',
      data: this.estudiantes[index]
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    })
  } 

  

}
