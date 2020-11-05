import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Producto } from 'src/app/models/producto';
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
  constructor(
    private route:ActivatedRoute,
    private productosService:ProductosService
  ) { }

  ngOnInit(): void {
    this.idFilial = this.route.snapshot.params['id'];
    this.productosService.getProductos(this.idFilial).subscribe(producto =>{
      this.productos = producto;
      this.productosMostrados = producto;
      console.log(this.productos);
    });
  }
  
   cargaMasiva(event: FileList,idFilial:string) {
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
  


}
