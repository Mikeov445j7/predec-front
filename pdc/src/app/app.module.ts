import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';

//componentes
import { CrudItemsComponent } from './crud-items/crud-items.component';
import { FormularioItemsComponent } from './crud-items/formulario-items/formulario-items.component'
import { ProyectosComponent } from './proyectos/proyectos.component';
//servicios
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModulosComponent } from './modulos/modulos.component';
import { ActividadesComponent } from './actividades/actividades.component';
import { FormProyectoComponent } from './proyectos/form-proyecto/form-proyecto.component';
import { FormModuloComponent } from './modulos/form-modulo/form-modulo.component';
import { VerProyectoComponent } from './proyectos/ver-proyecto/ver-proyecto.component';
import { ComponentesModule } from 'projects/componentes/src/lib/componentes.module';
import { ModalComponent } from './modal/modal.component';
import { AgregarActividadComponent } from './modulos/agregar-actividad/agregar-actividad.component';




@NgModule({
  declarations: [
    AppComponent,
      CrudItemsComponent,
      FormularioItemsComponent,
      ProyectosComponent,
      FormProyectoComponent,
      ModulosComponent,
      FormModuloComponent,
      ActividadesComponent,
      VerProyectoComponent,
      ModalComponent,
      AgregarActividadComponent

   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentesModule

  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
