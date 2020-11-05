import { Component, Inject, OnInit, Output ,EventEmitter} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Producto } from 'src/app/models/producto';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-productos-dialog-info',
  templateUrl: './productos-dialog-info.component.html',
  styleUrls: ['./productos-dialog-info.component.scss']
})
export class ProductosDialogInfoComponent implements OnInit {

  @Output() public productosAEditarEmitter = new EventEmitter();
  public productoAEditar: Producto;
  public productoAFiltrar: Producto;
  public dateString: String="";
  
  constructor(
    public dialogRef: MatDialogRef<ProductosDialogInfoComponent>,
    public productosService: ProductosService,
    @Inject(MAT_DIALOG_DATA) public producto: Producto
  ) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  cerrarDialog() {
    this.dialogRef.close();
  }

}