import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Filial } from 'src/app/models/filial';
import { Producto } from 'src/app/models/producto';
import { FilialService } from 'src/app/services/filial.service';
import { ProductosDialogInfoComponent } from '../productos-dialog-info/productos-dialog-info.component';

@Component({
  selector: 'app-productos-listar',
  templateUrl: './productos-listar.component.html',
  styleUrls: ['./productos-listar.component.scss']
})
export class ProductosListarComponent implements OnInit {

  public actualStart: number = 0;
  public productos: Producto[]=[];
  idFilial:string;
  filial:Filial={
    id:"0",
    nombre:""
  };

  //@Input() _idFilial 

  @Input() set _productos(productos: Producto[]){    
    ////console.log(">>>>recibe:",productos);
    this.productos = productos;
    this.changePagination();
  }
  private pageIndex: number = 0;
  private pageSize: number = 9;
  public productosPaginados: Producto[];

  constructor(
    public dialog: MatDialog,
    private route:ActivatedRoute,
    private filialService:FilialService,
  ) { }
  

  ngOnInit(): void {
    this.idFilial = this.route.snapshot.params['id'];
    this.filialService.getFilial(this.idFilial).subscribe(item=>{this.filial=item})
  }

  public openDialog(index:number, filial:string):void {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      producto: this.productos[index], 
      id:filial
    };

    const dialogRef = this.dialog.open(ProductosDialogInfoComponent, {
      data:{
        producto: this.productos[index], 
        id:filial
      }
    });

     /* const dialogRef = this.dialog.open( ProductosDialogInfoComponent, {
      width: '500px',
      data: this.productos[index]
    }); */ 
    dialogRef.afterClosed().subscribe(result => {
      //console.log('The dialog was closed');
    })
  } 

  onPageChange($event) {
    this.pageIndex = $event.pageIndex;
    this.pageSize = $event.pageSize;
    this.changePagination();
  }
  changePagination() {
    this.productosPaginados = this.productos.slice(this.pageIndex*this.pageSize, this.pageIndex*this.pageSize + this.pageSize);
    //console.log(">>>paginados",this.productosPaginados);
  }
  
}


