import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModulosService } from '../../servicios/modulos.service';
import {ActividadesService} from '../../servicios/actividades.service';
import * as moment from 'moment';
@Component({
  selector: 'app-agregar-actividad',
  templateUrl: './agregar-actividad.component.html',
  styleUrls: ['./agregar-actividad.component.scss']
})
export class AgregarActividadComponent implements OnInit {
  public actividades:any = [];
  public actiData:any;
  public actividad:any;
  public listo=false;
  public buscar = {
    busca:''
  }
  public mostrar = false;
  public relACtMod = {
    id_modulo: 0,
    id_actividad:0,
    catidad:0,
    unitario:0,
    orden:0,
    fecha_ini_actv: '',
    fecha_fin_actv:''
  }

  constructor(
    public dialogo: MatDialogRef<AgregarActividadComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    public modServ: ModulosService,
    public actServ: ActividadesService,

  ) { }

  ngOnInit() {
    console.log("Confirmar?", this.data);
    this.relACtMod.orden = this.data.cantActiv;

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
      data: "Operación Cancelada"
    }
      this.dialogo.close(respuesta);

  }
  getActividades(){
    this.actServ.listarActividades().subscribe(a=>{
      if(a){
        console.log(a);
        this.actividades = a;
      }
    });
  }
  buscarActividad(param:string){
    if(param.length>=3){
      this.actServ.buscar(param).subscribe(a=>{
        if(a){
          this.actividades = a;
          this.mostrar = true
        }
      });
    } else {
      this.mostrar = false;
    }
  }
  selecItem(item:any){
    console.log(item);
    this.actiData = item;
    this.actServ.verActividad(Number(item.id_actividad)).subscribe(a=>{
      if(a){
        this.actividad = a;
        console.log(this.actividad);
        this.relACtMod.id_actividad = item.id_actividad;
        this.relACtMod.id_modulo = this.data.modulo.id_modulo;
        this.relACtMod.unitario = Number(this.calculaUnitario());
        this.relACtMod.orden = this.data.cantActiv;;
        console.log(this.relACtMod);
        this.mostrar = false;
        this.listo = true;
      }
    });

  }
  agregarActividad(data:any){
    //this.relACtMod.catidad = cant;
    data.fecha_ini_actv = moment().format('YYYY-M-D'); //moment(data.fecha_ini_actv).format('YYYY-M-D');
    data.fecha_fin_actv = moment().format('YYYY-M-D'); //moment(data.fecha_fin_actv).format('YYYY-M-D');
    this.relACtMod.catidad = data.catidad;
    this.relACtMod.orden = data.orden;
    this.relACtMod.fecha_ini_actv = data.fecha_ini_actv;
    this.relACtMod.fecha_fin_actv = data.fecha_fin_actv;
    console.log(this.relACtMod);
    this.modServ.agregarActividad(this.relACtMod.id_modulo, this.relACtMod).subscribe(m=>{
         if(m){
          console.log(m);
          this.confirmado();
         }
      });
  }

  calculaUnitario(){
    let materiales = 0;
    let manoObra = 0;
    let equipo = 0;
    console.log("MATERIALES-------------->>");
    if(this.actividad.materiales!='SIN MATERIALES'){
      for(let i = 0; i<this.actividad.materiales.length; i++){
        materiales += Number(this.actividad.materiales[i].PU*this.actividad.materiales[i].cant_por_acti);
      }
    }

    console.log("MANODE OBRA-------------->>");
    if(this.actividad.manoObra!='SIN MANO DE OBRA'){
      for(let i = 0; i<this.actividad.manoObra.length; i++){
        manoObra += Number(this.actividad.manoObra[i].PU*this.actividad.manoObra[i].cant);
      }
    }

    console.log("EQUIPO-------------->>");
    if(this.actividad.equipo!='SIN EQUIPO'){
      for(let i = 0; i<this.actividad.equipo.length; i++){
        equipo += Number(this.actividad.equipo[i].PU*this.actividad.manoObra[i].cant);
      }
    }
    materiales = Number(materiales);
    manoObra = Number(manoObra);
    equipo = Number(equipo);
    console.log("Materiales:",materiales, "Mano de Obra:",manoObra, "Equipo:",equipo);


    return materiales + manoObra + equipo;

  }

}
