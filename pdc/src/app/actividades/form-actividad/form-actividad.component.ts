import { Component, OnInit} from '@angular/core';
import {ActividadesService} from '../../servicios/actividades.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ActInsumosComponent } from '../act-insumos/act-insumos.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-form-actividad',
  templateUrl: './form-actividad.component.html',
  styleUrls: ['./form-actividad.component.scss']
})
export class FormActividadComponent implements OnInit {
  public actividad = {
      tipo:0,
      descripcion: '',
      unidad:'',
      duenio:0,
      id_us:0,
      grupos_actividad: 0,
      sub_grupo_actividad: 0
    }
    public idActividad:any;
    public grupos:any;
    public edit = false;
    public act:any;
  constructor(
    public actServ: ActividadesService,
    private route: ActivatedRoute,
    private router:Router,
    public dialogo: MatDialog
  ) { }

  ngOnInit() {
    this.actServ.getGrupos().subscribe(g=>{
      if(g){
        this.grupos = g;
        console.log(this.grupos);

      }
    });
    if(this.route.snapshot.params['id_actividad']){
      this.edit=true;
      this.idActividad = Number(this.route.snapshot.params['id_actividad']);
      this.actServ.getUno(this.idActividad).subscribe(a=>{
        if(a){
          let ac:any = a;
          ac = ac[0];
          this.actividad= ac;
          this.verAct();
        }
      });
    } else {
      this.edit = false;
    }
  }


  eventoBtn(data:any){
    this.actividad.descripcion = data.descripcion;
    this.actividad.unidad = data.unidad;
    this.actividad.grupos_actividad = data.grupos_actividad;
    console.log(this.actividad);

    this.actServ.add(this.actividad).subscribe(a=>{
      let success:any;
      if(a){
        success = a;
        console.log(success);
        //this.agregarInsumos(success.lastId);
        this.router.navigate(['form-actividad/'+success.lastId]);

        }
    })
  }

  editar(data:any){
    data.id = this.idActividad;
    console.log(data);
    this.actServ.editar(this.idActividad, data).subscribe(s=>{
      if(s){

      }
    });

  }

  agregarInsumos(tipo:any){
    let msj='';
    if(tipo==1){msj='AGREGAR MATERIAL'}
    if(tipo==2){msj='AGREGAR MANO DE OBRA'}
    if(tipo==3){msj='AGREGAR EQUIPO';}
    this.dialogo.open( ActInsumosComponent, {
        width: '80%',
        data: {
            cod:1,
            tipo:tipo,
            idActividad:this.idActividad,
            msj:msj
        }
    })
    .afterClosed()
    .subscribe((confirmado:any) => {
        if (confirmado.resultado) {
          this.verAct();
        }
        else {
            console.log(confirmado.data);
            this.verAct();
        }
    });
  }

  verAct(){
    this.actServ.verActividad(Number(this.idActividad)).subscribe(a=>{
      if(a){
        console.log(a);
        this.act = a;
        console.log("Actividad------>", this.actividad);
      }
    });
  }
  agrgarinsumo(insumo:any){
    console.log(insumo);

  }

  quitarInsumo(tipo:number, item:any){
    let id:any;
    if(tipo==1){id=item.id_rel;}
    if(tipo==2){id=item.id_rel_mat_mo;}
    if(tipo==3){id=item.id_rel_mat_equip;}

    let data = {
      insumo: tipo,
      id: Number(id)
    }
    console.log(data);

    this.actServ.quitarRelActvInsumo(data).subscribe(r=>{
      if(r){
        console.log(r);
        this.verAct();
      }
    });

  }

}
