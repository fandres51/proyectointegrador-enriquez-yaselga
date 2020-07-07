import { Component } from '@angular/core';
import { DialogComponent } from '../../estudiantes/dialog/dialog.component';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-carga-masiva-financiero',
  templateUrl: './dialog-carga-masiva-financiero.component.html',
  styleUrls: ['./dialog-carga-masiva-financiero.component.scss']
})
export class DialogCargaMasivaFinancieroComponent {

  cerrado: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>
  ) { }

  ngOnInit(): void { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  cerrar(parametro:string) {
    if(parametro === 'cerrar') {
      this.dialogRef.close();
    }
  }
}
