import { Component, OnInit } from '@angular/core';
import { Proveedor } from 'src/app/models/proveedor';
import { ProveedoresService } from 'src/app/services/proveedores.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-proveedores-editar',
  templateUrl: './proveedores-editar.component.html',
  styleUrls: ['./proveedores-editar.component.scss']
})
export class ProveedoresEditarComponent implements OnInit {
  proveedor: Proveedor;
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
    this.route.params.subscribe(params =>{
      ////console.log(">>>idproveedor>>>: ",params['idproveedor']);
      ////console.log(">>>idFilial>>>: ", this.idFilial);
      const noUnicoParam = params['idproveedor'];
      this.proveedoresService.getProveedor(noUnicoParam, this.idFilial).subscribe(recurso =>{
        if(recurso!=null){
          ////console.log("Recurso : ", recurso);
          this.proveedor = recurso;
        }
        else{
          //console.log("no hay recurso disponible: ", recurso);
        }
        
      },
      error => {
        console.error(error);
      })
    },
    error => {
      console.error(error);
    });

  }
  guardar(){
    this.proveedoresService.updateProveedor(this.proveedor,this.idFilial);
    this.router.navigateByUrl('/filiales/filial/'+this.idFilial+'/proveedores'); 
  }

}
