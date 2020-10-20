import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Contrato } from 'src/app/models/contrato';
import { AuthService } from 'src/app/services/auth.service';
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
    private readonly router: Router,
    private readonly authService: AuthService
  ) { }

  ngOnInit(): void {
    this.contrato = {
      id: '',
      descripcion: '',
      fechaFinal: new Date(),
      fechaInicial: new Date(),
      interesados: ''
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
    this.authService.auth.user.subscribe(
      user => {
        this.authService.getPermiso(user.email, 'Contratos_edit').subscribe(
          permiso => {
            if (permiso.length > 0) {
              const estaSeguro = confirm('¿Está seguro que desea editar la información de este contrato?');
              if (estaSeguro) {
                this.contratoService.addContrato(this.contrato);
                alert('Contrato editado!')
                this.router.navigate(['/Contratos']);
              }
            }
            else
              alert('Usted no tiene permiso para realizar esa acción');
          }
        )
      }
    )
  }

  eliminar() {
    this.authService.auth.user.subscribe(
      user => {
        this.authService.getPermiso(user.email, 'Contratos_delete').subscribe(
          permiso => {
            if (permiso.length > 0) {
              const estaSeguro = confirm('¿Está seguro que desea eliminar este contrato?');
              if (estaSeguro) {
                this.contratoService.deleteContrato(this.contrato);
                alert('Contrato eliminado!')
                this.router.navigate(['/Contratos']);
              }
            }
            else
              alert('Usted no tiene permiso para realizar esa acción');
          }
        )
      }
    )
  }
}
