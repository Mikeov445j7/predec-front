import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrudItemsComponent } from './crud-items/crud-items.component';
import { FormularioItemsComponent } from './crud-items/formulario-items/formulario-items.component';
import { FormModuloComponent } from './modulos/form-modulo/form-modulo.component';
import { ModulosComponent } from './modulos/modulos.component';
import { FormProyectoComponent } from './proyectos/form-proyecto/form-proyecto.component';
import { ProyectosComponent } from './proyectos/proyectos.component';
import { VerProyectoComponent } from './proyectos/ver-proyecto/ver-proyecto.component';
import { LoginComponent } from 'projects/componentes/src/lib/login/login.component';
import {ActividadesComponent} from './actividades/actividades.component';


const routes: Routes = [

  { path: '', component: ProyectosComponent },
  { path: 'crud-items', component: CrudItemsComponent },
  { path: 'formulario-item/:tabla', component: FormularioItemsComponent},
  { path: 'formulario-item/:tabla/:idItem', component: FormularioItemsComponent},
  { path: 'proyectos', component: ProyectosComponent},
  { path: 'nuevo-proyecto', component: FormProyectoComponent},
  { path: 'editar-proyecto/:idProyecto', component: FormProyectoComponent},
  { path: 'ver-modulo/:idModulo', component: ModulosComponent},
  { path: 'nuevo-modulo/:idProyecto', component: FormModuloComponent},
  { path: 'editar-modulo/:idProyecto/:idModulo', component: FormModuloComponent},
  { path: 'ver-proyecto/:idProyecto', component:VerProyectoComponent},
  { path: 'login', component: LoginComponent },
  { path: 'ver-actividad', component: ActividadesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
