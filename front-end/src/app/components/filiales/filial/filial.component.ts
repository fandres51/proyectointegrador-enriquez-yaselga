import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FilialService} from 'src/app/services/filial.service'
import { Filial } from 'src/app/models/filial'

@Component({
  selector: 'app-filial',
  templateUrl: './filial.component.html',
  styleUrls: ['./filial.component.scss']
})
export class FilialComponent implements OnInit {
  
  @Output() private id = new EventEmitter<any>();
  idFilial:string;
  filial:Filial={
    id:"0",
    nombre:""
  };
  iconos = ['store', 'account_box', 'attach_money', 'edit'];
  modulos = ['Productos','Proveedores', 'Finanzas', 'Actualizar'];
  rutas:string[];
  

  constructor(
    private route:ActivatedRoute,
    private filialService:FilialService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.idFilial = this.route.snapshot.params['id'];
    this.filialService.getFilial(this.idFilial).subscribe(item=>{this.filial=item})
    this.rutas = ['filiales/filial/'+this.idFilial+'/productos', 'filiales/filial/'+this.idFilial+'/proveedores', 'filiales/filial/'+this.idFilial+'/financiero', 'filiales/filial/'+this.idFilial+'/alquileres','/filiales/actualizar/'+this.idFilial];
    
  }
  navigate(i) {
    //this.id.emit({idfilialactual: this.filial.id, nombrefilialactual:this.filial.nombre});
    let ruta = this.rutas[i];
    this.router.navigateByUrl(ruta);
  }



}
