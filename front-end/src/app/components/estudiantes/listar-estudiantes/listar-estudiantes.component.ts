import { Component, OnInit, Input } from '@angular/core';
import { Estudiante } from 'src/app/models/estudiante';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-estudiantes',
  templateUrl: './listar-estudiantes.component.html',
  styleUrls: ['./listar-estudiantes.component.scss']
})
export class ListarEstudiantesComponent implements OnInit {

  @Input() public estudiantes: Estudiante[] = [];

  constructor(
    public dialog: MatDialog,
    private router: Router,
  ) { }

  ngOnInit(): void {
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

  afiliarEstudiante(id: string) {
    const estudianteAAfiliar = Object.assign({}, this.estudiantes.find(n => n.id === id));
    this.router.navigateByUrl('/main/afiliar', { state: estudianteAAfiliar });
  }
}