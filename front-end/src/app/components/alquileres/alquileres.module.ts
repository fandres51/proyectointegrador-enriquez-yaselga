import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlquileresMainComponent } from './alquileres-main/alquileres-main.component';
import { AlquileresCrearComponent } from './alquileres-crear/alquileres-crear.component';
import { AlquileresEditarComponent } from './alquileres-editar/alquileres-editar.component';



@NgModule({
  declarations: [AlquileresMainComponent, AlquileresCrearComponent, AlquileresEditarComponent],
  imports: [
    CommonModule
  ]
})
export class AlquileresModule { }
