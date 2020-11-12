import { Component, OnInit } from '@angular/core';
import { Contrato } from 'src/app/models/contrato';
import { ContratoService } from 'src/app/services/contrato.service';

@Component({
  selector: 'app-contratos-nuevo',
  templateUrl: './contratos-nuevo.component.html',
  styleUrls: ['./contratos-nuevo.component.scss']
})
export class ContratosNuevoComponent implements OnInit {

  contrato: Contrato;
  fechaInicial: string;
  fechaFinal: string;

  constructor(
    private readonly contratoService: ContratoService,
  ) { }

  ngOnInit(): void {
    this.contrato = {
      id: '',
      descripcion: '',
      fechaFinal: new Date(),
      fechaInicial: new Date(),
      interesados: '',
      prioridad: 'Baja'
    }
  }

  nuevo() {
    this.contrato.fechaInicial = new Date(this.fechaInicial);
    this.contrato.fechaFinal = new Date(this.fechaFinal);

    this.contratoService.addContrato(this.contrato);
    
  }

}
