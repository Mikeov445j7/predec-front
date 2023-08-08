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
import { FormActividadComponent } from './actividades/form-actividad/form-actividad.component';
import { ReportesComponent } from './reportes/reportes.component';
import { PageComponent } from './page/page.component';
import { QuienesSomosComponent } from './page/quienesSomos/quienesSomos.component';
import { FuncionesComponent } from './page/funciones/funciones.component';
import { ComoseusaComponent } from './page/comoseusa/comoseusa.component';
import { PreciosComponent } from './page/precios/precios.component';
import { RegistroComponent } from './page/registro/registro.component';


const routes: Routes = [

  { path: '', component: ProyectosComponent },
  { path: 'home', component: ProyectosComponent },
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
  { path: 'actividades', component: ActividadesComponent},
  { path: 'form-actividad', component:FormActividadComponent},
  { path: 'form-actividad/:id_actividad', component:FormActividadComponent},
  { path: 'reportes', component: ReportesComponent},
  { path: 'page', component: PageComponent,
    children: [
      { path: 'quienes-somos', component: QuienesSomosComponent, pathMatch: 'full' },
      { path: 'funciones', component: FuncionesComponent, pathMatch: 'full' },
      { path: 'comoseusa', component: ComoseusaComponent, pathMatch: 'full' },
      { path: 'precios', component: PreciosComponent, pathMatch: 'full' },
      { path: 'registro', component: RegistroComponent, pathMatch: 'full' }
    ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
