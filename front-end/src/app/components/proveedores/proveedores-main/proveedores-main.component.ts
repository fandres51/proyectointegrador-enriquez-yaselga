import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Filial } from 'src/app/models/filial';
import { Proveedor } from 'src/app/models/proveedor';
import { FilialService } from 'src/app/services/filial.service';
import { ProveedoresService } from 'src/app/services/proveedores.service';


@Component({
  selector: 'app-proveedores-main',
  templateUrl: './proveedores-main.component.html',
  styleUrls: ['./proveedores-main.component.scss']
})
export class ProveedoresMainComponent implements OnInit {

  public proveedores:Proveedor[]=[];
  public proveedoresMostrados:Proveedor[]=[];
  idFilial:string;
  filial:Filial={
    id:"0",
    nombre:""
  };
  constructor(
    private route:ActivatedRoute,
    private proveedoresService:ProveedoresService,
    private filialService:FilialService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.idFilial = this.route.snapshot.params['id'];
    this.filialService.getFilial(this.idFilial).subscribe(item=>{this.filial=item})
    this.proveedoresService.getProveedores(this.idFilial).subscribe(proveedor =>{
      this.proveedores = proveedor;
      this.proveedoresMostrados = proveedor;
      ////console.log(this.proveedores);
    });
  }
  
  return() {
    this.router.navigate(['/filiales','filial',this.idFilial]);
  }

   cargaMasiva(event: FileList) {
    const file = event.item(0);
    if (file.type.split('/')[1] !== 'csv') {
      console.error('¡Formato de archivo no soportado!');
    }
    this.proveedoresService.cargaMasivaProveedores(file, this.idFilial).then(
      eni => {
        if(eni.length > 0) {
          let registros: string = '';
          eni.forEach( n => {
            registros = registros + n + '\n';
          })
          alert('Registros no ingresados: \n' + registros);
        }
      }
    ); 
  } 
  


}
