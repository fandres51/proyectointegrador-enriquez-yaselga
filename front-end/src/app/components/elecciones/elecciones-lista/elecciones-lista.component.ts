import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Autoridad } from 'src/app/models/autoridad';
import { Eleccion } from 'src/app/models/eleccion';
import { Lista } from 'src/app/models/lista';
import { EleccionService } from 'src/app/services/eleccion.service';

@Component({
  selector: 'app-elecciones-lista',
  templateUrl: './elecciones-lista.component.html',
  styleUrls: ['./elecciones-lista.component.scss']
})
export class EleccionesListaComponent implements OnInit {

  public lista: Lista = {nombre:""};
  public listaParam: string;
  public eleccionParam: string;
  public eleccion: Eleccion;
  public dignidades: Autoridad[] = []; 
  public dignidadesNombres: string[] = [];
  public rutaDeRegreso: string = "/elecciones";

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eleccionService: EleccionService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe( params => {
      this.eleccionParam = params['eleccion'];
      this.listaParam = params['lista'];
      this.rutaDeRegreso = "/elecciones/" + this.eleccionParam;
      this.eleccionService.getLista(this.listaParam, this.eleccionParam).subscribe(
        lista => {
          this.lista = lista;
          this.eleccionService.getDignidadesDeLista(this.listaParam, this.eleccionParam).subscribe(
            dignidades => {
              this.dignidades = dignidades;
              this.dignidadesNombres = dignidades.map(n=>n.Cargo);
            },
            error => {
              console.error(error);
            }
          )
        },
        error => {
          console.error(error);
        }
      )
      this.eleccionService.getEleccion(this.eleccionParam).subscribe(
        eleccion => {
          this.eleccion = eleccion;
        }
      )
    },
    error => {
      console.error(error);
    })
  }

  irADignidad(dignidad: string) {
    if(!this.eleccion.listaGanadora)
      this.router.navigate(['/elecciones', this.eleccionParam, this.listaParam, dignidad]);
    else
      alert('No puede editar listas de una elección finalizada');
  }

  newDignidad() {
    if(!this.eleccion.listaGanadora)
      this.router.navigate(['/elecciones', this.eleccionParam, this.listaParam, 'crear']);
    else
      alert('No puede editar listas de una elección finalizada');
  }

  deleteList() {
    const estaSeguro = confirm('¿Está seguro que desea eliminar esta lista?');
    if(estaSeguro) {
      this.eleccionService.deleteLista(this.lista, this.eleccionParam);
      this.router.navigate(['/elecciones', this.eleccionParam]);
    }
  }


}
