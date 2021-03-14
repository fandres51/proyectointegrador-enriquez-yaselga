import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/Auth/login/login.component';
import { HeaderComponent } from './components/templates/header/header.component';
import { MainScreenComponent } from './components/templates/main-screen/main-screen.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { MaterialComponentsModule } from './material.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FlatpickrModule } from 'angularx-flatpickr';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { PageNotFoundComponent } from './components/templates/page-not-found/page-not-found.component';
import { EventosMainComponent } from './components/eventos/eventos-main/eventos-main.component';
import { EventosCrearComponent } from './components/eventos/eventos-crear/eventos-crear.component';
import { AutoridadesDetalleComponent } from './components/autoridades/autoridades-detalle/autoridades-detalle.component';
import { AutoridadesMainComponent } from './components/autoridades/autoridades-main/autoridades-main.component';
import { AutoridadesListarComponent } from './components/autoridades/autoridades-listar/autoridades-listar.component';
import { EventosEditarComponent } from './components/eventos/eventos-editar/eventos-editar.component';
import { TitlesComponent } from './components/templates/titles/titles.component';
import { ListComponent } from './components/templates/list/list.component';
import { EleccionesMainComponent } from './components/elecciones/elecciones-main/elecciones-main.component';
import { BasicCrudComponent } from './components/templates/basic-crud/basic-crud.component';
import { SearchComponent } from './components/templates/search/search.component';
import { EleccionesDetalleComponent } from './components/elecciones/elecciones-detalle/elecciones-detalle.component';
import { EleccionesListaComponent } from './components/elecciones/elecciones-lista/elecciones-lista.component';
import { AutoridadFormComponent } from './components/elecciones/autoridad-form/autoridad-form.component';
import { AuthService } from './services/auth.service';
import { EleccionService } from './services/eleccion.service';
import { EstudiantesService } from './services/estudiantes.service';
import { TransaccionesService } from './services/transacciones.service';
import { EventosService } from './services/eventos.service';
import { AsociacionService } from './services/asociacion.service';
import { AutoridadesService } from './services/autoridades.service';
import { AutoridadEditComponent } from './components/elecciones/autoridad-edit/autoridad-edit.component';
import { ContratosMainComponent } from './components/contratos/contratos-main/contratos-main.component';
import { ContratosDetalleComponent } from './components/contratos/contratos-detalle/contratos-detalle.component';
import { ContratosNuevoComponent } from './components/contratos/contratos-nuevo/contratos-nuevo.component';
import { IncidentesMainComponent } from './components/incidentes/incidentes-main/incidentes-main.component';
import { IncidentesFiltrosComponent } from './components/incidentes/incidentes-filtros/incidentes-filtros.component';
import { IncidentesListarComponent } from './components/incidentes/incidentes-listar/incidentes-listar.component';
import { IncidentesCrearComponent } from './components/incidentes/incidentes-crear/incidentes-crear.component';
import { NotificacionesMainComponent } from './components/notificaciones/notificaciones-main/notificaciones-main.component';
import { EditarAutoridadFormComponent } from './components/ajustes/editar-autoridad-form/editar-autoridad-form.component';
import { AjustesConsultarAsociacionComponent } from './components/ajustes/ajustes-consultar-asociacion/ajustes-consultar-asociacion.component';
import { AjustesDefinirAporteComponent } from './components/ajustes/ajustes-definir-aporte/ajustes-definir-aporte.component';
import { AjustesMainComponent } from './components/ajustes/ajustes-main/ajustes-main.component';
import { AjustesNuevoSemestreComponent } from './components/ajustes/ajustes-nuevo-semestre/ajustes-nuevo-semestre.component';
import { EditarAutoridadesComponent } from './components/ajustes/editar-autoridades/editar-autoridades.component';
import { NotificacionesCrearComponent } from './components/notificaciones/notificaciones-crear/notificaciones-crear.component';
import { NotificacionesEditComponent } from './components/notificaciones/notificaciones-edit/notificaciones-edit.component';
import { EstudiantesGuard } from './services/guards/estudiantes.guard';
import { FilialesGuard } from './services/guards/filiales.guard';
import { AjustesGuard } from './services/guards/ajustes.guard';
import { AutoridadesGuard } from './services/guards/autoridades.guard';
import { ContratosGuard } from './services/guards/contratos.guard';
import { EventosGuard } from './services/guards/eventos.guard';
import { EleccionesGuard } from './services/guards/elecciones.guard';
import { FinancieroGuard } from './services/guards/financiero.guard';
import { IncidentesGuard } from './services/guards/incidentes.guard';
import { NotificacionesGuard } from './services/guards/notificaciones.guard';
import { RecursosGuard } from './services/guards/recursos.guard';
import { CrearPermisoComponent } from './components/ajustes/crear-permiso/crear-permiso.component';
import { ContratoService } from './services/contrato.service';
import { IncidenteService } from './services/incidente.service';
import { NotificacionService } from './services/notificacion.service';
import { IconBoxComponent } from './components/templates/icon-box/icon-box.component';
import { EstudiantesMainComponent } from './components/estudiantes/estudiantes-main/estudiantes-main.component';
import { EstudiantesFiltrosComponent } from './components/estudiantes/estudiantes-filtros/estudiantes-filtros.component';
import { EstudiantesDialogInfoComponent } from './components/estudiantes/estudiantes-dialog-info/estudiantes-dialog-info.component';
import { EstudiantesActualizacionComponent } from './components/estudiantes/estudiantes-actualizacion/estudiantes-actualizacion.component';
import { FinancieroFiltrosComponent } from './components/financiero/financiero-filtros/financiero-filtros.component';
import { FinancieroMainComponent } from './components/financiero/financiero-main/financiero-main.component';
import { FinancieroListarComponent } from './components/financiero/financiero-listar/financiero-listar.component';
import { FinancieroCrearComponent } from './components/financiero/financiero-crear/financiero-crear.component';
import { FinancieroDialogComponent } from './components/financiero/financiero-dialog/financiero-dialog.component';
import { EstudiantesListarComponent } from './components/estudiantes/estudiantes-listar/estudiantes-listar.component';
import { EstudiantesAfiliacionComponent } from './components/estudiantes/estudiantes-afiliacion/estudiantes-afiliacion.component';
import { FilialesMainComponent } from './components/filiales/filiales-main/filiales-main.component';
import { FilialesCrearComponent } from './components/filiales/filiales-crear/filiales-crear.component';
import { FilialesEditarComponent } from './components/filiales/filiales-editar/filiales-editar.component';
import { FilialComponent } from './components/filiales/filial/filial.component';
import { ProductosCrearComponent } from './components/productos/productos-crear/productos-crear.component';
import { ProductosEditarComponent } from './components/productos/productos-editar/productos-editar.component';
import { ProductosMainComponent } from './components/productos/productos-main/productos-main.component';
import { ProductosListarComponent } from './components/productos/productos-listar/productos-listar.component';
import { ProductosDialogInfoComponent } from './components/productos/productos-dialog-info/productos-dialog-info.component';
import { ProductosFiltrosComponent } from './components/productos/productos-filtros/productos-filtros.component';
import { RecursosMainComponent } from './components/recursos/recursos-main/recursos-main.component';
import { RecursosListarComponent } from './components/recursos/recursos-listar/recursos-listar.component'
import { RecursosDialogInfoComponent } from './components/recursos/recursos-dialog-info/recursos-dialog-info.component';
import { RecursosFiltrosComponent } from './components/recursos/recursos-filtros/recursos-filtros.component';
import { RecursosActualizacionComponent } from './components/recursos/recursos-actualizacion/recursos-actualizacion.component';
import { RecursoNuevoComponent } from './components/recursos/recurso-nuevo/recurso-nuevo.component';
import { ProveedoresMainComponent } from './components/proveedores/proveedores-main/proveedores-main.component';
import { ProveedoresCrearComponent } from './components/proveedores/proveedores-crear/proveedores-crear.component';
import { ProveedoresEditarComponent } from './components/proveedores/proveedores-editar/proveedores-editar.component';
import { ProveedoresDialogInfoComponent } from './components/proveedores/proveedores-dialog-info/proveedores-dialog-info.component';
import { ProveedoresFiltrosComponent } from './components/proveedores/proveedores-filtros/proveedores-filtros.component';
import { ProveedoresListarComponent } from './components/proveedores/proveedores-listar/proveedores-listar.component';
import { AjustesTerminarPeriodoComponent } from './components/ajustes/ajustes-terminar-periodo/ajustes-terminar-periodo.component';
import { AlquileresMainComponent } from './components/alquileres/alquileres-main/alquileres-main.component';
import { AlquileresCrearComponent } from './components/alquileres/alquileres-crear/alquileres-crear.component';
import { AlquileresEditarComponent } from './components/alquileres/alquileres-editar/alquileres-editar.component';
import { RecursosAlquilerComponent } from './components/recursos/recursos-alquiler/recursos-alquiler.component';




FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin
]);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    MainScreenComponent,
    PageNotFoundComponent,
    EventosMainComponent,
    EventosCrearComponent,
    AutoridadesDetalleComponent,
    AutoridadesMainComponent,
    AutoridadesListarComponent,
    EventosEditarComponent,
    TitlesComponent,
    EleccionesMainComponent,
    BasicCrudComponent,
    SearchComponent,
    EleccionesDetalleComponent,
    EleccionesListaComponent,
    AutoridadFormComponent,
    AutoridadEditComponent,
    ContratosMainComponent,
    ContratosDetalleComponent,
    ContratosNuevoComponent,
    IncidentesMainComponent,
    IncidentesFiltrosComponent,
    IncidentesListarComponent,
    IncidentesCrearComponent,
    NotificacionesMainComponent,
    EditarAutoridadFormComponent,
    ListComponent,
    AjustesConsultarAsociacionComponent,
    AjustesDefinirAporteComponent,
    AjustesMainComponent,
    AjustesNuevoSemestreComponent,
    EditarAutoridadFormComponent,
    EditarAutoridadesComponent,
    NotificacionesCrearComponent,
    NotificacionesEditComponent,
    CrearPermisoComponent,
    IconBoxComponent,
    EstudiantesActualizacionComponent,
    EstudiantesAfiliacionComponent,
    EstudiantesDialogInfoComponent,
    EstudiantesFiltrosComponent,
    EstudiantesListarComponent,
    EstudiantesMainComponent,
    FinancieroFiltrosComponent,
    FinancieroMainComponent,
    FinancieroListarComponent,
    FinancieroCrearComponent,
    FinancieroDialogComponent,
    FilialesMainComponent, FilialesCrearComponent, FilialesEditarComponent, FilialComponent,
    ProductosCrearComponent, ProductosEditarComponent, ProductosMainComponent, ProductosListarComponent, ProductosDialogInfoComponent, ProductosFiltrosComponent,
    RecursosMainComponent, RecursosListarComponent, RecursosDialogInfoComponent, RecursosFiltrosComponent, RecursosActualizacionComponent, RecursoNuevoComponent,
    ProveedoresMainComponent, ProveedoresCrearComponent, ProveedoresEditarComponent, ProveedoresDialogInfoComponent, ProveedoresFiltrosComponent, ProveedoresListarComponent, AjustesTerminarPeriodoComponent,
    AlquileresMainComponent, AlquileresCrearComponent, AlquileresEditarComponent, RecursosAlquilerComponent, 
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    FlatpickrModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    AngularFirestoreModule,
    MaterialComponentsModule,
    ReactiveFormsModule,
    NgbModule,
    CommonModule,
    FormsModule,
    NgbModalModule,
    FullCalendarModule,
  ],
  providers: [
    AsociacionService,
    AuthService,
    AutoridadesService,
    EleccionService,
    ContratoService,
    EleccionService,
    EstudiantesService,
    EventosService,
    IncidenteService,
    NotificacionService,
    TransaccionesService,
    AjustesGuard,
    AutoridadesGuard,
    ContratosGuard,
    EleccionesGuard,
    EstudiantesGuard,
    EventosGuard,
    FilialesGuard,
    FinancieroGuard,
    IncidentesGuard,
    NotificacionesGuard,
    RecursosGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
