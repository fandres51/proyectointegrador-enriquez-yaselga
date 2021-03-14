import { Component, OnInit } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Router } from '@angular/router';
import { Transaccion } from 'src/app/models/transaccion';
import { TransaccionesService } from 'src/app/services/transacciones.service';
import { ActivatedRoute } from '@angular/router';
import { Filial } from 'src/app/models/filial';
import { FilialService } from 'src/app/services/filial.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-financiero-crear',
  templateUrl: './financiero-crear.component.html',
  styleUrls: ['./financiero-crear.component.scss']
})
export class FinancieroCrearComponent implements OnInit {

  idFilial: string;
  filial: Filial = {
    id: "0",
    nombre: ""
  };
  rutaNuevo = "";
  public fecha;

  public transaccion: Transaccion = {
    Monto: 0.05,
    Descripcion: "",
    Fecha: new Date(),
    Ingreso: false,
    Tipo: 'Otro',
    id: "",
    Activa: true,
    FilialID: "",
    FechaIngreso: new Date(),
    PersonaIngreso: ""
  };

  constructor(
    public transaccionService: TransaccionesService,
    private router: Router,
    private route: ActivatedRoute,
    private filialService: FilialService,
    private transaccionesService: TransaccionesService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    if (this.route.snapshot.params['id']) {
      this.transaccion.FilialID = this.idFilial = this.route.snapshot.params['id'];
      this.filialService.getFilial(this.idFilial).subscribe(item => { this.filial = item })
      this.rutaNuevo = "/filiales/filial/" + this.idFilial;
    }
    this.authService.auth.user.subscribe(
      user => {
        this.transaccion.PersonaIngreso = user.displayName;
      },
      error => {
        console.error(error);
      }
    )
  }

  private getTomorrowDate(date:Date): Date {
    const tomorrow = new Date(date)
    tomorrow.setDate(tomorrow.getDate() + 1)
    return tomorrow;
  }

  addTransaccion(transaccion) {
    let newDate = this.getTomorrowDate(new Date(this.fecha));
    this.transaccion.Fecha = newDate;
    this.transaccionService.addTransaccion(transaccion);
    this.router.navigateByUrl(this.rutaNuevo + '/financiero')
  }

  volver() {
    this.router.navigateByUrl(this.rutaNuevo + '/financiero')
  }

}
