import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { Transaccion } from 'src/app/models/transaccion';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogComponent } from '../../estudiantes/dialog/dialog.component';

@Component({
  selector: 'app-listar-financiero',
  templateUrl: './listar-financiero.component.html',
  styleUrls: ['./listar-financiero.component.scss']
})
export class ListarFinancieroComponent implements OnInit {

  @Input() public transacciones: Transaccion[] = [];

  constructor(
    public dialog: MatDialog,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }
}
