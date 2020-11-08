import { Component, Inject, OnInit, Output ,EventEmitter} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Filial } from 'src/app/models/filial';
import { Proveedor } from 'src/app/models/proveedor';
import { FilialService } from 'src/app/services/filial.service';
import { ProveedoresService } from 'src/app/services/proveedores.service';

@Component({
  selector: 'app-proveedores-dialog-info',
  templateUrl: './proveedores-dialog-info.component.html',
  styleUrls: ['./proveedores-dialog-info.component.scss']
})
export class ProveedoresDialogInfoComponent implements OnInit {

  idFilial:string;
  filial:Filial={
    id:"0",
    nombre:""
  };

  @Output() public proveedoresAEditarEmitter = new EventEmitter();
  public proveedorAEditar: Proveedor;
  public proveedorAFiltrar: Proveedor;
  public dateString: String="";
  public proveedor: Proveedor; // --->> donde debe estar
  
  constructor(
    private route:ActivatedRoute,
    public proveedoresService: ProveedoresService,
    private filialService:FilialService,
    //public proveedor: Proveedor, -->>donde estaba
    @Inject(MAT_DIALOG_DATA) datos: any,
    public dialogRef: MatDialogRef<ProveedoresDialogInfoComponent>) {
      if(datos){
        this.proveedor=datos.proveedor;
        this.idFilial=datos.id;
      }
    }

  ngOnInit(): void {
    
    //this.idFilial = this.route.snapshot.params['id'];
    ////console.log("<<<>>>filialid: ",this.idFilial);
    this.filialService.getFilial(this.idFilial).subscribe(item=>{this.filial=item})
    
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  cerrarDialog() {
    this.dialogRef.close();
  }

  darDeBaja(){
    if(window.confirm('¿Está seguro que desea dar de baja este proveedor?')) {
      this.proveedoresService.darDeBaja(this.proveedor.id,this.idFilial);
      this.dialogRef.close();
    }
  }
  eliminar(){
    if(window.confirm('¿Está seguro que desea eliminar este proveedor?')) {
      this.proveedoresService.deleteProveedor(this.proveedor.id,this.idFilial);
      this.dialogRef.close();
    }
  }

}