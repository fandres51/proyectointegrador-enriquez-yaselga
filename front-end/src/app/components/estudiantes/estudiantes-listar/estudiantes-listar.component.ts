import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Estudiante } from 'src/app/models/estudiante';
import { EstudiantesDialogInfoComponent } from '../estudiantes-dialog-info/estudiantes-dialog-info.component';

@Component({
  selector: 'app-estudiantes-listar',
  templateUrl: './estudiantes-listar.component.html',
  styleUrls: ['./estudiantes-listar.component.scss']
})
export class EstudiantesListarComponent implements OnInit {

  @Input() public estudiantes: Estudiante[] = [];

  constructor(
    public dialog: MatDialog,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  public openDialog(index:number):void {
    const dialogRef = this.dialog.open( EstudiantesDialogInfoComponent, {
      width: '500px',
      data: this.estudiantes[index]
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    })
  } 
}
