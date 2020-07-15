import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainScreenComponent } from './components/layouts/main-screen/main-screen.component';
import { AjustesComponent } from './components/ajustes/ajustes.component';
import { DefinirCargosComponent } from './components/ajustes/definir-cargos/definir-cargos.component';
import { CambiarAsociacionComponent } from './components/ajustes/cambiar-asociacion/cambiar-asociacion.component';
import { PageNotFoundComponent } from './components/layouts/page-not-found/page-not-found.component';
import { EstudiantesMainComponent } from './components/estudiantes/estudiantes-main/estudiantes-main.component';
import { EstudiantesActualizacionComponent } from './components/estudiantes/estudiantes-actualizacion/estudiantes-actualizacion.component';
import { EstudiantesAfiliacionComponent } from './components/estudiantes/estudiantes-afiliacion/estudiantes-afiliacion.component';


const routes: Routes = [
  { path: '', component: MainScreenComponent },
  { path: '**', component: PageNotFoundComponent },
  { path: 'estudiantes', component: EstudiantesMainComponent, children: [
    { path: 'actualizar/:id', component: EstudiantesActualizacionComponent },
    { path: 'afiliar/:id', component: EstudiantesAfiliacionComponent },
  ]},
  { path: 'ajustes', component: AjustesComponent, children: [
      { path: 'definir-cargos', component: DefinirCargosComponent },
      { path: 'cambiar-asociacion', component: CambiarAsociacionComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
