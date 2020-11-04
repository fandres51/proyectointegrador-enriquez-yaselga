import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProveedoresMainComponent } from './proveedores-main/proveedores-main.component';
import { ProveedoresCrearComponent } from './proveedores-crear/proveedores-crear.component';
import { ProveedoresEditarComponent } from './proveedores-editar/proveedores-editar.component';



@NgModule({
  declarations: [ProveedoresMainComponent, ProveedoresCrearComponent, ProveedoresEditarComponent],
  imports: [
    CommonModule
  ]
})
export class ProveedoresModule { }
