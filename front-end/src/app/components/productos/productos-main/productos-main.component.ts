import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Filial } from 'src/app/models/filial';
import { Producto } from 'src/app/models/producto';
import { FilialService } from 'src/app/services/filial.service';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-productos-main',
  templateUrl: './productos-main.component.html',
  styleUrls: ['./productos-main.component.scss']
})
export class ProductosMainComponent implements OnInit {

  public productos:Producto[]=[];
  public productosMostrados:Producto[]=[];
  idFilial:string;
  filial:Filial={
    id:"0",
    nombre:""
  };
  constructor(
    private route:ActivatedRoute,
    private productosService:ProductosService,
    private filialService:FilialService,
  ) { }

  ngOnInit(): void {
    this.idFilial = this.route.snapshot.params['id'];
    this.filialService.getFilial(this.idFilial).subscribe(item=>{this.filial=item})
    this.productosService.getProductos(this.idFilial).subscribe(producto =>{
      this.productos = producto;
      this.productosMostrados = producto;
      ////console.log(this.productos);
    });
  }
  
   cargaMasiva(event: FileList, idFilial:string) {
    const file = event.item(0);
    if (file.type.split('/')[1] !== 'csv') {
      console.error('¡Formato de archivo no soportado!');
    }
    this.productosService.cargaMasivaProductos(file,idFilial).then(
      eni => {
        if(eni.length > 0) {
          let registros: string = '';
          eni.forEach( n => {
            registros = registros + n + '\n';
          })
          alert('Registros no ingresados: \n' + registros);
        }
      }
    ); 
  }
  
  refrescar(event){
    ////console.log(">>>recibido:",event);
    this.productos=event;
  }
  


}
