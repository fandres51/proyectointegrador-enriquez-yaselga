import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-dialog-carga-masiva',
  templateUrl: './dialog-carga-masiva.component.html',
  styleUrls: ['./dialog-carga-masiva.component.scss']
})
export class DialogCargaMasivaComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>
  ) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
