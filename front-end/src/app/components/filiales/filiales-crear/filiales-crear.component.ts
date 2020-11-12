import { Component, OnInit } from '@angular/core';
import { Filial } from 'src/app/models/filial';
import { FilialService } from 'src/app/services/filial.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-filiales-crear',
  templateUrl: './filiales-crear.component.html',
  styleUrls: ['./filiales-crear.component.scss']
})
export class FilialesCrearComponent implements OnInit {

  filial: Filial;
  
  constructor(
    private filialService:FilialService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.filial={
      id:'',
      nombre:'',
      descripcion:'',
      ubicacion:''
    }
  }

  nuevo(){
    this.filialService.addFilial(this.filial);
    this.router.navigateByUrl('/filiales')
  }

}
