import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductosCrearComponent } from './productos-crear/productos-crear.component';
import { ProductosEditarComponent } from './productos-editar/productos-editar.component';
import { ProductosMainComponent } from './productos-main/productos-main.component';



@NgModule({
  declarations: [ProductosCrearComponent, ProductosEditarComponent, ProductosMainComponent],
  imports: [
    CommonModule
  ]
})
export class ProductosModule { }
