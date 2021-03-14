import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { ProductosService } from 'src/app/services/productos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Proveedor } from 'src/app/models/proveedor';
import { ProveedoresService } from 'src/app/services/proveedores.service';

@Component({
  selector: 'app-productos-crear',
  templateUrl: './productos-crear.component.html',
  styleUrls: ['./productos-crear.component.scss']
})
export class ProductosCrearComponent implements OnInit {
  producto: Producto
  idFilial:string;
  proveedores: Proveedor[];

  constructor(
    private productosService:ProductosService,
    private route:ActivatedRoute,
    private router: Router,
    private proveedoresService: ProveedoresService,
  ) { }

  ngOnInit(): void {
    this.idFilial = this.route.snapshot.params['id'];
    this.producto ={
      id:"",
      nombre:"",
      estado:false,
      precio:0,
    }
    this.proveedoresService.getProveedores(this.idFilial).subscribe(
      proveedores => {
        this.proveedores = proveedores;
      },
      error => {
        console.error(error);
      }
    )
  }
  nuevo(){
    this.productosService.addProducto(this.producto,this.idFilial);
    this.router.navigateByUrl('/filiales/filial/'+this.idFilial+'/productos')
  }

}
