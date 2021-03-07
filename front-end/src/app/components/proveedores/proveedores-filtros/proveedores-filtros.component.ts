import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Proveedor } from 'src/app/models/proveedor'
import { ProveedoresService } from 'src/app/services/proveedores.service'

@Component({
  selector: 'app-proveedores-filtros',
  templateUrl: './proveedores-filtros.component.html',
  styleUrls: ['./proveedores-filtros.component.scss']
})
export class ProveedoresFiltrosComponent implements OnInit {

  private proveedores: Proveedor[];
  proveedoresAMostrar:Proveedor[];
  idFilial:string;
  @Output() private mostrarProveedores = new EventEmitter();

  public tipoOrdenamiento: 'Nombre' | 'Contacto' | 'Codigo' | '';
  EstadoFiltro: boolean=null;
  EstadoFiltroString: 'Activo' | 'Inactivo' | '';
  constructor(
    private proveedoresService: ProveedoresService,
    private route:ActivatedRoute,
  ) { }

  ngOnInit() {
    this.idFilial = this.route.snapshot.params['id'];
    this.proveedoresService.getProveedores(this.idFilial).subscribe(proveedores => {
      this.proveedores = proveedores;
      this.enviarProveedores(this.proveedores);
    },
    error => {
      console.error(error);
    })
  }

  /***Filtros*******************************************/

  public buscarPorNombre(input: string) {
    this.proveedoresAMostrar = this.proveedores.filter(proveedor => {
      return proveedor.nombre.toUpperCase().search(input.toUpperCase()) != -1 ;
    })
    this.enviarProveedores(this.proveedoresAMostrar);
  }

  public buscarPorCedula(input: string) {
    this.proveedoresAMostrar = this.proveedores.filter(proveedor => {
      return proveedor.id.search(input) != -1;
    })
    this.enviarProveedores(this.proveedoresAMostrar);
  }

  clnSrch(val1, val2) {
    val1.value = '';
    val2.value = '';
    this.enviarProveedores(this.proveedores);
  }

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

  /***Ordenamiento*******************************************/

  compararPorCodigo(a, b) {
    if(a.id.length < b.id.length)
      return 1
    if(a.id.length > b.id.length)
      return -1
    if (a.id < b.id) {
      return 1;
    }
    if (a.id > b.id) {
      return -1;
    }
    return 0;
  }

  compararPorContacto(a, b) {
    ////console.log(">>>ordenando>> a:", a.contacto ," - b:", b.contacto);
    if (a.contacto < b.contacto) {
      return -1;
    }
    if (a.contacto > b.contacto) {
      return 1;
    }
    return 0;
  }

  compararPorNombre(a, b) {
    
    if (a.nombre < b.nombre) {
      return 1;
    }
    if (a.nombre > b.nombre) {
      return -1;
    }
    return 0;
  }

  ordenar(tipo) {
    this.tipoOrdenamiento = tipo
    ////console.log(">>>Tipo>> a:", this.tipoOrdenamiento);
    switch(this.tipoOrdenamiento) {
      case 'Nombre':
        ////console.log(">>>Nombre>> a:", this.proveedores);
        this.enviarProveedores(this.proveedores.sort(this.compararPorNombre));
        break;
      case 'Contacto':
        this.enviarProveedores(this.proveedores.sort(this.compararPorContacto));
        break;
      case 'Codigo':
        this.enviarProveedores(this.proveedores.sort(this.compararPorCodigo));
        break;
      default:
        break;    
    }
    //this.enviarProveedores(this.proveedores);
    //this.filtrar()
  }

  filtrar() {
    this.proveedoresAMostrar = this.proveedores.filter( proveedor => {
      ////console.log("estado:", this.EstadoFiltro)
      if(this.EstadoFiltro!=null)
      {
        if(this.EstadoFiltro&&proveedor.estado){
          return 1
        }
        else if(this.EstadoFiltro&&!proveedor.estado){
          return 0
        }
        return ( proveedor.estado==this.EstadoFiltro);
      }else{
        return ( 1 );
      }
      
    })
  
    this.enviarProveedores(this.proveedoresAMostrar);
  }

  /***Enviar****************************************** */

  private enviarProveedores(proveedoresAMostrar: Proveedor[]) {
    ////console.log(">>>envia: ",proveedoresAMostrar);
    this.mostrarProveedores.emit(proveedoresAMostrar);
  }

}
