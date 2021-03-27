import { Component, OnInit } from '@angular/core';
import { Recurso } from 'src/app/models/recurso';
import { RecursosService } from 'src/app/services/recursos.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Filial } from 'src/app/models/filial';
import { FilialService } from 'src/app/services/filial.service';

@Component({
  selector: 'app-recursos-main',
  templateUrl: './recursos-main.component.html',
  styleUrls: ['./recursos-main.component.scss']
})
export class RecursosMainComponent implements OnInit {
  
  public recursos:Recurso[]=[];
  public recursosMostrados:Recurso[]=[];
  idFilial:string='';
  filial:Filial={
    id:"0",
    nombre:""
  };
  rutaNuevo="";
  constructor(
    public RecursosService:RecursosService,
    private route:ActivatedRoute,
    private filialService:FilialService,
    private readonly router: Router
    ) { }

  ngOnInit(): void {
    this.RecursosService.getRecursos().subscribe(recurso =>{
      this.recursos = recurso;
      this.recursosMostrados = recurso;
      if(this.route.snapshot.params['id']){
        this.idFilial = this.route.snapshot.params['id'];
        this.filialService.getFilial(this.idFilial).subscribe(item=>{this.filial=item})
        //this.rutaNuevo="/filiales/filial/"+this.idFilial+"/recurso/nuevo";
      }
      //console.log(this.recursos);
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
    this.RecursosService.cargaMasivaRecursos(file, this.idFilial).then(
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
