import { Component, OnInit } from '@angular/core';
import { AsociacionService } from 'src/app/services/asociacion.service';

@Component({
  selector: 'app-ajustes-definir-aporte',
  templateUrl: './ajustes-definir-aporte.component.html',
  styleUrls: ['./ajustes-definir-aporte.component.scss']
})
export class AjustesDefinirAporteComponent implements OnInit {
  
  public aporte;

  constructor(
    private readonly asociacionService: AsociacionService
  ) { }

  ngOnInit(): void {
  }

  cambiarAporte() {
    this.asociacionService.updateAsociacion({AporteActual: this.aporte});
  }
}
