import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EstudiantesComponent } from './components/estudiantes/estudiantes.component';
import { AutoridadesComponent } from './components/autoridades/autoridades.component';
import { LoginComponent } from './components/Auth/login/login.component';
import { RegisterComponent } from './components/Auth/register/register.component';
import { HeaderComponent } from './components/layouts/header/header.component';
import { MainScreenComponent } from './components/layouts/main-screen/main-screen.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { DialogComponent } from './components/estudiantes/dialog/dialog.component';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { ListaDeAutoridadesComponent } from './components/autoridades/lista-de-autoridades/lista-de-autoridades.component';
import { DetalleDeAutoridadesComponent } from './components/autoridades/detalle-de-autoridades/detalle-de-autoridades.component';
import { MaterialComponentsModule } from './material';
import { ListarEstudiantesComponent } from './components/estudiantes/listar-estudiantes/listar-estudiantes.component';
import { FiltrosEstudiantesComponent } from './components/estudiantes/filtros-estudiantes/filtros-estudiantes.component';
import { FormularioActualizacionComponent } from './components/estudiantes/formulario-actualizacion/formulario-actualizacion.component';
import { FormularioAfiliacionComponent } from './components/estudiantes/formulario-afiliacion/formulario-afiliacion.component';
import { RecursosService } from './services/recursos.service';
import { EstudiantesService } from './services/estudiantes.service';
import { RecursosComponent } from './components/recursos/recursos.component';
import { RecursoComponent } from './components/recursos/recurso/recurso.component';
import { DetalleRecursoComponent } from './components/recursos/detalle-recurso/detalle-recurso.component';
import { FinancieroComponent } from './components/financiero/financiero.component';
import { FiltrosFinancieroComponent } from './components/financiero/filtros-financiero/filtros-financiero.component';
import { ListarFinancieroComponent } from './components/financiero/listar-financiero/listar-financiero.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import * as moment from 'moment';
import { HorarioAutoridadComponent } from './components/autoridades/horario-autoridad/horario-autoridad.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FlatpickrModule } from 'angularx-flatpickr';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { AjustesComponent } from './components/ajustes/ajustes.component';
import { NuevaTransaccionComponent } from './components/financiero/nueva-transaccion/nueva-transaccion.component';
import { DefinirCargosComponent } from './components/ajustes/definir-cargos/definir-cargos.component';
import { CambiarAsociacionComponent } from './components/ajustes/cambiar-asociacion/cambiar-asociacion.component';
import { CargaMasivaComponent } from './components/estudiantes/carga-masiva/carga-masiva.component';
import { DropZoneDirective } from './dropzone.directive';
import { DialogCargaMasivaComponent } from './components/estudiantes/dialog-carga-masiva/dialog-carga-masiva.component';
import { DialogCargaMasivaFinancieroComponent } from './components/financiero/dialog-carga-masiva-financiero/dialog-carga-masiva-financiero.component';
import { CargaMasivaFinancieroComponent } from './components/financiero/carga-masiva-financiero/carga-masiva-financiero.component';

@NgModule({
  declarations: [
    AppComponent,
    EstudiantesComponent,
    AutoridadesComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    MainScreenComponent,
    DialogComponent,
    ListaDeAutoridadesComponent,
    DetalleDeAutoridadesComponent,
    ListarEstudiantesComponent,
    FiltrosEstudiantesComponent,
    FormularioActualizacionComponent,
    FormularioAfiliacionComponent,
    RecursosComponent,
    RecursoComponent,
    DetalleRecursoComponent,
    FinancieroComponent,
    FiltrosFinancieroComponent,
    ListarFinancieroComponent,
    HorarioAutoridadComponent,
    AjustesComponent,
    NuevaTransaccionComponent,
    DefinirCargosComponent,
    CambiarAsociacionComponent,
    CargaMasivaComponent,
    DropZoneDirective,
    DialogCargaMasivaComponent,
    DialogCargaMasivaFinancieroComponent,
    CargaMasivaFinancieroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firabase),
    AngularFirestoreModule,
    FormsModule,
    MaterialComponentsModule,
    ReactiveFormsModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
    NgbModule,
    CommonModule,
    FormsModule,
    NgbModalModule,
    FlatpickrModule.forRoot(),
  ],
  providers: [
    RecursosService,
    EstudiantesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
