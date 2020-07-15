import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Estudiante } from 'src/app/models/estudiante';

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

  constructor(
    public dialogRef: MatDialogRef<EstudiantesDialogInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public estudiante: Estudiante
  ) {}

  ngOnInit() { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
