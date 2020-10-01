import { Component, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EventEmitter } from 'protractor';
import { Recurso } from 'src/app/models/recurso';
import { RecursosService } from 'src/app/services/recursos.service';

@Component({
  selector: 'app-recursos-dialog-info',
  templateUrl: './recursos-dialog-info.component.html',
  styleUrls: ['./recursos-dialog-info.component.scss']
})
export class RecursosDialogInfoComponent implements OnInit {

  @Output() public recursosAEditarEmitter = new EventEmitter();
  public recursoAEditar: Recurso;
  public recursoAFiltrar: Recurso;
  public dateString: String="";
  
  constructor(
    public dialogRef: MatDialogRef<RecursosDialogInfoComponent>,
    public recursosService: RecursosService,
    @Inject(MAT_DIALOG_DATA) public recurso: Recurso
  ) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  darDeBaja(){
    if(window.confirm('¿Está seguro que desea dar de baja este recurso?')) {
      this.recursosService.darDeBaja(this.recurso.id);
      this.dialogRef.close();
    }
  }

  alternarOcupadoLibre(){
    if(this.recurso.estado == "Libre"){
      this.recursosService.actualizarEstado(this.recurso.id, "Ocupado");
    }
    else{
      this.recursosService.actualizarEstado(this.recurso.id, "Libre");
    }
  }

  actualizarCondicion(nuevaCondicion: string){
    if(window.confirm('¿Está seguro que desea actualizar la condicion de este recurso?')) {
      this.recursosService.actualizarCondicion(this.recurso.id,nuevaCondicion);
      this.dialogRef.close();
    }
  }

}
