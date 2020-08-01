import { Component, OnInit } from '@angular/core';
import { Recurso } from '../../models/recurso';
import { RecursosService } from 'src/app/services/recursos.service';

@Component({
  selector: 'app-recursos',
  templateUrl: './recursos.component.html',
  styleUrls: ['./recursos.component.scss']
})
export class RecursosComponent implements OnInit {

  public recursos:Recurso[]=[];
  public recursosMostrados:Recurso[]=[];

  constructor(public RecursosServicie:RecursosService) { }

  ngOnInit(): void {
    this.RecursosServicie.readRecurso().subscribe(recurso =>{
        this.recursos = recurso;
        this.recursosMostrados = recurso;
        console.log(this.recursos);
      }
    )
  }

}
