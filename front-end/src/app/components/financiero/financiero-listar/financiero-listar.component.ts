import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Transaccion } from 'src/app/models/transaccion';
import { FinancieroDialogComponent } from '../financiero-dialog/financiero-dialog.component';

@Component({
  selector: 'app-financiero-listar',
  templateUrl: './financiero-listar.component.html',
  styleUrls: ['./financiero-listar.component.scss']
})
export class FinancieroListarComponent implements OnInit {


  @Input() set _transacciones(transacciones: Transaccion[]) {
    //console.log(">>>>recibe:",transacciones);
    this.transacciones = transacciones;
    this.changePagination();
  }

  private pageIndex: number = 0;
  private pageSize: number = 9;
  public transaccionesPaginadas: Transaccion[];
  public transacciones: Transaccion[] = [];

  constructor(
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void { }

  public openDialog(index:number):void {
    const dialogRef = this.dialog.open( FinancieroDialogComponent, {
      width: '500px',
      data: this.transacciones[index]
    });
    dialogRef.afterClosed().subscribe(result => {
      //console.log('The dialog was closed');
    },
    error => {
      console.error(error);
    })
  } 

  onPageChange($event) {
    this.pageIndex = $event.pageIndex;
    this.pageSize = $event.pageSize;
    this.changePagination();
  }
  
  changePagination() {
    this.transaccionesPaginadas = this.transacciones.slice(this.pageIndex*this.pageSize, this.pageIndex*this.pageSize + this.pageSize);
  }

}
