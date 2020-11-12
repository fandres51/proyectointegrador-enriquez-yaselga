import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Filial } from 'src/app/models/filial';
import { Proveedor } from 'src/app/models/proveedor';
import { FilialService } from 'src/app/services/filial.service';
import { ProveedoresDialogInfoComponent } from '../proveedores-dialog-info/proveedores-dialog-info.component';

@Component({
  selector: 'app-proveedores-listar',
  templateUrl: './proveedores-listar.component.html',
  styleUrls: ['./proveedores-listar.component.scss']
})
export class ProveedoresListarComponent implements OnInit {

  public actualStart: number = 0;
  public proveedores: Proveedor[]=[];
  idFilial:string;
  filial:Filial={
    id:"0",
    nombre:""
  };

  //@Input() _idFilial 

  @Input() set _proveedores(proveedores: Proveedor[]){    
    this.proveedores = proveedores;
    this.changePagination();
  }
  private pageIndex: number = 0;
  private pageSize: number = 9;
  public proveedoresPaginados: Proveedor[];

  constructor(
    public dialog: MatDialog,
    private route:ActivatedRoute,
    private filialService:FilialService,
  ) { }
  

  ngOnInit(): void {
    this.idFilial = this.route.snapshot.params['id'];
    this.filialService.getFilial(this.idFilial).subscribe(item=>{this.filial=item})
  }

  public openDialog(index:number, filial:string):void {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      proveedor: this.proveedores[index], 
      id:filial
    };

    const dialogRef = this.dialog.open(ProveedoresDialogInfoComponent, {
      data:{
        proveedor: this.proveedores[index], 
        id:filial
      }
    });

     /* const dialogRef = this.dialog.open( ProveedoresDialogInfoComponent, {
      width: '500px',
      data: this.proveedores[index]
    }); */ 
    dialogRef.afterClosed().subscribe(result => {
      //console.log('The dialog was closed');
    })
  } 

  onPageChange($event) {
    this.pageIndex = $event.pageIndex;
    this.pageSize = $event.pageSize;
    this.changePagination();
  }
  changePagination() {
    this.proveedoresPaginados = this.proveedores.slice(this.pageIndex*this.pageSize, this.pageIndex*this.pageSize + this.pageSize);
  }
  
}


