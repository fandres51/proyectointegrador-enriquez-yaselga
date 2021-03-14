import { Component, OnInit, Input } from '@angular/core';
import { Recurso } from '../../../models/recurso';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-recurso',
  templateUrl: './recurso.component.html',
  styleUrls: ['./recurso.component.scss']
})
export class RecursoComponent implements OnInit {
  

  @Input() public recursos: Recurso[] = [];

  constructor(
    public dialog: MatDialog,
    ) { }

  ngOnInit(): void {
    
  }
  /* public openDialog(index:number):void {
    const dialogRef = this.dialog.open(detalle-recurso, {
      width: '500px',
      data: this.recursos[index]
    });
    dialogRef.afterClosed().subscribe(result => {
      //console.log('The dialog was closed');
    })
  }  */
}
