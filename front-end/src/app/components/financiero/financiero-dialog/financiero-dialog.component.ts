import { Component, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Transaccion } from 'src/app/models/transaccion';
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
    @Inject(MAT_DIALOG_DATA) public transaccion: Transaccion
  ) { }

  ngOnInit() { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  darDeBaja() {
    if(window.confirm('¿Está seguro que desea dar de baja transaccion?')) {
      this.transaccionService.darDeBajaTransaccion(this.transaccion.id);
      this.dialogRef.close();
    }
  }

  reactivar() {
    if(window.confirm('¿Está seguro que desea reactivar esta transaccion?')) {
      this.transaccionService.reactivarTransaccion(this.transaccion.id);
      this.dialogRef.close();
    }
  }
  
  cerrarDialog() {
    this.dialogRef.close();
  }

}
