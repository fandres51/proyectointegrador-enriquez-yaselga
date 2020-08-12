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
import { AjustesModule } from './components/ajustes/ajustes.module';
import { EventosMainComponent } from './components/eventos/eventos-main/eventos-main.component';
import { EventosCrearComponent } from './components/eventos/eventos-crear/eventos-crear.component';
import { AutoridadesDetalleComponent } from './components/autoridades/autoridades-detalle/autoridades-detalle.component';
import { AutoridadesMainComponent } from './components/autoridades/autoridades-main/autoridades-main.component';
import { AutoridadesListarComponent } from './components/autoridades/autoridades-listar/autoridades-listar.component';
import { EventosInfoComponent } from './components/eventos/eventos-info/eventos-info.component';
import { FinancieroModule } from './components/financiero/financiero.module';

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
    AutoridadesListarComponent, EventosInfoComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firabase),
    FlatpickrModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    AngularFirestoreModule,
    FormsModule,
    MaterialComponentsModule,
    ReactiveFormsModule,
    NgbModule,
    CommonModule,
    FormsModule,
    NgbModalModule,
    EstudiantesModule,
    AjustesModule,
    FullCalendarModule,
    FinancieroModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
