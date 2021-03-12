import { Input } from '@angular/core';
import { Component, Inject, OnInit, Output ,EventEmitter} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Filial } from 'src/app/models/filial';
import { FilialService } from 'src/app/services/filial.service';
import { Recurso } from 'src/app/models/recurso';
import { MatDialog } from '@angular/material/dialog';
import { RecursosService } from 'src/app/services/recursos.service';

@Component({
  selector: 'app-recursos-dialog-info',
  templateUrl: './recursos-dialog-info.component.html',
  styleUrls: ['./recursos-dialog-info.component.scss']
})
export class RecursosDialogInfoComponent implements OnInit {
  public recursos: Recurso[]=[];
  
  @Input() set _recursos(recursos: Recurso[]){    
    this.recursos = recursos;
  }

  @Output() public recursosAEditarEmitter = new EventEmitter();
  public recursoAEditar: Recurso;
  public recursoAFiltrar: Recurso;
  public dateString: String="";

  Estados: string[] = ['Libre','Ocupado','Alquilado','Reservado','Baja','Reparacion'];
  Condiciones: ['Nuevo','Usado','Averiado','Perdido'];
  filiales: Filial[];
  filialRecurso: string;
  
  constructor(
    public dialogRef: MatDialogRef<RecursosDialogInfoComponent>,
    public recursosService: RecursosService,
    @Inject(MAT_DIALOG_DATA) public recurso: Recurso,
    private filialService: FilialService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.filialService.getFiliales().subscribe(
      filiales => {
        this.filiales = filiales;
        filiales.forEach(element => {
          if(this.recurso.idfilial.localeCompare(element.id)==0){
            this.filialRecurso = element.nombre;
          }
        });
      },
      error => {
        console.error(error);
      } 
    )
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

  cerrarDialog() {
    this.dialogRef.close();
  }

  public openDialog(index:number):void {
    const dialogRef = this.dialog.open( RecursosDialogInfoComponent, {
      width: '500px',
      data: this.recursos[index]
    });
    dialogRef.afterClosed().subscribe(result => {
      //console.log('The dialog was closed');
    })
  }

  alquilar(){
    
  }

}
