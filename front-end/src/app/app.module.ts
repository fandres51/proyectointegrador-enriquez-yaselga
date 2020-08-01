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
import { FormsModule } from '@angular/forms';
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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firabase),
    AngularFirestoreModule,
    FormsModule,
    MaterialComponentsModule
  ],
  providers: [
    RecursosService,
    EstudiantesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
