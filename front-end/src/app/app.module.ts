import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EstudiantesComponent } from './components/estudiantes/estudiantes.component';
import { AutoridadesComponent } from './components/autoridades/autoridades.component';
import { RecursosComponent } from './components/recursos/recursos.component';
import { LoginComponent } from './components/Auth/login/login.component';
import { RegisterComponent } from './components/Auth/register/register.component';
import { HeaderComponent } from './components/layouts/header/header.component';
import { MainScreenComponent } from './components/layouts/main-screen/main-screen.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';

@NgModule({
  declarations: [
    AppComponent,
    EstudiantesComponent,
    AutoridadesComponent,
    RecursosComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    MainScreenComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatIconModule,
    MatExpansionModule,
    MatCardModule,
    AngularFireModule.initializeApp(environment.firabase),
    AngularFirestoreModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
