import { Component, OnInit } from '@angular/core';
import { Recurso } from 'src/app/models/recurso';
import { RecursosService } from 'src/app/services/recursos.service';

@Component({
  selector: 'app-recursos-main',
  templateUrl: './recursos-main.component.html',
  styleUrls: ['./recursos-main.component.scss']
})
export class RecursosMainComponent implements OnInit {
  
  public recursos:Recurso[]=[];
  public recursosMostrados:Recurso[]=[];

  constructor(public RecursosService:RecursosService) { }

  ngOnInit(): void {
    this.RecursosService.getRecursos().subscribe(recurso =>{
      this.recursos = recurso;
      this.recursosMostrados = recurso;
      console.log(this.recursos);
    });
  }
  
   cargaMasiva(event: FileList) {
    const file = event.item(0);
    if (file.type.split('/')[1] !== 'csv') {
      console.error('¡Formato de archivo no soportado!');
    }
    this.RecursosService.cargaMasivaRecursos(file).then(
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
