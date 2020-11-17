import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Contrato } from 'src/app/models/contrato';
import { ContratoService } from 'src/app/services/contrato.service';

@Component({
  selector: 'app-contratos-detalle',
  templateUrl: './contratos-detalle.component.html',
  styleUrls: ['./contratos-detalle.component.scss']
})
export class ContratosDetalleComponent implements OnInit {

  editable: boolean = false;
  contrato: Contrato;
  fechaInicial: string;
  fechaFinal: string;

  constructor(
    private readonly contratoService: ContratoService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.contrato = {
      id: '',
      nombre: '',
      descripcion: '',
      fechaFinal: new Date(),
      fechaInicial: new Date(),
      interesados: '',
      prioridad: 'Baja'
    }
    this.route.paramMap.subscribe(
      contrato => {
        this.contratoService.getContrato(contrato.get('contrato')).subscribe(
          contrato => {
            this.contrato = contrato;
            this.fechaInicial = contrato.fechaInicial.getFullYear() + '-' + ('0' + contrato.fechaInicial.getMonth()).slice(-2) + '-' + ('0' + contrato.fechaInicial.getDate()).slice(-2);
            this.fechaFinal = contrato.fechaFinal.getFullYear() + '-' + ('0' + contrato.fechaFinal.getMonth()).slice(-2) + '-' + ('0' + contrato.fechaFinal.getDate()).slice(-2);
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
  }

  cambiarEditable() {
    this.editable = !this.editable;
  }

  editar() {
    this.contrato.fechaInicial = new Date(this.fechaInicial);
    this.contrato.fechaFinal = new Date(this.fechaFinal);
    const estaSeguro = confirm('¿Está seguro que desea editar la información de este contrato?');
    if(estaSeguro) {
      this.contratoService.updateContrato(this.contrato);
      this.editable = false;
    }
  }
  
  eliminar() {
    const estaSeguro = confirm('¿Está seguro que desea eliminar este contrato?');
    if(estaSeguro) {  	
      this.contratoService.deleteContrato(this.contrato);
      this.router.navigate(['/contratos']);
    }
  }

}
