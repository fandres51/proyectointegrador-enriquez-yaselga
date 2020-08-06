import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiltrosComponent } from './filtros/filtros.component';
import { FinancieroFiltrosComponent } from './financiero-filtros/financiero-filtros.component';
import { FinancieroMainComponent } from './financiero-main/financiero-main.component';
import { FinancieroListarComponent } from './financiero-listar/financiero-listar.component';
import { FinancieroCrearComponent } from './financiero-crear/financiero-crear.component';



@NgModule({
  declarations: [FiltrosComponent, FinancieroFiltrosComponent, FinancieroMainComponent, FinancieroListarComponent, FinancieroCrearComponent],
  imports: [
    CommonModule
  ]
})
export class FinancieroModule { }
