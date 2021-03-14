import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Recurso } from 'src/app/models/recurso';
import { RecursosService } from 'src/app/services/recursos.service';
import { ActivatedRoute } from '@angular/router';
import { Filial } from 'src/app/models/filial';
import { FilialService } from 'src/app/services/filial.service';

@Component({
  selector: 'app-recursos-filtros',
  templateUrl: './recursos-filtros.component.html',
  styleUrls: ['./recursos-filtros.component.scss']
})
export class RecursosFiltrosComponent implements OnInit {

  private recursos: Recurso[];
  @Output() private mostrarRecursos = new EventEmitter();

  public tipoOrdenamiento: 'ID'|'Nombre'|'Estado'|'Valor'|''='';
  public filtroEstado: 'Libre'|'Ocupado'|'Alquilado'|'Reservado'|'Baja'|'Reparacion'|'' = '';
  public filtroCondicion: 'Nuevo'|'Usado'|'Averiado'|'Perdido'|'' = '';

  idFilial: string;
  filial: Filial = {
    id: "0",
    nombre: ""
  };

  constructor(
    private recursosService: RecursosService,
    private route: ActivatedRoute,
    private filialService: FilialService,
  ) { }

  ngOnInit(): void {
    if(this.route.snapshot.params['id']) {
      this.idFilial = this.route.snapshot.params['id'];
      this.filialService.getFilial(this.idFilial).subscribe(item => { this.filial = item })
      this.recursosService.getRecursosPorFilial(this.idFilial).subscribe(
        recursos => {
          this.recursos = recursos;
          this.enviarRecursos(this.recursos)
        },
        error => {
          console.error(error);
        }
      )
    }
    else {
    this.recursosService.getRecursos().subscribe(
      recursos=>{
        this.recursos = recursos;
        this.enviarRecursos(this.recursos);
      },
      error => {
        console.error(error);
      })}
  }
  /***Filtros***********************************************/
  public buscarPorNombre(input: string) {
    const recursosAMostrar = this.recursos.filter(recurso => {
      console.error("valor encontrado nombre= ", recurso.nombre.search(input));
      return recurso.nombre.toUpperCase().search(input.toUpperCase()) != -1 || recurso.descripcion.toUpperCase().search(input.toUpperCase()) != -1;
    })
    this.enviarRecursos(recursosAMostrar);
  }

  public buscarPorID(input: string) {
    const recursosAMostrar = this.recursos.filter(recurso => {
      return recurso.id.search(input) != -1;
    })
    this.enviarRecursos(recursosAMostrar);
  }

  public buscarPorEspacio(input: string) {
    const recursosAMostrar = this.recursos.filter(recurso => {
      return recurso.espacio == true;
    })
    this.enviarRecursos(recursosAMostrar);
  }

  public buscarPorTipo(input: string) {
    const recursosAMostrar = this.recursos.filter(recurso => {
      return recurso.tipo.toUpperCase().search(input.toUpperCase()) != -1;
    })
    this.enviarRecursos(recursosAMostrar);
  }

  clnSrch(val1, val2) {
    val1.value = '';
    val2.value = '';
    this.enviarRecursos(this.recursos);
  }

  public buscarPorUbicacion(input: string) {
    const recursosAMostrar = this.recursos.filter(recurso => {
      return recurso.ubicacion.search(input) != -1;
    })
    this.enviarRecursos(recursosAMostrar);
  }

  /***Filtros***********************************************/
  public filtrarPorEstado(estado) {
    this.filtroEstado = estado;
    this.filtrar();
  }
  
  public filtrarPorCondicion(condicion) {
    this.filtroCondicion = condicion;
    this.filtrar();
  }
  
  private filtrar() {
    const recursosAMostrar = this.recursos.filter( recurso => {
      return (recurso.estado.search(this.filtroEstado) + 1) && 
             (recurso.condicion.search(this.filtroCondicion) + 1);
    })
    this.enviarRecursos(recursosAMostrar);
  }

  /***Ordenamiento*******************************************/

  compararPorEstado(a, b) {
    if (a.estado < b.estado) {
      return -1;
    }
    if (a.estado > b.estado) {
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

  compararPorValor(a, b) {
    if (a.valor < b.valor) {
      return -1;
    }
    if (a.valor > b.valor) {
      return 1;
    }
    return 0;
  }

  compararPorid(a, b) {
    if (a.id < b.id) {
      return 1;
    }
    if (a.id > b.id) {
      return -1;
    }
    return 0;
  }

  ordenar(tipo) {
    this.tipoOrdenamiento = tipo
    switch(this.tipoOrdenamiento) {
      case 'ID':
        this.recursos.sort(this.compararPorid);
        break;
      case 'Nombre':
        this.recursos.sort(this.compararPorNombre);
        break;
      case 'Estado':
        this.recursos.sort(this.compararPorEstado);
        break;
      case 'Valor':
        this.recursos.sort(this.compararPorValor);
        break;
      default:
        break;    
    }
    this.filtrar()
  }

  /***Enviar************************************************/
  private enviarRecursos(recursosAMostrar: Recurso[]) {
    this.mostrarRecursos.emit(recursosAMostrar);
  }
  /***Enviar************************************************/
}
