import { Component, OnInit } from '@angular/core';
import { Transaccion } from 'src/app/models/transaccion';
import { TransaccionesService } from 'src/app/services/transacciones.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Filial } from 'src/app/models/filial';
import { FilialService } from 'src/app/services/filial.service';

@Component({
  selector: 'app-financiero-main',
  templateUrl: './financiero-main.component.html',
  styleUrls: ['./financiero-main.component.scss']
})
export class FinancieroMainComponent implements OnInit {

  idFilial:string;
  filial:Filial={
    id:"0",
    nombre:""
  };
  rutaNuevo="";
  public transacciones: Transaccion[] = [];

  public ingresos: number = 0;
  public egresos: number = 0;

  constructor(
    public transaccionService:TransaccionesService,
    private readonly router: Router,
    private route:ActivatedRoute,
    private filialService:FilialService,
    private transaccionesService: TransaccionesService,
  ) { }

  ngOnInit() {
    if(this.route.snapshot.params['id']){
      this.idFilial = this.route.snapshot.params['id'];
      this.filialService.getFilial(this.idFilial).subscribe(item=>{this.filial=item})
      this.rutaNuevo="/filiales/filial/"+this.idFilial+"/financiero/nuevo";
    }
  }

  crearIngresosYEgresos(transacciones: Transaccion[]) {
    
    this.transacciones = transacciones;

    this.ingresos = Math.round( this.transacciones.reduce((valorAcumulado, valorActual) => {
      if(valorActual.Ingreso && valorActual.Activa) {
        return Number( Number(valorAcumulado) + Number(valorActual.Monto) );
      }
      return valorAcumulado;
    }, 0) * 100)/100;
    
    this.egresos = Math.round(this.transacciones.reduce((valorAcumulado, valorActual) => {
      if(!valorActual.Ingreso && valorActual.Activa) {
        return Number( Number(valorAcumulado) + Number(valorActual.Monto) );
      }
      return valorAcumulado;
    }, 0) * 100)/100;
  }

  cargaMasiva(event: FileList) {
    const file = event.item(0);
    if (file.type.split('/')[1] !== 'csv') {
      console.error('Unsupported file type!!');
    }
    this.transaccionService.cargaMasivaTransaccion(file).then(
      noingresados => {
        if(noingresados.length > 0) {
          let registros: string = '';
          noingresados.forEach( n => {
            registros = registros + n + '\n';
          })
          alert('Registros no ingresados: \n' + registros);
        }
      }
    );
  }
}
