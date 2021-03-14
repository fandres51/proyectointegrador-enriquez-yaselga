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

  private productos: Producto[];
  private productosAMostrar:Producto[];
  idFilial:string;
  @Output() private mostrarProductos = new EventEmitter();

  public tipoOrdenamiento: 'Nombre' | 'Precio' | 'Codigo' | '' = '';
  EstadoFiltro: boolean=null;
  EstadoFiltroString: 'Activo'|'Inactivo'|''='';

  constructor(
    private productosService: ProductosService,
    private route:ActivatedRoute,
  ) { }

  ngOnInit() {
    this.idFilial = this.route.snapshot.params['id'];
    this.productosService.getProductos(this.idFilial).subscribe(productos => {
      this.productos = productos;
      this.enviarProductos(this.productos);
    },
    error => {
      console.error(error);
    })
  }

  /***Filtros*******************************************/

  public buscarPorNombre(input: string) {
    this.productosAMostrar = this.productos.filter(produto => {
      return produto.nombre.toUpperCase().search(input.toUpperCase()) != -1 || produto.categoria.toUpperCase().search(input.toUpperCase()) != -1;
    })
    
    this.enviarProductos(this.productosAMostrar);
  }

  public buscarPorCedula(input: string) {
    this.productosAMostrar = this.productos.filter(produto => {
      return produto.id.search(input) != -1;
    })
    
    this.enviarProductos(this.productosAMostrar);
  }

  clnSrch(val1, val2) {
    val1.value = '';
    val2.value = '';
    this.enviarProductos(this.productos);
  }

  /***Filtros*******************************************/
  
  public filtroEstado(estado) {
    if(estado=='Activo'){
      this.EstadoFiltroString="Activo";
      this.EstadoFiltro = true;
    }else if(estado==''){
      this.EstadoFiltroString="";
      this.EstadoFiltro = null;
    }else{
      this.EstadoFiltroString="Inactivo";
      this.EstadoFiltro=false;
    }
    this.filtrar();
  }
  /*
  public filtrarPorSemestre(semestre) {
    this.filtroSemestre = semestre;
    this.filtrar();
  }
  
  public filtrarPorAporte(afiliacion) {
    this.filtroAfiliacion = afiliacion;
    this.filtrar();
  }
 
  private filtrar() {
    const productosAMostrar = this.productos.filter( produto => {
      return (produto.Carrera.search(this.filtroCarrera) + 1) && 
             (produto.EstadoAfiliacion.search(this.filtroAfiliacion) + 1) && 
             (produto.SemestreReferencial.search(this.filtroSemestre) + 1);
    })
    this.enviarProductos(productosAMostrar);
  }
 */

  /***Ordenamiento*******************************************/

  compararPorCodigo(a, b) {
    ////console.log(">>>ordenando>> a:", a.id ," - b:", b.id);
    if(a.id.length < b.id.length) 
      return 1;
    if(a.id.length > b.id.length)
      return -1;
    if (a.id < b.id) {
      return 1;
    }
    if (a.id > b.id) {
      return -1;
    }
    return 0;
  }

  compararPorPrecio(a, b) {
    ////console.log(">>>ordenando>> a:", a.precio ," - b:", b.precio);
    if (a.precio < b.precio) {
      return -1;
    }
    if (a.precio > b.precio) {
      return 1;
    }
    return 0;
  }

  compararPorNombre(a, b) {
    ////console.log(">>>ordenando>> a:", a.nombre ," - b:", b.nombre);
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
        this.productos.sort(this.compararPorNombre);
        break;
      case 'Precio':
        this.productos.sort(this.compararPorPrecio);
        break;
      case 'Codigo':
        this.productos.sort(this.compararPorCodigo);
        break;
      default:
        break;    
    }
    this.filtrar();
  }

  /*******Filtrar******************************************/
  filtrar() {
    this.productosAMostrar = this.productos.filter( producto => {
      ////console.log("estado:", this.EstadoFiltro)
      if(this.EstadoFiltro!=null)
      {
        if(this.EstadoFiltro&&producto.estado){
          return 1
        }
        else if(this.EstadoFiltro&&!producto.estado){
          return 0
        }
        return ( producto.estado==this.EstadoFiltro);
      }else{
        return ( 1 );
      }
      
    })
  
    this.enviarProductos(this.productosAMostrar);
  }
  /***Enviar****************************************** */

  private enviarProductos(productosAMostrar: Producto[]) {
    ////console.log(">>>envia: ",productosAMostrar);
    this.mostrarProductos.emit(productosAMostrar);
  }

}
