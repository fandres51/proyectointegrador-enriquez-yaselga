import { Component, OnInit } from '@angular/core';
import { Filial } from 'src/app/models/filial';
import { FilialService } from 'src/app/services/filial.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-filiales-editar',
  templateUrl: './filiales-editar.component.html',
  styleUrls: ['./filiales-editar.component.scss']
})
export class FilialesEditarComponent implements OnInit {

  filial: Filial;

  constructor(
    private filialService:FilialService,
    private route:ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.filial={
      id:'',
      nombre:'',
      descripcion:'',
      ubicacion:''
    }
    this.route.params.subscribe(params =>{
      const noUnicoParam = params['id'];
      this.filialService.getFilial(noUnicoParam).subscribe(
        recurso=>{
          if(recurso!=null){
            this.filial=recurso;
          }else{
            console.log("Error: no fue posible cargar la filial")
          }
        },
        error =>{
          console.error(error);
        }
      )
    },
    error=>{
      console.error(error);
    }
    );
  }

  guardar(){
    
    this.filialService.updateFilial(this.filial);
    this.router.navigateByUrl('/filiales')
  }

}
