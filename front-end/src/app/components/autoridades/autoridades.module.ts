import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutoridadesMainComponent } from './autoridades-main/autoridades-main.component';
import { AutoridadesDetalleComponent } from './autoridades-detalle/autoridades-detalle.component';
import { AutoridadesListarComponent } from './autoridades-listar/autoridades-listar.component';
import { MaterialComponentsModule } from 'src/app/material.module';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';



@NgModule({
  declarations: [
    AutoridadesMainComponent, 
    AutoridadesDetalleComponent,
    AutoridadesListarComponent
  ],
  imports: [
    CommonModule,
    MaterialComponentsModule,
    FormsModule,
    AppRoutingModule,
    FlexLayoutModule
  ]
})
export class AutoridadesModule { }
