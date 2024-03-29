import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatRipple } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { Recurso } from 'src/app/models/recurso';
import { RecursosService } from 'src/app/services/recursos.service';
import { RecursosAlquilerComponent } from '../recursos-alquiler/recursos-alquiler.component';
import { RecursosDialogInfoComponent } from '../recursos-dialog-info/recursos-dialog-info.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recursos-listar',
  templateUrl: './recursos-listar.component.html',
  styleUrls: ['./recursos-listar.component.scss']
})
export class RecursosListarComponent implements OnInit {
  
  public actualStart: number = 0;
  public recursos: Recurso[]=[];

  @Input() set _recursos(recursos: Recurso[]){    
    this.recursos = recursos;
    this.changePagination();
  }
  private pageIndex: number = 0;
  private pageSize: number = 9;
  public recursosPaginados: Recurso[];

  idFilial: string;

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
  ) { }
  

  ngOnInit(): void {
    if (this.route.snapshot.params['id']) {
      this.idFilial = this.route.snapshot.params['id'];      
    }
  }

  public openDialog(index:number):void {
    const dialogRef = this.dialog.open( RecursosDialogInfoComponent, {
      width: '500px',
      data: this.recursos[index]
    });
    dialogRef.afterClosed().subscribe(result => {
      //console.log('The dialog was closed');
    })
  } 
  public openDialogRent(index:number):void {
    const dialogRef = this.dialog.open( RecursosAlquilerComponent, {
      width: '500px',
      data: {recursos: this.recursos[index], idfilial:this.idFilial}
      
    });
    console.log("Pasa idfilial: ",this.idFilial);
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
    this.recursosPaginados = this.recursos.slice(this.pageIndex*this.pageSize, this.pageIndex*this.pageSize + this.pageSize);
  }
  
}


