import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainScreenComponent } from './components/layouts/main-screen/main-screen.component';
import { PageNotFoundComponent } from './components/layouts/page-not-found/page-not-found.component';
import { EstudiantesMainComponent } from './components/estudiantes/estudiantes-main/estudiantes-main.component';
import { EstudiantesActualizacionComponent } from './components/estudiantes/estudiantes-actualizacion/estudiantes-actualizacion.component';
import { EstudiantesAfiliacionComponent } from './components/estudiantes/estudiantes-afiliacion/estudiantes-afiliacion.component';
import { AutoridadesMainComponent } from './components/autoridades/autoridades-main/autoridades-main.component';
import { AjustesMainComponent } from './components/ajustes/ajustes-main/ajustes-main.component';
import { AjustesNuevoSemestreComponent } from './components/ajustes/ajustes-nuevo-semestre/ajustes-nuevo-semestre.component';
import { AjustesCambiarAsociacionComponent } from './components/ajustes/ajustes-cambiar-asociacion/ajustes-cambiar-asociacion.component';
import { EventosMainComponent } from './components/eventos/eventos-main/eventos-main.component';
import { EventosInfoComponent } from './components/eventos/eventos-info/eventos-info.component';


const routes: Routes = [
  { path: '', component: MainScreenComponent },
  { path: 'estudiantes', component: EstudiantesMainComponent },
  { path: 'estudiantes/actualizar/:id', component: EstudiantesActualizacionComponent },
  { path: 'estudiantes/afiliar/:id', component: EstudiantesAfiliacionComponent },
  { path: 'autoridades', component: AutoridadesMainComponent },
  { path: 'eventos', component: EventosMainComponent },
  { path: 'eventos/info/:id', component: EventosInfoComponent },
  { path: 'ajustes', component: AjustesMainComponent, children: [
    { path: 'nuevo-semestre', component: AjustesNuevoSemestreComponent },
    { path: 'cambiar-asociacion', component: AjustesCambiarAsociacionComponent }
  ]},
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
