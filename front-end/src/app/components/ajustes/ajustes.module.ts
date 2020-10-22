import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AjustesMainComponent } from './ajustes-main/ajustes-main.component';
import { AjustesCambiarAsociacionComponent } from './ajustes-cambiar-asociacion/ajustes-cambiar-asociacion.component';
import { AjustesNuevoSemestreComponent } from './ajustes-nuevo-semestre/ajustes-nuevo-semestre.component';



@NgModule({
  declarations: [AjustesMainComponent, AjustesCambiarAsociacionComponent, AjustesNuevoSemestreComponent],
  imports: [
    CommonModule
  ]
})
export class AjustesModule { }
