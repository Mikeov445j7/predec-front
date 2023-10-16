import { Component, OnInit } from '@angular/core';
import { ModulosService } from '../servicios/modulos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { AgregarActividadComponent } from './agregar-actividad/agregar-actividad.component';
import { ReportesComponent } from '../reportes/reportes.component';
import { PxUactModComponent } from '../reportes/pxUactMod/pxUactMod.component';
import { EditarOrdenCantComponent } from './editarOrdenCant/editarOrdenCant.component';
import { FormModuloComponent } from './form-modulo/form-modulo.component';
import { RGattModuloComponent } from '../reportes/RGattModulo/RGattModulo.component';
import { ReportesService } from '../servicios/reportes.service';
import { Modal_PremiumComponent } from '../modal_Premium/modal_Premium.component';

@Component({
  selector: 'app-modulos',
  templateUrl: './modulos.component.html',
  styleUrls: ['./modulos.component.scss']
})
export class ModulosComponent {
  public actividades:any;
  public idModulo:any;
  public modulo:any;
  public count:any;
  public data:any;
  public PxUact:any;
  public p:any;
  public modal= false;
  public id_del:any;

  constructor(
    public modServ: ModulosService,
    private route: ActivatedRoute,
    private router:Router,
    public dialogo: MatDialog,
    public repServ: ReportesService,
    public dia: MatDialog,
  ){}



  ngOnInit(){
    if(this.route.snapshot.params['idModulo']){
      this.p = localStorage.getItem('ygtErd#22');
      console.log("");
      this.idModulo = Number(this.route.snapshot.params['idModulo']);
      console.log(this.idModulo);
      this.verModulo();
    }

  }

  verModulo(){
    this.modServ.getUno(this.idModulo).subscribe(m=>{

      if(m){
        this.modulo = m;
        this.modulo = this.modulo[0];
        this.data = {
          idModulo: this.idModulo,
          id_proyec: this.modulo.id_proyec,
          orden: this.modulo.orden,
          nombre: this.modulo.nombre,
          codigo: this.modulo.codigo,
          id_modOr: this.modulo.id_modOr,
          fecha_inicio: this.modulo.fecha_inicio,
          ordenado:this.modulo.ordenado
        }
        this.verActividades2();
      }
    });
  }


  verActividades2(){
     this.repServ.PUXact(this.data).subscribe(pu=>{
      this.PxUact = pu;
      console.log("----------------------------",this.PxUact);
      if(this.PxUact.success!==0){
        for(let i=0; i<this.PxUact.length; i++){
          let gg = 0;
          gg = Number(this.PxUact[i].manoObra.E)*(this.PxUact[i].he_men/100);
          this.PxUact[i].equipo.H = Number(this.PxUact[i].equipo.F)+Number(gg);
          let ii = 0;
          ii =  (Number(this.PxUact[i].materiales.A) + Number(this.PxUact[i].manoObra.E) + Number(this.PxUact[i].equipo.H))*(Number(this.PxUact[i].g_grales)/100);
          let jj = 0;
          jj = (Number(this.PxUact[i].materiales.A) + Number(this.PxUact[i].manoObra.E) + Number(this.PxUact[i].equipo.H)+ii)*(Number(this.PxUact[i].utilidad)/100);
          let kk = 0;
          kk = (Number(this.PxUact[i].materiales.A) + Number(this.PxUact[i].manoObra.E) + Number(this.PxUact[i].equipo.H)+ii+jj)*(Number(this.PxUact[i].it)/100);
          let ll = 0;
          ll = (Number(this.PxUact[i].materiales.A) + Number(this.PxUact[i].manoObra.E) + Number(this.PxUact[i].equipo.H)+ii+jj+kk);
          this.PxUact[i].I = ii.toFixed(2);
          this.PxUact[i].J = jj.toFixed(2);
          this.PxUact[i].K = kk.toFixed(2);
          this.PxUact[i].L = ll.toFixed(2);
          this.PxUact[i].G = gg.toFixed(2);
        }
        for(let i=0; i<this.PxUact.length; i++){
          this.PxUact[i].totalMod =  Number(this.PxUact[i].L) * Number(this.PxUact[i].cantidad);
          this.PxUact[i].totalMod = this.PxUact[i].totalMod.toFixed(2);
        }
        this.count = this.PxUact.length;
        this.count = Number(this.count)+1;

        console.log("----------------------------",this.PxUact);

      }else {
        this.PxUact =[];
        this.count  = 1
      }
    });
  }

  verAct(item:any){

    console.log("----------------------",item);
          this.dialogo.open( ModalComponent, {
            width: '80%',
            data: {
              tipo: 1,
              data: item.id_actividad,
              mensaje: 'Actividad: '+item.actividad,
              cod:1
            }
        })
        .afterClosed()
        .subscribe((confirmado:any) => {
          if (confirmado.resultado) {
          }
          else {
              console.log(confirmado.data);
          }
        });

  }

  agregarActividad(){

    this.dialogo.open( AgregarActividadComponent, {
      width: '80%',
      data: {
        modulo: this.modulo,
        cantActiv: this.count,
        tipo: 2,
        cod:1
      }
    })
    .afterClosed()
    .subscribe((confirmado:any) => {
      if (confirmado.resultado) {
        this.verModulo();
      }
      else {
        console.log(confirmado.data);
        this.verModulo();
      }
        this.verModulo();
    });
  }

  verificarPremiun(r:any, item:any){
    if( this.p == 7 || this.p == 8 ){

      if(r==1){
        this.editarOrdenCant(item);
      }
      if(r==2){
        this.quitar();
      }

    }
    else{
      console.log("NOOOOOOOOOO");
      this.dia.open( Modal_PremiumComponent, {
        width: '80%',
        data: {

        }
      })
      .afterClosed()
      .subscribe((confirmado:any) => {
        if (confirmado.resultado) {

        }
        else {
          console.log(confirmado.data);

        }

      });

    }

  }

  pu(){
    let data = {
      idModulo:this.idModulo,
      id_proyec: this.modulo.id_proyec,
      mod: this.modulo
    }

    this.dialogo.open( PxUactModComponent, {
      width: '80%',
      data: {
        idModulo:this.idModulo,
        id_proyec: this.modulo.id_proyec,
        mod: this.modulo
      }
    })
    .afterClosed()
    .subscribe((confirmado:any) => {
      if (confirmado.resultado) {
        this.verModulo();
      }
      else {
        console.log(confirmado.data);
        this.verModulo();
      }
      this.verModulo();
    });

  }

  editarOrdenCant(item:any){
    this.dialogo.open( EditarOrdenCantComponent, {
      width: '80%',
      data: {
        modulo: this.modulo,
        actividad: item,
        tipo: 2,
        cod:1
      }
    })
    .afterClosed()
    .subscribe((confirmado:any) => {
      if (confirmado.resultado) {
        this.verModulo();
      }
      else {
        console.log(confirmado.data);
        this.verModulo();
      }
      this.verModulo();
    });
  }

  editarmodulo(modulo:any){

    this.dialogo.open( FormModuloComponent, {
      width: '80%',
      data: {
        modulo: modulo,
        tipo: 2,
        cod:1
      }
    })
    .afterClosed()
    .subscribe((confirmado:any) => {
      if (confirmado.resultado) {
        this.verModulo();
      }
      else {
        console.log(confirmado.data);
        this.verModulo();
      }
      this.verModulo();
    });

  }

  gantt(){
    this.dialogo.open( RGattModuloComponent, {
      width: '80%',
      data: {
        lista: 'buuu',
        tipo: 2,
        cod:1
      }
    })
    .afterClosed()
    .subscribe((confirmado:any) => {
      if (confirmado.resultado) {
        this.verModulo();
      }
      else {
        console.log(confirmado.data);
        this.verModulo();
      }
      this.verModulo();
    });

  }

  abrirModal(id:any){
    this.modal = true;
    this.id_del = Number(id);
  }

  afirmativo(){
    this.quitar();
  }

  closeModal(){
    this.modal = false;
    this.id_del = 0
  }


  quitar(){
    console.log(this.id_del);
    this.modServ.quitarActividad(this.id_del).subscribe(m=>{
      if(m){
        console.log(m);
        this.verModulo();
        this.modal = false;
      }
    });
  }


}
