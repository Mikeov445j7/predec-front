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
import { PxUactModComponent } from './reportes/pxUactMod/pxUactMod.component';
import { RpresuXmodComponent } from './reportes/RpresuXmod/RpresuXmod.component';
import { RpresuGralComponent } from './reportes/RpresuGral/RpresuGral.component';
import { RmatXmodComponent } from './reportes/RmatXmod/RmatXmod.component';
import { RmanoObrXmodComponent } from './reportes/RmanoObrXmod/RmanoObrXmod.component';
import { RequipoXmodComponent } from './reportes/RequipoXmod/RequipoXmod.component';
import { RtotalMatxModuComponent } from './reportes/RtotalMatxModu/RtotalMatxModu.component';
import { RtotalManoObraxModuComponent } from './reportes/RtotalManoObraxModu/RtotalManoObraxModu.component';
import { RtotalEquipoxModuComponent } from './reportes/RtotalEquipoxModu/RtotalEquipoxModu.component';
import { RtotalInsumosProyectoComponent } from './reportes/RtotalInsumosProyecto/RtotalInsumosProyecto.component';
import { EditarOrdenCantComponent } from './modulos/editarOrdenCant/editarOrdenCant.component';
import { RGattModuloComponent } from './reportes/RGattModulo/RGattModulo.component';
import { PageComponent } from './page/page.component';
import { Ng2PageScrollModule } from 'ng2-page-scroll';
import { FuncionesComponent } from './page/funciones/funciones.component';
import { ComoseusaComponent } from './page/comoseusa/comoseusa.component';
import { PreciosComponent } from './page/precios/precios.component';
import { QuienesSomosComponent } from './page/quienesSomos/quienesSomos.component';
import { RegistroComponent } from './page/registro/registro.component';
import { UpgradeComponent } from './upgrade/upgrade.component';
import { SetPremiunComponent } from './upgrade/setPremiun/setPremiun.component';
import { Modal_PremiumComponent } from './modal_Premium/modal_Premium.component';
import { GestionUsuariosComponent } from './upgrade/gestionUsuarios/gestionUsuarios.component';
import { CopiarproyectoComponent } from './proyectos/copiarproyecto/copiarproyecto.component';





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
      EditarOrdenCantComponent,
      VerProyectoComponent,
      ModalComponent,
      AgregarActividadComponent,
      FormActividadComponent,
      ActInsumosComponent,
      ReportesComponent,
      PxUactModComponent,
      RpresuXmodComponent,
      RpresuGralComponent,
      RmatXmodComponent,
      RmanoObrXmodComponent,
      RequipoXmodComponent,
      RtotalMatxModuComponent,
      RtotalManoObraxModuComponent,
      RtotalEquipoxModuComponent,
      RtotalInsumosProyectoComponent,
      RGattModuloComponent,
      PageComponent,
      FuncionesComponent,
      ComoseusaComponent,
      PreciosComponent,
      QuienesSomosComponent,
      RegistroComponent,
      UpgradeComponent,
      SetPremiunComponent,
      Modal_PremiumComponent,
      GestionUsuariosComponent,
      CopiarproyectoComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentesModule,
    Ng2PageScrollModule
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
