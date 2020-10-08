import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Contrato } from 'src/app/models/contrato';
import { ContratoService } from 'src/app/services/contrato.service';

@Component({
  selector: 'app-contratos-main',
  templateUrl: './contratos-main.component.html',
  styleUrls: ['./contratos-main.component.scss']
})
export class ContratosMainComponent implements OnInit {

  contratosNombres: string[]; 
  contratos: Contrato[];

  constructor(
    private readonly contratoService: ContratoService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.contratoService.getContratos().subscribe(
      contratos => {
        this.contratos = contratos;
        this.contratosNombres = contratos.map(n=>n.id);
      },
      error => {
        console.error(error);
      }
    )
  }

  irADetalle(id:string) {
    this.router.navigate(['/contratos', id]);
  }
  
  nuevo() {
    this.router.navigate(['/contratos', 'nuevo']);
  }

}
