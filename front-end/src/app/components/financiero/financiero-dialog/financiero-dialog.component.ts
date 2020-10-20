import { Component, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Transaccion } from 'src/app/models/transaccion';
import { AuthService } from 'src/app/services/auth.service';
import { TransaccionesService } from 'src/app/services/transacciones.service';

@Component({
  selector: 'app-financiero-dialog',
  templateUrl: './financiero-dialog.component.html',
  styleUrls: ['./financiero-dialog.component.scss']
})
export class FinancieroDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<FinancieroDialogComponent>,
    public transaccionService: TransaccionesService,
    public authService: AuthService,
    @Inject(MAT_DIALOG_DATA) public transaccion: Transaccion
  ) { }

  ngOnInit() { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  darDeBaja() {
    this.authService.auth.user.subscribe(
      user => {
        this.authService.getPermiso(user.email, 'Financiero_delete').subscribe(
          permiso => {
            if (permiso.length > 0) {
              if(window.confirm('¿Está seguro que desea dar de baja transaccion?')) {
                this.transaccionService.darDeBajaTransaccion(this.transaccion.id);
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

  reactivar() {
    this.authService.auth.user.subscribe(
      user => {
        this.authService.getPermiso(user.email, 'Financiero_delete').subscribe(
          permiso => {
            if (permiso.length > 0) {
              if(window.confirm('¿Está seguro que desea reactivar esta transaccion?')) {
                this.transaccionService.reactivarTransaccion(this.transaccion.id);
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
