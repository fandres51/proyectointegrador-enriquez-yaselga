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
        this.contratos = contratos.sort(this.compareFunction);
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

  finalizarContrato(id) {
    const estaSeguro = confirm('¿Está seguro de querer marcar este contrato como finalizado?');
    if(estaSeguro) {
      this.contratoService.updateContrato({
        id: id,
        fechaFinal: new Date(),
        prioridad: 'Finalizado'
      })
    }
  }

  compareFunction(a, b) {
    if(a.prioridad === 'Alta' && b.prioridad !== 'Alta')
      return -1;
    if(a.prioridad !== 'Alta' && b.prioridad === 'Alta')
      return 1;
    if(a.prioridad === 'Alta' && b.prioridad === 'Alta')
      return 0;
    if(a.prioridad === 'Media' && b.prioridad !== 'Media')
      return -1;
    if(a.prioridad !== 'Media' && b.prioridad === 'Media')
      return 1;
    if(a.prioridad === 'Media' && b.prioridad === 'Media')
      return 0;
    if(a.prioridad === 'Baja' && b.prioridad !== 'Baja')
      return -1;
    if(a.prioridad !== 'Baja' && b.prioridad === 'Baja')
      return 1;
    if(a.prioridad === 'Baja' && b.prioridad === 'Baja')
      return 0;   
  }
}
