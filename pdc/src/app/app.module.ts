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
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { FormActividadComponent } from './actividades/form-actividad/form-actividad.component';
import { ActInsumosComponent } from './actividades/act-insumos/act-insumos.component';
import { ReportesComponent } from './reportes/reportes.component';




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
      AgregarActividadComponent,
      FormActividadComponent,
      ActInsumosComponent,
      ReportesComponent
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
    { provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
