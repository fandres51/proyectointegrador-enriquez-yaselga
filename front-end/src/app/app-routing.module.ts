import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/Auth/login/login.component';
import { MainScreenComponent } from './components/layouts/main-screen/main-screen.component';
import { EstudiantesComponent } from './components/estudiantes/estudiantes.component';
import { AutoridadesComponent } from './components/autoridades/autoridades.component';
import { FormularioActualizacionComponent } from './components/estudiantes/formulario-actualizacion/formulario-actualizacion.component';
import { FormularioAfiliacionComponent } from './components/estudiantes/formulario-afiliacion/formulario-afiliacion.component';
import { FinancieroComponent } from './components/financiero/financiero.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'main', component: MainScreenComponent, children: [
    { path: 'estudiantes', component: EstudiantesComponent },
    { path: 'actualizar', component: FormularioActualizacionComponent },
    { path: 'afiliar', component: FormularioAfiliacionComponent },
    { path: 'autoridades', component: AutoridadesComponent },
    { path: 'financiero', component: FinancieroComponent },
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
