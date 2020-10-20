import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Aporte } from 'src/app/models/aporte';
import { Estudiante } from 'src/app/models/estudiante';
import { AuthService } from 'src/app/services/auth.service';
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
  public dateString: String = "";
  public aportes: Aporte[];
  public deuda: number = 0;

  constructor(
    public dialogRef: MatDialogRef<EstudiantesDialogInfoComponent>,
    public estudiantesService: EstudiantesService,
    public authService: AuthService,
    @Inject(MAT_DIALOG_DATA) public estudiante: Estudiante
  ) { }

  ngOnInit() {
    this.estudiantesService.getAportes(this.estudiante.NoUnico).subscribe(
      aportes => {
        this.aportes = aportes;
        this.deuda = this.aportes.reduce((pv, cv) => pv + cv.deuda, 0)
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
    this.authService.auth.user.subscribe(
      user => {
        this.authService.getPermiso(user.email, 'Estudiantes_delete').subscribe(
          permiso => {
            if (permiso.length > 0) {
              if (window.confirm('¿Está seguro que desea dar de baja el estudiante?')) {
                this.estudiantesService.darDeBajaEstudiante(this.estudiante.NoUnico);
                this.dialogRef.close();
              }
            }
            else
              alert('Usted no tiene permiso para realizar esa acción');
          }
        )
      }
    )
  }

  graduar() {
    this.authService.auth.user.subscribe(
      user => {
        this.authService.getPermiso(user.email, 'Estudiantes_delete').subscribe(
          permiso => {
            if (permiso.length > 0) {
              if (window.confirm('¿Está seguro que desea establecer estudainte como graduado?')) {
                this.estudiantesService.graduarEstudiante(this.estudiante.NoUnico);
                this.dialogRef.close();
              }
            }
            else
              alert('Usted no tiene permiso para realizar esa acción');
          }
        )
      }
    )
  }

  desafiliar() {
    this.authService.auth.user.subscribe(
      user => {
        this.authService.getPermiso(user.email, 'Estudiantes_edit').subscribe(
          permiso => {
            if (permiso.length > 0) {
              if (window.confirm('¿Está seguro que desea desafiliar estudainte?')) {
                this.estudiantesService.desafiliarEstudiante(this.estudiante.NoUnico);
                this.dialogRef.close();
              }
            }
            else
              alert('Usted no tiene permiso para realizar esa acción');
          }
        )
      }
    )
  }

  cerrarDialog() {
    this.dialogRef.close();
  }

}
