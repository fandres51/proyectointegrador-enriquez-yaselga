import { Component, OnInit } from '@angular/core';
import { Proveedor } from 'src/app/models/proveedor';
import { ProveedoresService } from 'src/app/services/proveedores.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-proveedores-crear',
  templateUrl: './proveedores-crear.component.html',
  styleUrls: ['./proveedores-crear.component.scss']
})
export class ProveedoresCrearComponent implements OnInit {
  proveedor: Proveedor
  idFilial:string;

  constructor(
    private proveedoresService:ProveedoresService,
    private route:ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.idFilial = this.route.snapshot.params['id'];
    this.proveedor ={
      id:"",
      nombre:"",
      estado:false,
      contacto:"",
    }
  }
  nuevo(){
    this.proveedoresService.addProveedor(this.proveedor,this.idFilial);
    this.router.navigateByUrl('/filiales/filial/'+this.idFilial+'/proveedores')
  }

}
