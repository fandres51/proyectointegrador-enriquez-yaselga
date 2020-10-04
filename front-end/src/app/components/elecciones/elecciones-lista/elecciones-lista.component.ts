import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Dignidad } from 'src/app/models/dignidad';
import { Lista } from 'src/app/models/lista';
import { EleccionService } from 'src/app/services/eleccion.service';

@Component({
  selector: 'app-elecciones-lista',
  templateUrl: './elecciones-lista.component.html',
  styleUrls: ['./elecciones-lista.component.scss']
})
export class EleccionesListaComponent implements OnInit {

  public lista: Lista;
  public dignidades: Dignidad[] = []; 
  public rutaDeRegreso: string = "/elecciones";

  constructor(
    private route: ActivatedRoute,
    private eleccionService: EleccionService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe( params => {
      const eleccionParam = params['eleccion'];
      const listaParam = params['lista'];
      this.rutaDeRegreso = "/elecciones/" + eleccionParam;
      this.eleccionService.getLista(listaParam, eleccionParam).subscribe(
        lista => {
          this.lista = lista;
          this.eleccionService.getDignidadesDeLista(listaParam, eleccionParam).subscribe(
            dignidades => {
              this.dignidades = dignidades;
            }
          )
        }
      )
    })
  }

  irADignidad(dignidad: string) {

  }

  newDignidad() {

  }



}
