import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinancieroFiltrosComponent } from './financiero-filtros/financiero-filtros.component';
import { FinancieroMainComponent } from './financiero-main/financiero-main.component';
import { FinancieroListarComponent } from './financiero-listar/financiero-listar.component';
import { FinancieroCrearComponent } from './financiero-crear/financiero-crear.component';
import { MaterialComponentsModule } from 'src/app/material.module';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FinancieroDialogComponent } from './financiero-dialog/financiero-dialog.component';



@NgModule({
  declarations: [ 
    FinancieroFiltrosComponent, 
    FinancieroMainComponent, 
    FinancieroListarComponent, 
    FinancieroCrearComponent, FinancieroDialogComponent],
  imports: [
    CommonModule,
    MaterialComponentsModule,
    FormsModule,
    AppRoutingModule,
    FlexLayoutModule
  ]
})
export class FinancieroModule { }
