import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialComponentsModule } from 'src/app/material.module';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RecursosMainComponent } from './recursos-main/recursos-main.component';
import { RecursosListarComponent } from './recursos-listar/recursos-listar.component'
import { RecursosDialogInfoComponent } from './recursos-dialog-info/recursos-dialog-info.component';
import { RecursosFiltrosComponent } from './recursos-filtros/recursos-filtros.component';
import { RecursosActualizacionComponent } from './recursos-actualizacion/recursos-actualizacion.component';
import { RecursoNuevoComponent } from './recurso-nuevo/recurso-nuevo.component'


@NgModule({
  declarations: [ 
      RecursosMainComponent, 
      RecursosListarComponent, 
      RecursosDialogInfoComponent, RecursosFiltrosComponent, RecursosActualizacionComponent, RecursoNuevoComponent,
    ],
  imports: [
    CommonModule,
    MaterialComponentsModule,
    FormsModule,
    AppRoutingModule,
    FlexLayoutModule
  ]
})
export class RecursosModule { }
