import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Contrato } from 'src/app/models/contrato';
import { AuthService } from 'src/app/services/auth.service';
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
    private readonly authService: AuthService,
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
    this.authService.auth.user.subscribe(
      user => {
        this.authService.getPermiso(user.email, 'Contratos_new').subscribe(
          permiso => {
            if (permiso.length > 0) {
              this.router.navigate(['/contratos', 'nuevo']);
            }
            else
              alert('Usted no tiene permiso para realizar esa acción');
          }
        )
      }
    )
  }

}
