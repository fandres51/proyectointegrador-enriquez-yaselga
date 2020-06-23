import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/Auth/login/login.component';
import { MainScreenComponent } from './components/layouts/main-screen/main-screen.component';
import { EstudiantesComponent } from './components/estudiantes/estudiantes.component';
import { AutoridadesComponent } from './components/autoridades/autoridades.component';
import { FormularioActualizacionComponent } from './components/estudiantes/formulario-actualizacion/formulario-actualizacion.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'main', component: MainScreenComponent, children: [
    { path: 'estudiantes', component: EstudiantesComponent },
    { path: 'actualizar', component: FormularioActualizacionComponent },
    { path: 'autoridades', component: AutoridadesComponent },
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
