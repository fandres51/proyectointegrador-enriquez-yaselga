import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AjustesMainComponent } from './ajustes-main/ajustes-main.component';
import { AjustesNuevoSemestreComponent } from './ajustes-nuevo-semestre/ajustes-nuevo-semestre.component';
import { MaterialComponentsModule } from 'src/app/material.module';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AjustesConsultarAsociacionComponent } from './ajustes-consultar-asociacion/ajustes-consultar-asociacion.component';
import { AjustesDefinirAporteComponent } from './ajustes-definir-aporte/ajustes-definir-aporte.component';



@NgModule({
  declarations: [AjustesMainComponent, AjustesNuevoSemestreComponent, AjustesConsultarAsociacionComponent, AjustesDefinirAporteComponent],
  imports: [
    CommonModule,
    MaterialComponentsModule,
    FormsModule,
    AppRoutingModule,
    FlexLayoutModule
  ]
})
export class AjustesModule { }
