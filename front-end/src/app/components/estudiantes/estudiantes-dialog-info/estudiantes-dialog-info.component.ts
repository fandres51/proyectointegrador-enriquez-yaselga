import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Aporte } from 'src/app/models/aporte';
import { Estudiante } from 'src/app/models/estudiante';
import { EstudiantesService } from 'src/app/services/estudiantes.service';

@Component({
  selector: 'app-estudiantes-dialog-info',
  templateUrl: './estudiantes-dialog-info.component.html',
  styleUrls: ['./estudiantes-dialog-info.component.scss']
})
export class EstudiantesDialogInfoComponent implements OnInit {

  @Output() public estudianteAEditarEmitter = new EventEmitter();
  public estudianteAEditar: Estudiante;
  public estudianteAAfiliar: Estudiante;
  public dateString:String = "";
  public aportes: Aporte[];
  public deuda: number = 0;

  constructor(
    public dialogRef: MatDialogRef<EstudiantesDialogInfoComponent>,
    public estudiantesService: EstudiantesService,
    @Inject(MAT_DIALOG_DATA) public estudiante: Estudiante
  ) { }

  ngOnInit() {
    this.estudiantesService.getAportes(this.estudiante.NoUnico).subscribe(
      aportes => {
        this.aportes = aportes;
        this.deuda = this.aportes.reduce((pv, cv) => pv + cv.deuda ,0)
      },
      error => {
        console.error(error);
      }
    )
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  darDeBaja() {
    if(window.confirm('¿Está seguro que desea dar de baja el estudiante?')) {
      this.estudiantesService.darDeBajaEstudiante(this.estudiante.NoUnico);
      this.dialogRef.close();
    }
  }

  graduar() {
    if(window.confirm('¿Está seguro que desea establecer estudainte como graduado?')) {
      this.estudiantesService.graduarEstudiante(this.estudiante.NoUnico);
      this.dialogRef.close();
    }
  }
  
  desafiliar() {
    if(window.confirm('¿Está seguro que desea desafiliar estudainte?')) {
      this.estudiantesService.desafiliarEstudiante(this.estudiante.NoUnico);
      this.dialogRef.close();
    }
  }
  
  cerrarDialog() {
    this.dialogRef.close();
  }
  
}
