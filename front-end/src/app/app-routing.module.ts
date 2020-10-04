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
import { EventosCrearComponent } from './components/eventos/eventos-crear/eventos-crear.component';
import { FinancieroMainComponent } from './components/financiero/financiero-main/financiero-main.component';
import { FinancieroCrearComponent } from './components/financiero/financiero-crear/financiero-crear.component';
import { EventosEditarComponent } from './components/eventos/eventos-editar/eventos-editar.component';
import { AjustesConsultarAsociacionComponent } from './components/ajustes/ajustes-consultar-asociacion/ajustes-consultar-asociacion.component';
import { AjustesDefinirAporteComponent } from './components/ajustes/ajustes-definir-aporte/ajustes-definir-aporte.component';
import { EleccionesMainComponent } from './components/elecciones/elecciones-main/elecciones-main.component';
import { EleccionesDetalleComponent } from './components/elecciones/elecciones-detalle/elecciones-detalle.component';
import { EleccionesListaComponent } from './components/elecciones/elecciones-lista/elecciones-lista.component';

const routes: Routes = [
  { path: '', component: MainScreenComponent },
  { path: 'estudiantes', component: EstudiantesMainComponent },
  { path: 'estudiantes/actualizar/:id', component: EstudiantesActualizacionComponent },
  { path: 'estudiantes/afiliar/:id', component: EstudiantesAfiliacionComponent },
  { path: 'autoridades', component: AutoridadesMainComponent },
  { path: 'eventos', component: EventosMainComponent },
  { path: 'eventos/info/:id', component: EventosInfoComponent },
  { path: 'eventos/nuevo', component: EventosCrearComponent },
  { path: 'eventos/actualizar/:id', component: EventosEditarComponent },
  { path: 'financiero', component: FinancieroMainComponent },
  { path: 'financiero/nuevo', component: FinancieroCrearComponent },
  { path: 'elecciones', component: EleccionesMainComponent },
  { path: 'elecciones/:eleccion/:lista', component: EleccionesListaComponent },
  { path: 'elecciones/:id', component: EleccionesDetalleComponent },
  { path: 'ajustes', component: AjustesMainComponent, children: [
    { path: 'nuevo-semestre', component: AjustesNuevoSemestreComponent },
    { path: 'cambiar-asociacion', component: AjustesCambiarAsociacionComponent },
    { path: 'consultar-asociacion', component: AjustesConsultarAsociacionComponent },
    { path: 'definir-aporte', component: AjustesDefinirAporteComponent }
  ]},
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
