import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Producto } from 'src/app/models/producto'
import { ProductosService } from 'src/app/services/productos.service'

@Component({
  selector: 'app-productos-filtros',
  templateUrl: './productos-filtros.component.html',
  styleUrls: ['./productos-filtros.component.scss']
})
export class ProductosFiltrosComponent implements OnInit {

  private produtos: Producto[];
  idFilial:string;
  @Output() private mostrarProductos = new EventEmitter();

  public tipoOrdenamiento: 'Nombre' | 'Precio' | 'Codigo' | '' = '';

  constructor(
    private produtosService: ProductosService,
    private route:ActivatedRoute,
  ) { }

  ngOnInit() {
    this.idFilial = this.route.snapshot.params['id'];
    this.produtosService.getProductos(this.idFilial).subscribe(produtos => {
      this.produtos = produtos;
      this.enviarProductos(this.produtos);
    },
    error => {
      console.error(error);
    })
  }

  /***Filtros*******************************************/

  public buscarPorNombre(input: string) {
    const produtosAMostrar = this.produtos.filter(produto => {
      return produto.nombre.search(input) != -1 || produto.categoria.search(input) != -1;
    })
    this.enviarProductos(produtosAMostrar);
  }

  public buscarPorCedula(input: string) {
    const produtosAMostrar = this.produtos.filter(produto => {
      return produto.id.search(input) != -1;
    })
    this.enviarProductos(produtosAMostrar);
  }

  /***Filtros*******************************************/
  
  /* public filtrarPorCarrera(carrera) {
    this.filtroCarrera = carrera;
    this.filtrar();
  }
  
  public filtrarPorSemestre(semestre) {
    this.filtroSemestre = semestre;
    this.filtrar();
  }
  
  public filtrarPorAporte(afiliacion) {
    this.filtroAfiliacion = afiliacion;
    this.filtrar();
  }
 
  private filtrar() {
    const produtosAMostrar = this.produtos.filter( produto => {
      return (produto.Carrera.search(this.filtroCarrera) + 1) && 
             (produto.EstadoAfiliacion.search(this.filtroAfiliacion) + 1) && 
             (produto.SemestreReferencial.search(this.filtroSemestre) + 1);
    })
    this.enviarProductos(produtosAMostrar);
  }
 */
  /***Ordenamiento*******************************************/

  compararPorCodigo(a, b) {
    if (a.id < b.id) {
      return -1;
    }
    if (a.id > b.id) {
      return 1;
    }
    return 0;
  }

  compararPorPrecio(a, b) {
    //console.log(">>>ordenando>> a:", a.precio ," - b:", b.precio);
    if (a.precio < b.precio) {
      return -1;
    }
    if (a.precio > b.precio) {
      return 1;
    }
    return 0;
  }

  compararPorNombre(a, b) {
    if (a.nombre < b.nombre) {
      return -1;
    }
    if (a.nombre > b.nombre) {
      return 1;
    }
    return 0;
  }

  ordenar(tipo) {
    this.tipoOrdenamiento = tipo
    switch(this.tipoOrdenamiento) {
      case 'Nombre':
        this.enviarProductos(this.produtos.sort(this.compararPorNombre));
        break;
      case 'Precio':
        this.enviarProductos(this.produtos.sort(this.compararPorPrecio));
        break;
      case 'Codigo':
        this.enviarProductos(this.produtos.sort(this.compararPorCodigo));
        break;
      default:
        break;    
    }
    //this.enviarProductos(this.produtos);
    //this.filtrar()
  }

  /***Enviar****************************************** */

  private enviarProductos(produtosAMostrar: Producto[]) {
    //console.log(">>>envia: ",produtosAMostrar);
    this.mostrarProductos.emit(produtosAMostrar);
  }

}
