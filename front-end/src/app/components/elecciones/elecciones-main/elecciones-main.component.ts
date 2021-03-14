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
  public eleccionesJSON: Eleccion[] = [];

  constructor(
    private eleccionService: EleccionService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.eleccionService.getElecciones().subscribe(
      elecciones => {
        this.eleccionesJSON = elecciones;
        this.elecciones = elecciones.map( n => n.titulo );
      },
      error => {
        console.error(error);
      }
    )
  }

  crearEleccion(nueva) {
    const nombreEleccion = prompt("Está por crear una elección, ingrese un identificador de la misma para continuar","");
    if(nombreEleccion) {
      this.eleccionService.createEleccion({
        fecha: new Date(),
        listaGanadora: '',
        titulo: nombreEleccion
      })
    }
  }

  irAEleccion(titEleccion: string) {
    const id = this.eleccionesJSON.find( eleccion => eleccion.titulo === titEleccion ).id;
    this.router.navigate(['/elecciones', id]);
  }



}
