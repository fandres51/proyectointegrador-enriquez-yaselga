import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-filial',
  templateUrl: './filial.component.html',
  styleUrls: ['./filial.component.scss']
})
export class FilialComponent implements OnInit {
  
  idFilial:string;

  iconos = ['store', 'account_box', 'calendar_today', 'attach_money', 'dns'];
  modulos = ['Productos','Proveedores','Alquileres', 'Finanzas','Parametros'];
  rutas:string[];
  

  constructor(
    private route:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.idFilial = this.route.snapshot.params['id'];
    this.rutas = ['filiales/filial/'+this.idFilial+'/productos', 'filiales/filial/'+this.idFilial+'/proveedores', 'filiales/filial/'+this.idFilial+'/finanzas', 'filiales/filial/'+this.idFilial+'/alquileres','filiales/filial/'+this.idFilial+'/parametros'];
    
  }

}
