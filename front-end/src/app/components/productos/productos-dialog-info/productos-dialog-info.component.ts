import { Component, Inject, OnInit, Output ,EventEmitter} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Filial } from 'src/app/models/filial';
import { Producto } from 'src/app/models/producto';
import { FilialService } from 'src/app/services/filial.service';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-productos-dialog-info',
  templateUrl: './productos-dialog-info.component.html',
  styleUrls: ['./productos-dialog-info.component.scss']
})
export class ProductosDialogInfoComponent implements OnInit {

  idFilial:string="FIL0";
  filial:Filial={
    id:"0",
    nombre:""
  };

  @Output() public productosAEditarEmitter = new EventEmitter();
  public productoAEditar: Producto;
  public productoAFiltrar: Producto;
  public dateString: String="";
  
  constructor(
    private route:ActivatedRoute,
    public productosService: ProductosService,
    
    public dialogRef: MatDialogRef<ProductosDialogInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public producto: Producto,
    private filialService:FilialService
  ) {
    }

  ngOnInit(): void {
    
    //this.idFilial = this.route.snapshot.params['id'];
    console.log("<<<>>>filialid: ",this.idFilial);
    this.filialService.getFilial(this.idFilial).subscribe(item=>{this.filial=item})
    
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  cerrarDialog() {
    this.dialogRef.close();
  }

  darDeBaja(){
    if(window.confirm('¿Está seguro que desea dar de baja este producto?')) {
      this.productosService.darDeBaja(this.producto.id,this.idFilial);
      this.dialogRef.close();
    }
  }
  eliminar(){
    if(window.confirm('¿Está seguro que desea eliminar este producto?')) {
      this.productosService.deleteProducto(this.producto.id,this.idFilial);
      this.dialogRef.close();
    }
  }

}