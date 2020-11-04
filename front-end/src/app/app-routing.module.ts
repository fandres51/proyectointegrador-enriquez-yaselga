import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainScreenComponent } from './components/layouts/main-screen/main-screen.component';
import { PageNotFoundComponent } from './components/layouts/page-not-found/page-not-found.component';
import { EstudiantesMainComponent } from './components/estudiantes/estudiantes-main/estudiantes-main.component';
import { EstudiantesActualizacionComponent } from './components/estudiantes/estudiantes-actualizacion/estudiantes-actualizacion.component';
import { EstudiantesAfiliacionComponent } from './components/estudiantes/estudiantes-afiliacion/estudiantes-afiliacion.component';
import { AutoridadesMainComponent } from './components/autoridades/autoridades-main/autoridades-main.component';
import { AjustesMainComponent } from './components/ajustes/ajustes-main/ajustes-main.component';
import { AjustesNuevoSemestreComponent } from './components/ajustes/ajustes-nuevo-semestre/ajustes-nuevo-semestre.component';
import { EventosMainComponent } from './components/eventos/eventos-main/eventos-main.component';
import { EventosCrearComponent } from './components/eventos/eventos-crear/eventos-crear.component';
import { FinancieroMainComponent } from './components/financiero/financiero-main/financiero-main.component';
import { FinancieroCrearComponent } from './components/financiero/financiero-crear/financiero-crear.component';
import { EventosEditarComponent } from './components/eventos/eventos-editar/eventos-editar.component';
import { AjustesConsultarAsociacionComponent } from './components/ajustes/ajustes-consultar-asociacion/ajustes-consultar-asociacion.component';
import { AjustesDefinirAporteComponent } from './components/ajustes/ajustes-definir-aporte/ajustes-definir-aporte.component';
import { EleccionesMainComponent } from './components/elecciones/elecciones-main/elecciones-main.component';
import { EleccionesDetalleComponent } from './components/elecciones/elecciones-detalle/elecciones-detalle.component';
import { EleccionesListaComponent } from './components/elecciones/elecciones-lista/elecciones-lista.component';
import { AutoridadFormComponent } from './components/elecciones/autoridad-form/autoridad-form.component';
import { AutoridadEditComponent } from './components/elecciones/autoridad-edit/autoridad-edit.component';
import { ContratosMainComponent } from './components/contratos/contratos-main/contratos-main.component';
import { ContratosDetalleComponent } from './components/contratos/contratos-detalle/contratos-detalle.component';
import { ContratosNuevoComponent } from './components/contratos/contratos-nuevo/contratos-nuevo.component';
import { IncidentesMainComponent } from './components/incidentes/incidentes-main/incidentes-main.component';
import { IncidentesCrearComponent } from './components/incidentes/incidentes-crear/incidentes-crear.component';
import { EditarAutoridadesComponent } from './components/ajustes/editar-autoridades/editar-autoridades.component';
import { EditarAutoridadFormComponent } from './components/ajustes/editar-autoridad-form/editar-autoridad-form.component';
import { NotificacionesMainComponent } from './components/notificaciones/notificaciones-main/notificaciones-main.component';
import { NotificacionesCrearComponent } from './components/notificaciones/notificaciones-crear/notificaciones-crear.component';
import { NotificacionesEditComponent } from './components/notificaciones/notificaciones-edit/notificaciones-edit.component';
import { EstudiantesGuard } from './services/guards/estudiantes.guard';
import { AutoridadesGuard } from './services/guards/autoridades.guard';
import { EventosGuard } from './services/guards/eventos.guard';
import { FinancieroGuard } from './services/guards/financiero.guard';
import { EleccionesGuard } from './services/guards/elecciones.guard';
import { ContratosGuard } from './services/guards/contratos.guard';
import { IncidentesGuard } from './services/guards/incidentes.guard';
import { NotificacionesGuard } from './services/guards/notificaciones.guard';
import { AjustesGuard } from './services/guards/ajustes.guard';
import { CrearPermisoComponent } from './components/ajustes/crear-permiso/crear-permiso.component';
import { RecursosMainComponent } from './components/recursos/recursos-main/recursos-main.component';
import { RecursoNuevoComponent } from './components/recursos/recurso-nuevo/recurso-nuevo.component';
import { RecursosActualizacionComponent } from './components/recursos/recursos-actualizacion/recursos-actualizacion.component';
import { RecursosGuard } from './services/guards/recursos.guard';
import { FilialesMainComponent } from './components/filiales/filiales-main/filiales-main.component';
import { FilialesEditarComponent } from './components/filiales/filiales-editar/filiales-editar.component';
import { FilialesCrearComponent } from './components/filiales/filiales-crear/filiales-crear.component';
import { FilialesGuard } from './services/guards/filiales.guard';

const routes: Routes = [
  { path: '', component: MainScreenComponent },
  { path: 'estudiantes', component: EstudiantesMainComponent, canActivate: [EstudiantesGuard] },
  { path: 'estudiantes/actualizar/:id', component: EstudiantesActualizacionComponent, canActivate: [EstudiantesGuard]  },
  { path: 'estudiantes/afiliar/:id', component: EstudiantesAfiliacionComponent, canActivate: [EstudiantesGuard]  },
  { path: 'autoridades', component: AutoridadesMainComponent, canActivate: [AutoridadesGuard] },
  { path: 'eventos', component: EventosMainComponent, canActivate: [EventosGuard] },
  { path: 'eventos/nuevo', component: EventosCrearComponent, canActivate: [EventosGuard] },
  { path: 'eventos/actualizar/:id', component: EventosEditarComponent, canActivate: [EventosGuard] },
  { path: 'financiero', component: FinancieroMainComponent, canActivate: [FinancieroGuard] },
  { path: 'financiero/nuevo', component: FinancieroCrearComponent, canActivate: [FinancieroGuard] },
  { path: 'elecciones', component: EleccionesMainComponent, canActivate: [EleccionesGuard] },
  { path: 'elecciones/:eleccion/:lista', component: EleccionesListaComponent, canActivate: [EleccionesGuard] },
  { path: 'elecciones/:eleccion/:lista/crear', component: AutoridadFormComponent, canActivate: [EleccionesGuard] },
  { path: 'elecciones/:eleccion/:lista/:dignidad', component: AutoridadEditComponent, canActivate: [EleccionesGuard] },
  { path: 'elecciones/:id', component: EleccionesDetalleComponent, canActivate: [EleccionesGuard] },
  { path: 'incidentes', component: IncidentesMainComponent, canActivate: [IncidentesGuard] },
  { path: 'incidentes/nuevo', component: IncidentesCrearComponent },
  { path: 'contratos', component: ContratosMainComponent, canActivate: [ContratosGuard] },
  { path: 'contratos/nuevo', component: ContratosNuevoComponent, canActivate: [ContratosGuard] },
  { path: 'contratos/:contrato', component: ContratosDetalleComponent, canActivate: [ContratosGuard] },
  // { path: 'notificaciones', component: NotificacionesMainComponent, canActivate: [NotificacionesGuard] },
  // { path: 'notificaciones/nuevo', component: NotificacionesCrearComponent, canActivate: [NotificacionesGuard] },
  // { path: 'notificaciones/editar/:nombre', component: NotificacionesEditComponent, canActivate: [NotificacionesGuard] },
  { path: 'recursos',component: RecursosMainComponent }, 
  { path: 'recursos/nuevo', component: RecursoNuevoComponent, canActivate: [RecursosGuard] },
  { path: 'recursos/actualizar/:id', component: RecursosActualizacionComponent, canActivate: [RecursosGuard] },
  { path: 'filiales', component: FilialesMainComponent, canActivate: [FilialesGuard] },
  { path: 'filiales/nuevo', component: FilialesCrearComponent, canActivate: [FilialesGuard] },
  { path: 'filiales/actualizar/:id', component: FilialesEditarComponent, canActivate: [FilialesGuard] },
  { path: 'ajustes', component: AjustesMainComponent, children: [
    { path: 'nuevo-semestre', component: AjustesNuevoSemestreComponent },
    { path: 'consultar-asociacion', component: AjustesConsultarAsociacionComponent },
    { path: 'definir-aporte', component: AjustesDefinirAporteComponent },
    { path: 'editar-autoridades', component: EditarAutoridadesComponent },
    { path: 'crear-permiso', component: CrearPermisoComponent },
    { path: ':cargo', component: EditarAutoridadFormComponent }
  ], canActivate: [AjustesGuard] },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
