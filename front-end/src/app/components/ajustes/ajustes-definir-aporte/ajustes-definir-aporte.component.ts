import { Component, OnInit } from '@angular/core';
import { AsociacionService } from 'src/app/services/asociacion.service';

@Component({
  selector: 'app-ajustes-definir-aporte',
  templateUrl: './ajustes-definir-aporte.component.html',
  styleUrls: ['./ajustes-definir-aporte.component.scss']
})
export class AjustesDefinirAporteComponent implements OnInit {
  
  public aporte;
  public aporteAnterior;

  constructor(
    private readonly asociacionService: AsociacionService
  ) { }

  ngOnInit(): void {
    this.asociacionService.getAsociacion().subscribe(
      asociacion => {
        this.aporteAnterior = asociacion.AporteActual;
      }
    )
  }

  cambiarAporte() {
    const estaSeguro = confirm('¿Está seguro de querer cambiar el aporte actual?');
    if(estaSeguro) {
      this.asociacionService.updateAsociacion({AporteActual: this.aporte});
      alert('Aporte cambiado');
    }
  }
}
