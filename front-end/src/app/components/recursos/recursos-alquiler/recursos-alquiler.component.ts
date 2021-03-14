import { Input } from '@angular/core';
import { Component, Inject, OnInit, Output ,EventEmitter} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Filial } from 'src/app/models/filial';
import { FilialService } from 'src/app/services/filial.service';
import { Recurso } from 'src/app/models/recurso';
import { MatDialog } from '@angular/material/dialog';
import { RecursosService } from 'src/app/services/recursos.service';
import { Transaccion } from 'src/app/models/transaccion';
import { TransaccionesService } from 'src/app/services/transacciones.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-recursos-alquiler',
  templateUrl: './recursos-alquiler.component.html',
  styleUrls: ['./recursos-alquiler.component.scss']
})
export class RecursosAlquilerComponent implements OnInit {
  
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
    Ingreso: true,
    Tipo: 'Alquiler',
    id: "",
    Activa: true,
    FilialID: "",
    FechaIngreso: new Date(),
    PersonaIngreso: ""
  };
  public recursos: Recurso[]=[];

  @Input() set _recursos(data){    
    this.recursos = data.recursos;
    this.idFilial= data.idfilial;
  }

  @Output() public recursosAEditarEmitter = new EventEmitter();
  public recursoAEditar: Recurso;
  public recursoAFiltrar: Recurso;
  public dateString: String="";

  Estados: string[] = ['Libre','Ocupado','Alquilado','Reservado','Baja','Reparacion'];
  Condiciones: ['Nuevo','Usado','Averiado','Perdido'];
  filiales: Filial[];
  filialRecurso: string;
  
  constructor(
    public dialogRef: MatDialogRef<RecursosAlquilerComponent>,
    public recursosService: RecursosService,
    @Inject(MAT_DIALOG_DATA) public data ,
    
    private filialService: FilialService,
    public dialog: MatDialog,
    public transaccionService: TransaccionesService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    console.log("data: ",this.data);
    
    this.idFilial= this.data.idfilial
    if (this.data.idfilial!=undefined) {
      this.transaccion.FilialID = this.idFilial;
      this.filialService.getFilial(this.idFilial).subscribe(item => { this.filial = item })
      this.rutaNuevo = "/filiales/filial/" + this.idFilial;
      console.log("Entra IF: ",this.idFilial);
    }
    else{
      console.log("No Entra IF: ",this.idFilial);
    }
    
    this.filialService.getFiliales().subscribe(
      filiales => {
        this.filiales = filiales;
        filiales.forEach(element => {
          if(this.data.recursos.idfilial.localeCompare(element.id)==0){
            this.filialRecurso = element.nombre;
          }
        });
      },
      error => {
        console.error(error);
      } 
    )
    
    this.authService.auth.user.subscribe(
      user => {
        this.transaccion.PersonaIngreso = user.displayName;
      },
      error => {
        console.error(error);
      }
    )
  }

  addTransaccion(transaccion) {
    this.transaccion.Fecha = new Date(this.fecha);
    if(this.idFilial){
      this.transaccion.FilialID=this.idFilial;
    }
    this.transaccionService.addTransaccion(transaccion);
    console.log("Entra IF: ",this.idFilial);
    this.cerrarDialog();
    //console.log("regresa");
  }

  volver() {
    this.router.navigateByUrl(this.rutaNuevo + '/recursos')
    this.cerrarDialog();
  }
  cerrarDialog() {
    this.dialogRef.close();
  }

}
