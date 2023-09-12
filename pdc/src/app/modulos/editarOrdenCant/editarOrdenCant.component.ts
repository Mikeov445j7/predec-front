import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModulosService } from '../../servicios/modulos.service';
import {ActividadesService} from '../../servicios/actividades.service';
import * as moment from 'moment';

@Component({
  selector: 'app-editarOrdenCant',
  templateUrl: './editarOrdenCant.component.html',
  styleUrls: ['./editarOrdenCant.component.scss']
})
export class EditarOrdenCantComponent implements OnInit {
  public actividades:any = [];
  public actiData:any;
  public actividad:any;
  public listo=true;
  public espera= true;
  public dat = {
    orden:0,
    catidad:0,
    fecha_ini_actv: '',
    fecha_fin_actv:''
  }
  public relACtMod = {
    id_modulo: 0,
    id_actividad:0,
    catidad:0,
    unitario:0,
    orden:0,
    fecha_ini_actv: '',
    fecha_fin_actv:''
  }

  public mostrar = false;

  constructor(
    public dialogo: MatDialogRef<EditarOrdenCantComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    public modServ: ModulosService,
    public actServ: ActividadesService,

  ) { }

  ngOnInit() {
    console.log("Confirmar?", this.data);
    this.dat.orden = this.data.actividad.orden;
    this.dat.catidad = this.data.actividad.cantidad;
    this.dat.fecha_ini_actv = this.data.actividad.fecha_ini_actv;
    this.dat.fecha_fin_actv = this.data.actividad.fecha_fin_actv;
    console.log(this.data);

    this.actServ.verActividad(Number(this.data.id_actividad)).subscribe(a=>{
      if(a){
        this.actividad = a;
        console.log(this.actividad);
        this.relACtMod.id_actividad = this.data.id_actividad;
        this.relACtMod.id_modulo = this.data.modulo.id_modulo;
        this.relACtMod.orden = this.data.cantActiv;;
        console.log(this.relACtMod);
        this.mostrar = false;
        this.listo = true;
      }
    });
  }
  cerrarDialogo(): void {
    const respuesta = {
      resultado:false,
      data: "Operación Cancelada"
    }
    this.dialogo.close(respuesta);
  }
  confirmado(): void {
    const respuesta = {
      resultado:false,
      data: "hecho"
    }
      this.dialogo.close(respuesta);

  }
  editardatos(data:any){
    if(data.orden&&data.catidad){
      let datUP = {
        id_rel_am: this.data.actividad.id_rel_am,
        orden:data.orden,
        catidad:data.catidad,
        fecha_ini_actv: moment().format('YYYY-M-D'), //moment(data.fecha_ini_actv).format('YYYY-M-D'),
        fecha_fin_actv: moment().format('YYYY-M-D')//moment(data.fecha_fin_actv).format('YYYY-M-D')
      }
      this.modServ.UpdateRlActModulo(datUP).subscribe(r=>{
        this.espera=false;
        if(r){
          console.log(r);

          this.confirmado();
        }
      });
    }
  }



}
