import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {ActividadesService} from '../../servicios/actividades.service';
import { EquipoService } from 'src/app/servicios/equipo.service';
import { ManoDeObraService } from 'src/app/servicios/mano-de-obra.service';
import { MaterialesService } from 'src/app/servicios/materiales.service';

@Component({
  selector: 'app-act-insumos',
  templateUrl: './act-insumos.component.html',
  styleUrls: ['./act-insumos.component.scss']
})
export class ActInsumosComponent implements OnInit {
  public actividad:any;
  public idActividad:any;
  public tipoInsumo:any;
  public insumos:any;
  public results:any=[];
  public mostrar = false;
  public select = false;
  public relActInsu = {
    insumo: 0,
    id_actividad: 0,
    id:0,
    cant:0
  }

  constructor(
    public dialogo: MatDialogRef<ActInsumosComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    public actServ: ActividadesService,
    public eqServ:EquipoService,
    public matServ: MaterialesService,
    public moServ: ManoDeObraService

  ) { }

  ngOnInit() {
    console.log(this.data);
    this.tipoInsumo = this.data.tipo;
    this.idActividad = this.data.idActividad;

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

  getInsumos(param:any){
    if(param.length>=3){
      if(this.tipoInsumo==1){
        this.matServ.buscar(param).subscribe(m=>{
          console.log(m);
          if(m){
            this.results = m;
          }
        });

      }
      if(this.tipoInsumo==2){
        this.moServ.buscar(param).subscribe(mo=>{
          console.log(mo);

          if(mo){
            this.results = mo;
          }
        });
      }
      if(this.tipoInsumo==3){
        this.eqServ.buscar(param).subscribe(eq=>{
          console.log(eq);
          if(eq){
            this.results = eq;
          }
        });
      }

      console.log(this.results);
      this.mostrar = true;
    } else {
      this.mostrar = false;
    }

  }

  selecItem(i:any){
    console.log(i);
    let id:any;
    this.select = true;
    this.mostrar = false;
    if(this.tipoInsumo==1){id=i.id_mat;}
    if(this.tipoInsumo==2){id=i.id_mo;}
    if(this.tipoInsumo==3){id=i.id_equip;}
    this.relActInsu = {
      insumo: this.tipoInsumo,
      id_actividad: this.idActividad,
      id:Number(id),
      cant:0
    }


  }

  agregar(cant:any){
    this.relActInsu.cant = Number(cant);

    console.log(this.relActInsu);
    this.actServ.relActvInsumo(this.relActInsu).subscribe(r=>{
      if(r){
        console.log(r);
        this.confirmado();
      }
    })


  }

}
