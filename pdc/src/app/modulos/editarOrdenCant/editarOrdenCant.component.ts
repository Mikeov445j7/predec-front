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
    this.dat.catidad = this.data.actividad.catidad;
    this.dat.fecha_ini_actv = this.data.actividad.fecha_ini_actv;
    this.dat.fecha_fin_actv = this.data.actividad.fecha_fin_actv;
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
          this.confirmado();
        }
      });
    }
  }



}
