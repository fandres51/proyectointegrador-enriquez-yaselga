import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstudiantesMainComponent } from './estudiantes-main/estudiantes-main.component';
import { EstudiantesFiltrosComponent } from './estudiantes-filtros/estudiantes-filtros.component';
import { EstudiantesListarComponent } from './estudiantes-listar/estudiantes-listar.component';
import { EstudiantesDialogInfoComponent } from './estudiantes-dialog-info/estudiantes-dialog-info.component';
import { EstudiantesActualizacionComponent } from './estudiantes-actualizacion/estudiantes-actualizacion.component';
import { EstudiantesAfiliacionComponent } from './estudiantes-afiliacion/estudiantes-afiliacion.component';
import { MaterialComponentsModule } from 'src/app/material.module';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    EstudiantesMainComponent, 
    EstudiantesFiltrosComponent, 
    EstudiantesListarComponent, 
    EstudiantesDialogInfoComponent, 
    EstudiantesActualizacionComponent, 
    EstudiantesAfiliacionComponent
  ],
  imports: [
    CommonModule,
    MaterialComponentsModule,
    FormsModule,
    AppRoutingModule,
    FlexLayoutModule
  ]
})
export class EstudiantesModule { }
