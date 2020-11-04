import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilialesMainComponent } from './filiales-main/filiales-main.component';
import { FilialesCrearComponent } from './filiales-crear/filiales-crear.component';
import { FilialesEditarComponent } from './filiales-editar/filiales-editar.component';
import { FilialComponent } from './filial/filial.component';



@NgModule({
  declarations: [FilialesMainComponent, FilialesCrearComponent, FilialesEditarComponent, FilialComponent],
  imports: [
    CommonModule
  ]
})
export class FilialesModule { }
