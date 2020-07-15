import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
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
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FlatpickrModule } from 'angularx-flatpickr';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { AjustesComponent } from './components/ajustes/ajustes.component';
import { DefinirCargosComponent } from './components/ajustes/definir-cargos/definir-cargos.component';
import { CambiarAsociacionComponent } from './components/ajustes/cambiar-asociacion/cambiar-asociacion.component';
import { EstudiantesModule } from './components/estudiantes/estudiantes.module';
import { PageNotFoundComponent } from './components/layouts/page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    MainScreenComponent,
    PageNotFoundComponent,
    AjustesComponent,
    DefinirCargosComponent,
    CambiarAsociacionComponent
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
    EstudiantesModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
