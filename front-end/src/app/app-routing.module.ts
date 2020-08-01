import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainScreenComponent } from './components/layouts/main-screen/main-screen.component';
import { EstudiantesComponent } from './components/estudiantes/estudiantes.component';
import { AutoridadesComponent } from './components/autoridades/autoridades.component';
import { FormularioActualizacionComponent } from './components/estudiantes/formulario-actualizacion/formulario-actualizacion.component';
import { FormularioAfiliacionComponent } from './components/estudiantes/formulario-afiliacion/formulario-afiliacion.component';
import { RecursosComponent } from './components/recursos/recursos.component';
import { FinancieroComponent } from './components/financiero/financiero.component';
import { AjustesComponent } from './components/ajustes/ajustes.component';
import { NuevaTransaccionComponent } from './components/financiero/nueva-transaccion/nueva-transaccion.component';
import { DefinirCargosComponent } from './components/ajustes/definir-cargos/definir-cargos.component';
import { CambiarAsociacionComponent } from './components/ajustes/cambiar-asociacion/cambiar-asociacion.component';


const routes: Routes = [
  { path: '', component: MainScreenComponent },
  { path: 'main', component: MainScreenComponent, children: [
      { path: 'estudiantes', component: EstudiantesComponent },
      { path: 'actualizar', component: FormularioActualizacionComponent },
      { path: 'afiliar', component: FormularioAfiliacionComponent },
      { path: 'autoridades', component: AutoridadesComponent },
      { path: 'financiero', component: FinancieroComponent },
      { path: 'ajustes', component: AjustesComponent },
      { path: 'nuevatransaccion', component: NuevaTransaccionComponent },
      { path: 'recursos', component: RecursosComponent},
      {
        path: 'ajustes', component: AjustesComponent, children: [
          { path: 'definir-cargos', component: DefinirCargosComponent },
          { path: 'cambiar-asociacion', component: CambiarAsociacionComponent }
        ]
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
