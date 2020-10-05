import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FullCalendarModule } from '@fullcalendar/angular'; 
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/Auth/login/login.component';
import { HeaderComponent } from './components/layouts/header/header.component';
import { MainScreenComponent } from './components/layouts/main-screen/main-screen.component';
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
import { EstudiantesModule } from './components/estudiantes/estudiantes.module';
import { PageNotFoundComponent } from './components/layouts/page-not-found/page-not-found.component';
import { EventosMainComponent } from './components/eventos/eventos-main/eventos-main.component';
import { EventosCrearComponent } from './components/eventos/eventos-crear/eventos-crear.component';
import { AutoridadesDetalleComponent } from './components/autoridades/autoridades-detalle/autoridades-detalle.component';
import { AutoridadesMainComponent } from './components/autoridades/autoridades-main/autoridades-main.component';
import { AutoridadesListarComponent } from './components/autoridades/autoridades-listar/autoridades-listar.component';
import { EventosInfoComponent } from './components/eventos/eventos-info/eventos-info.component';
import { FinancieroModule } from './components/financiero/financiero.module';
import { EventosEditarComponent } from './components/eventos/eventos-editar/eventos-editar.component';
import { TitlesComponent } from './components/layouts/titles/titles.component';
import { ListComponent } from './components/layouts/list/list.component';
import { EleccionesMainComponent } from './components/elecciones/elecciones-main/elecciones-main.component';
import { BasicCrudComponent } from './components/layouts/basic-crud/basic-crud.component';
import { SearchComponent } from './components/layouts/search/search.component';
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
    EventosInfoComponent, 
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
    NotificacionesCrearComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firabase),
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
    EstudiantesModule,
    FullCalendarModule,
    FinancieroModule
  ],
  providers: [
    AuthService,
    EleccionService,
    EstudiantesService,
    TransaccionesService,
    EventosService,
    AsociacionService,
    AutoridadesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
