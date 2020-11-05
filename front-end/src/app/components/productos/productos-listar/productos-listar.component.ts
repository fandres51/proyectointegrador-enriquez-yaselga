import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Producto } from 'src/app/models/producto';

@Component({
  selector: 'app-productos-listar',
  templateUrl: './productos-listar.component.html',
  styleUrls: ['./productos-listar.component.scss']
})
export class ProductosListarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
