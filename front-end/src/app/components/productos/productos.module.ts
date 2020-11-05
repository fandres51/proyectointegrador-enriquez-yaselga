import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductosCrearComponent } from './productos-crear/productos-crear.component';
import { ProductosEditarComponent } from './productos-editar/productos-editar.component';
import { ProductosMainComponent } from './productos-main/productos-main.component';
import { ProductosListarComponent } from './productos-listar/productos-listar.component';
import { ProductosDialogInfoComponent } from './productos-dialog-info/productos-dialog-info.component';



@NgModule({
  declarations: [ProductosCrearComponent, ProductosEditarComponent, ProductosMainComponent, ProductosListarComponent, ProductosDialogInfoComponent],
  imports: [
    CommonModule
  ]
})
export class ProductosModule { }
