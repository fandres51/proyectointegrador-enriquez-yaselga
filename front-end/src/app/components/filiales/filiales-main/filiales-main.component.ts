import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
    precio:0,
    estado:true,
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
        //console.log(">>>>Filiales: ",filiales);
        this.filialesNombres = filiales.map(n=>n.id);
        //this.filialesNombres = filiales.map(n=>n.id);
        
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

  irADetalle(filial:Filial) {
    this.router.navigate(['/filiales/filial', filial.id]);
  }
  
  nuevo() {
    this.router.navigate(['/filiales', 'nuevo']);
  }
  
}
