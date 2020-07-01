import { Component, OnInit } from '@angular/core';
import { EstudiantesService } from '../../services/estudiantes.service';
import { Estudiante } from 'src/app/models/estudiante';
import { MatDialog } from '@angular/material/dialog';
import { DialogCargaMasivaComponent } from './dialog-carga-masiva/dialog-carga-masiva.component';

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

  public openDialog():void {
    const dialogRef = this.dialog.open(DialogCargaMasivaComponent, {
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    })
  }
}
