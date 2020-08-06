import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Estudiante } from 'src/app/models/estudiante';
import { EstudiantesService } from 'src/app/services/estudiantes.service';
import { EstudiantesDialogInfoComponent } from '../estudiantes-dialog-info/estudiantes-dialog-info.component';

@Component({
  selector: 'app-estudiantes-listar',
  templateUrl: './estudiantes-listar.component.html',
  styleUrls: ['./estudiantes-listar.component.scss']
})
export class EstudiantesListarComponent implements OnInit {

  public actualStart: number = 0;
  public estudiantes: Estudiante[] = [];

  @Input() set _estudiantes(estudiantes: Estudiante[]) {
    this.estudiantes = estudiantes;
    this.changePagination();
  }
  private pageIndex: number = 0;
  private pageSize: number = 9;

  constructor(
    public dialog: MatDialog,
    public estudiantesService: EstudiantesService
  ) { }

  ngOnInit(): void { }

  public openDialog(index:number):void {
    const dialogRef = this.dialog.open( EstudiantesDialogInfoComponent, {
      width: '500px',
      data: this.estudiantes[index]
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    })
  } 

  public estudiantesPaginados: Estudiante[];

  onPageChange($event) {
    this.pageIndex = $event.pageIndex;
    this.pageSize = $event.pageSize;
    this.changePagination();
  }
  
  changePagination() {
    this.estudiantesPaginados = this.estudiantes.slice(this.pageIndex*this.pageSize, this.pageIndex*this.pageSize + this.pageSize);
  }
}