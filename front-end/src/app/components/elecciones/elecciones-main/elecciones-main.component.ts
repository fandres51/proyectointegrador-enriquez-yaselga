import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Eleccion } from 'src/app/models/eleccion';
import { EleccionService } from 'src/app/services/eleccion.service';

@Component({
  selector: 'app-elecciones-main',
  templateUrl: './elecciones-main.component.html',
  styleUrls: ['./elecciones-main.component.scss']
})
export class EleccionesMainComponent implements OnInit {

  public elecciones: string[] = [];
  public rutaDeRegreso: string = "/";
  public texto: string = "Elecciones";

  constructor(
    private eleccionService: EleccionService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.eleccionService.getElecciones().subscribe(
      elecciones => {
        console.log(elecciones.length);
        this.elecciones = elecciones.map( n => n.fecha.getMonth() + '-' + n.fecha.getDate() + '-' + n.fecha.getFullYear());
      }
    )
  }

  crearEleccion(nueva) {
    console.log('nueva1');
    this.eleccionService.createEleccion({
      fecha: new Date(),
      listaGanadora: ''
    })
  }

  irAEleccion(eleccion: string) {
    console.log(eleccion);
    this.router.navigate(['/elecciones', eleccion])
  }



}
