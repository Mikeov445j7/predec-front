import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { ModulosService } from 'src/app/servicios/modulos.service';
import { ProyectosService } from '../../servicios/proyectos.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../../modal/modal.component';
import * as moment from 'moment';
import {FormModuloComponent} from '../../modulos/form-modulo/form-modulo.component';
import { ReportesService } from 'src/app/servicios/reportes.service';
import { RpresuXmodComponent } from 'src/app/reportes/RpresuXmod/RpresuXmod.component';
import { RpresuGralComponent } from 'src/app/reportes/RpresuGral/RpresuGral.component';
import { RmatXmodComponent } from 'src/app/reportes/RmatXmod/RmatXmod.component';
import { RmanoObrXmodComponent } from 'src/app/reportes/RmanoObrXmod/RmanoObrXmod.component';
import { RequipoXmodComponent } from 'src/app/reportes/RequipoXmod/RequipoXmod.component';
import { RtotalMatxModuComponent } from 'src/app/reportes/RtotalMatxModu/RtotalMatxModu.component';
import { RtotalManoObraxModuComponent } from 'src/app/reportes/RtotalManoObraxModu/RtotalManoObraxModu.component';
import { RtotalEquipoxModuComponent } from 'src/app/reportes/RtotalEquipoxModu/RtotalEquipoxModu.component';
import { RtotalInsumosProyectoComponent } from 'src/app/reportes/RtotalInsumosProyecto/RtotalInsumosProyecto.component';
import { CopiarproyectoComponent } from '../copiarproyecto/copiarproyecto.component';


@Component({
  selector: 'app-ver-proyecto',
  templateUrl: './ver-proyecto.component.html',
  styleUrls: ['./ver-proyecto.component.scss']
})
export class VerProyectoComponent {
  public titulo:any;
  public idProyecto:any;
  public proyecto:any;
  public modulos:any;
  public actividades:any;
  public count:any;
  public id_us:any;
  constructor(
    public proyecServ: ProyectosService,
    public modServ: ModulosService,
    private route: ActivatedRoute,
    private router:Router,
    public dialogo: MatDialog,
    public servRep:ReportesService
  ) { }

  ngOnInit() {

    if(this.route.snapshot.params['idProyecto']){
      this.id_us = localStorage.getItem('id');
      this.idProyecto = Number(this.route.snapshot.params['idProyecto']);
      this.getProyecto();
    }

    }


  getProyecto(){
    this.proyecServ.getUno(this.idProyecto).subscribe(p=>{
      if(p){
        this.proyecto = p;
        this.proyecto = this.proyecto[0];
        console.log(this.proyecto);

        if(this.proyecto.id_us == this.id_us ){
          this.getModulos();
        } else {
          this.router.navigate(['home']);
        }


      }
    });
  }

  getModulos(){
    let m:any;
    this.modServ.getModulosProyecto(this.idProyecto).subscribe(mod=>{
      if(mod){
        m=mod;
        if(m.success!=0){
          this.modulos = mod;
          console.log(this.modulos.length);
          this.count = this.modulos.length;
        } else {
          console.log("no data");
          this.modulos = [];
          console.log(this.modulos.length);
          this.count = this.modulos.length;
        }

      }
    });
  }
  copiarProyecto(){

    this.dialogo.open( CopiarproyectoComponent, {
      panelClass: "modal-responisvo",
      data: {
        id_proyec: this.idProyecto,
        tipo: "rpresuXmod",
        cod:1
      }
    })
    .afterClosed()
    .subscribe((confirmado:any) => {
      if (confirmado.resultado) {
        console.log(confirmado);
      }
      else {
        console.log(confirmado.data);

      }
      this.getModulos();
    });

  }

  selecItem(item:any){
    console.log(item.id_modulo);
    this.router.navigate(['ver-modulo/'+item.id_modulo]);

  }
  agregarModulo(){
    this.dialogo.open( FormModuloComponent, {
      panelClass: "modal-responisvo",
      data: {
        Proyecto: this.proyecto,
        cant: this.count,
        tipo: "Crear",
        cod:1
      }
    })
    .afterClosed()
    .subscribe((confirmado:any) => {
      if (confirmado.resultado) {
        console.log(confirmado);
      }
      else {
        console.log(confirmado.data);

      }
      this.getModulos();
    });
  }

  PresMod(){

    this.dialogo.open( RpresuXmodComponent, {
      panelClass: "modal-responisvo",
      data: {
        id_proyec: this.idProyecto,
        tipo: "rpresuXmod",
        cod:1
      }
    })
    .afterClosed()
    .subscribe((confirmado:any) => {
      if (confirmado.resultado) {
        console.log(confirmado);
      }
      else {
        console.log(confirmado.data);

      }
      this.getModulos();
    });

  }
  ResGral(){

    this.dialogo.open( RpresuGralComponent, {
      panelClass: "modal-responisvo",
      data: {
        id_proyec: this.idProyecto,
        tipo: "Rpresupuestogral",
        cod:1
      }
    })
    .afterClosed()
    .subscribe((confirmado:any) => {
      if (confirmado.resultado) {
        console.log(confirmado);
      }
      else {
        console.log(confirmado.data);

      }
      this.getModulos();
    });

  }
  matMod(){
    this.dialogo.open( RmatXmodComponent, {
      panelClass: "modal-responisvo",
      data: {
        id_proyec: this.idProyecto,
        tipo: "Rpresupuestogral",
        cod:1
      }
    })
    .afterClosed()
    .subscribe((confirmado:any) => {
      if (confirmado.resultado) {
        console.log(confirmado);
      }
      else {
        console.log(confirmado.data);

      }
      this.getModulos();
    });

  }

  equipoMod(){
    this.dialogo.open( RequipoXmodComponent, {
      panelClass: "modal-responisvo",
      data: {
        id_proyec: this.idProyecto,
        tipo: "Rpresupuestogral",
        cod:1
      }
    })
    .afterClosed()
    .subscribe((confirmado:any) => {
      if (confirmado.resultado) {
        console.log(confirmado);
      }
      else {
        console.log(confirmado.data);

      }
      this.getModulos();
    });

  }
  manoOMod(){
    this.dialogo.open( RmanoObrXmodComponent, {
      panelClass: "modal-responisvo",
      data: {
        id_proyec: this.idProyecto,
        tipo: "Rpresupuestogral",
        cod:1
      }
    })
    .afterClosed()
    .subscribe((confirmado:any) => {
      if (confirmado.resultado) {
        console.log(confirmado);
      }
      else {
        console.log(confirmado.data);

      }
      this.getModulos();
    });

  }
  totalMaterialXmodulo(){
    this.dialogo.open( RtotalMatxModuComponent, {
      panelClass: "modal-responisvo",
      data: {
        id_proyec: this.idProyecto,
        tipo: "RtotalMatxModu",
        cod:1
      }
    })
    .afterClosed()
    .subscribe((confirmado:any) => {
      if (confirmado.resultado) {
        console.log(confirmado);
      }
      else {
        console.log(confirmado.data);
      }
      this.getModulos();
    });

  }
  totalManosObraXmodulo(){
    this.dialogo.open( RtotalManoObraxModuComponent, {
      panelClass: "modal-responisvo",
      data: {
        id_proyec: this.idProyecto,
        tipo: "RtotalManoObraxModu",
        cod:1
      }
    })
    .afterClosed()
    .subscribe((confirmado:any) => {
      if (confirmado.resultado) {
        console.log(confirmado);
      }
      else {
        console.log(confirmado.data);
      }
      this.getModulos();
    });

  } //totalEquipoXmodulo()
  totalEquipoXmodulo(){
    this.dialogo.open( RtotalEquipoxModuComponent, {
      panelClass: "modal-responisvo",
      data: {
        id_proyec: this.idProyecto,
        tipo: "RtotalManoObraxModu",
        cod:1
      }
    })
    .afterClosed()
    .subscribe((confirmado:any) => {
      if (confirmado.resultado) {
        console.log(confirmado);
      }
      else {
        console.log(confirmado.data);
      }
      this.getModulos();
    });

  } //totalEquipoXmodulo()
  totalinsumoProyecto(){
    this.dialogo.open( RtotalInsumosProyectoComponent, {
      panelClass: "modal-responisvo",
      data: {
        id_proyec: this.idProyecto,
        tipo: "RtotalManoObraxModu",
        cod:1
      }
    })
    .afterClosed()
    .subscribe((confirmado:any) => {
      if (confirmado.resultado) {
        console.log(confirmado);
      }
      else {
        console.log(confirmado.data);
      }
      this.getModulos();
    });

  }

}
