import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Filial } from 'src/app/models/filial';
import { FilialService } from 'src/app/services/filial.service';
import {ProductosService} from 'src/app/services/productos.service'
import { Producto } from 'src/app/models/producto';


@Component({
  selector: 'app-filiales-main',
  templateUrl: './filiales-main.component.html',
  styleUrls: ['./filiales-main.component.scss']
})
export class FilialesMainComponent implements OnInit {

  filialesNombres: string[]; 
  filialesNombresX: string[]; 
  filiales: Filial[];
  iconos: ["store"];
  productoprueba:Producto={
    id:'',
    nombre:'',
    precio:0
  }

  constructor(
    private readonly filialService: FilialService,
    private readonly router: Router,
    public productosService: ProductosService
  ) { }

  ngOnInit(): void {
    this.filialService.getFiliales().subscribe(
      filiales => {
        this.filiales = filiales;
        this.filialesNombresX = filiales.map(n=>'/filiales/filial/'+n.nombre);
        this.filialesNombres = filiales.map(n=>n.nombre);
        
      },
      error => {
        console.error(error);
      }
    )
  }

  probarProductoX(){
    this.productoprueba.id='PRD3';
    this.productoprueba.nombre='ProductoPrueba3';
    this.productoprueba.precio=12;
    this.productosService.addProductoX(this.productoprueba,'FIL1');
  }

  irADetalle(id:string) {
    this.router.navigate(['/filiales/filial', id]);
  }
  
  nuevo() {
    this.router.navigate(['/filiales', 'nuevo']);
  }
}
