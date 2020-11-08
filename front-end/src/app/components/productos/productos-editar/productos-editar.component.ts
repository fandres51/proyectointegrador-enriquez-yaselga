import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { ProductosService } from 'src/app/services/productos.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-productos-editar',
  templateUrl: './productos-editar.component.html',
  styleUrls: ['./productos-editar.component.scss']
})
export class ProductosEditarComponent implements OnInit {
  producto: Producto;
  idFilial:string;

  constructor(
    private productosService:ProductosService,
    private route:ActivatedRoute,
    private router: Router,
    
  ) { }

  ngOnInit(): void {
    this.idFilial = this.route.snapshot.params['id'];
    this.producto ={
      id:"",
      nombre:"",
      estado:false,
      precio:0,
    }
    this.route.params.subscribe(params =>{
      //console.log(">>>idproducto>>>: ",params['idproducto']);
      //console.log(">>>idFilial>>>: ", this.idFilial);
      const noUnicoParam = params['idproducto'];
      this.productosService.getProducto(noUnicoParam, this.idFilial).subscribe(recurso =>{
        if(recurso!=null){
          //console.log("Recurso : ", recurso);
          this.producto = recurso;
        }
        else{
          console.log("no hay recurso disponible: ", recurso);
        }
        
      },
      error => {
        console.error(error);
      })
    },
    error => {
      console.error(error);
    });

  }
  guardar(){
    this.productosService.updateProducto(this.producto,this.idFilial);
    this.router.navigateByUrl('/filiales/filial/'+this.idFilial+'/productos'); 
  }

}
