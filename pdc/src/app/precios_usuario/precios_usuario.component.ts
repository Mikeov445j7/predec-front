import { Component, OnInit, Inject } from '@angular/core';
import { ReportesService } from '../servicios/reportes.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ProyectosService } from 'src/app/servicios/proyectos.service';
import { UsersService } from 'src/app/servicios/users.service';
import { PreciosUsuarioService } from '../servicios/preciosUsuario.service';
import { Modal_PremiumComponent } from '../modal_Premium/modal_Premium.component';
import { EquipoService } from '../servicios/equipo.service';
import { ManoDeObraService } from '../servicios/mano-de-obra.service';
import { MaterialesService } from '../servicios/materiales.service';

@Component({
  selector: 'app-precios_usuario',
  templateUrl: './precios_usuario.component.html',
  styleUrls: ['./precios_usuario.component.scss']
})
export class Precios_usuarioComponent implements OnInit {
  public contar:any;
  public usuarios:any;
  public usDestino:any;
  public mostrar=false;
  public aceptar=false;
  public id_proyec:any;
  public enviado=false;
  public p:any;
  public Premium=false;
  public cargando=false;
  public results:any = [];
  public results2:any = [];
  public item:any;
  public idUs:any;
  public dataPu:any;
  public formPU = false;
  public selectItem= false;
  public misPrecios:any;
  public verMisPU=true;
  public modal= false;
  public modal2= false;
  public id_del:any;
  public editar = false;
  public edit:any;
  public itemsTipo = [
    {
      id:3,
      desc: 'MATERIALES'
    },
    {
      id:2,
      desc: 'MANO DE OBRA'
    },
    {
      id:1,
      desc: 'EQUIPO'
    }

  ];


  constructor(
    public proyecServ: ProyectosService,
    public dialogo: MatDialogRef<Precios_usuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    public precioServ: PreciosUsuarioService,
    public dia: MatDialog,
    public eqServ:EquipoService,
    public moServ:ManoDeObraService,
    public matServ:MaterialesService,
    public RepServ:ReportesService,
    private router:Router,

  ) { }

  ngOnInit() {
    this.p = localStorage.getItem('ygtErd#22');
    this.idUs = localStorage.getItem('id');
    console.log(this.data);
    this.id_proyec = this.data.id_proyec;
    this.verificarPremiun();
    //this.listar();

  }

  verificarPremiun(){
    if( this.p == 7 || this.p == 8 ){
        this.Premium = true;
        this.getPrecios();
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

  getPrecios(){
    this.editar = false;
    let data = {
      id_proyecto: this.id_proyec
    }
    this.precioServ.ver(data).subscribe(p=>{
      this.misPrecios = p;

      if(this.misPrecios.materiales!=0){
        for(let i=0; i<this.misPrecios.materiales.length; i++){
          this.misPrecios.materiales[i].item = 3;
        }
      }
      if(this.misPrecios.manoObra!=0){
        for(let i=0; i<this.misPrecios.manoObra.length; i++){
          this.misPrecios.manoObra[i].item = 2;
        }
      }
      if(this.misPrecios.equipo!=0){
        for(let i=0; i<this.misPrecios.equipo.length; i++){
          this.misPrecios.equipo[i].item = 1;
        }
      }
      console.log(this.misPrecios);
    });
    this.selectItem = false;
    this.verMisPU=true;
  }

  /*listar(){
    let data = {
      id_proyec: this.id_proyec
    }
    switch(this.item){
      case 1:
        this.eqServ.ver().subscribe(e=>{
          if(e){
            this.results = e;
            console.log(this.results);

          }
          this.getInsumosProyecto();

        });
      break;
      case 2:
        this.moServ.ver().subscribe(e=>{
          if(e){
            this.results = e;
            console.log(this.results);

          }
        });

      break;
      case 3:
        this.matServ.ver().subscribe(e=>{
          if(e){
            this.results = e;
            console.log(this.results);

          }
        });
      break;
    }

    this.selectItem = false;
  }*/
  listar(){
    let data = {
      id_proyec: this.id_proyec
    }
    switch(this.item){
      case 1:
        this.RepServ.RtotalEquipoxModu(data).subscribe(t=>{
          let i:any;
          i = t;
          console.log(i);

          for(let j=0;j<i.modulos.length;j++){

            for(let k=0; k<i.modulos[j].insumos.length; k++){
              i.modulos[j].insumos[k].descripcion= i.modulos[j].insumos[k].insumo;
              i.modulos[j].insumos[k].id_equip= i.modulos[j].insumos[k].idInsumo;
              i.modulos[j].insumos[k].cant= i.modulos[j].insumos[k].cantXactiv;
              i.modulos[j].insumos[k].unidad= i.modulos[j].insumos[k].unid;
              i.modulos[j].insumos[k].PU= i.modulos[j].insumos[k].pUnitario;
            }

          }
          i = i.modulos;
          this.results = i;
          console.log(this.results);
        });
      break;
      case 2:
        this.RepServ.RtotalManoObraxModu(data).subscribe(t=>{
          let i:any;
          i = t;
          for(let j=0;j<i.modulos.length;j++){

            for(let k=0; k<i.modulos[j].insumos.length; k++){
              i.modulos[j].insumos[k].descripcion= i.modulos[j].insumos[k].insumo;
              i.modulos[j].insumos[k].id_mo= i.modulos[j].insumos[k].idInsumo;
              i.modulos[j].insumos[k].cant= i.modulos[j].insumos[k].cantXactiv;
              i.modulos[j].insumos[k].unidad= i.modulos[j].insumos[k].unid;
              i.modulos[j].insumos[k].PU= i.modulos[j].insumos[k].pUnitario;
            }

          }
          i = i.modulos;
          this.results = i;
          console.log(this.results);
        });

      break;
      case 3:
        this.RepServ.RtotalMatxModu(data).subscribe(t=>{
          let i:any;
          i = t;
          for(let j=0;j<i.modulos.length;j++){

            for(let k=0; k<i.modulos[j].insumos.length; k++){
              i.modulos[j].insumos[k].descripcion= i.modulos[j].insumos[k].insumo;
              i.modulos[j].insumos[k].id_mat= i.modulos[j].insumos[k].idMaterial;
              i.modulos[j].insumos[k].cant= i.modulos[j].insumos[k].cantXactiv;
              i.modulos[j].insumos[k].unidad= i.modulos[j].insumos[k].unid;
              i.modulos[j].insumos[k].PU= i.modulos[j].insumos[k].pUnitario;
            }

          }
          i = i.modulos;
          this.results = i;
          console.log(this.results);
        });
      break;
    }

    this.selectItem = false;
  }
  getInsumosProyecto(){
    let insumo = [];
    let data = {
      id_proyec: this.id_proyec
    }

    this.RepServ.RtotalEquipoxModu(data).subscribe(t=>{
      let i:any;
      i = t;
      i = i.modulos[0].insumos;
      console.log(i);
    });

  }

  buscarItem(param:any){
    this.selectItem = false;
    this.verMisPU=false;
    if(param.length>=3){
      switch(this.item){
        case 1:
          this.eqServ.buscar(param).subscribe(e=>{
            if(e){
              this.results = e;
              console.log(this.results);
            }
          });
        break;
        case 2:
          this.moServ.buscar(param).subscribe(e=>{
            if(e){
              this.results = e;
              console.log(this.results);
            }
          });

        break;
        case 3:
          this.matServ.buscar(param).subscribe(e=>{
            if(e){
              this.results = e;
              console.log(this.results);
            }
          });

        break;

      }
    }
  }

  getTipo(e:any){
    this.item = Number(e.value);
    this.cargando=true;
    this.verMisPU= false;
    this.listar();
  }

  selecItem(i:any){
    console.log(i);
    let idItem:any;
    let tabla:any;
    this.verMisPU=false;
    if(this.item==1){
      idItem =i.id_equip;
      tabla = 'pu_us_eq';
    }
    if(this.item==2){
      idItem =i.id_mo;
      tabla = 'pu_us_mo';
    }
    if(this.item==3){
      idItem =i.id_mat;
      tabla = 'pu_us_mat';
    }
    console.log(idItem);
    this.dataPu = {
      id_insumo: idItem,
      id_usuario: this.idUs,
      id_proyecto: this.id_proyec,
      tabla: tabla,
      tipo: this.item,
      pu_us: 0
    }
    console.log(this.dataPu);
    this.getItem();
  }

  selecItem2(i:any){
    console.log(i);
    let idItem:any;
    let tabla:any;
    this.verMisPU=false;
    if(i.item==1){
      idItem =i.id_equip;
      tabla = 'pu_us_eq';
    }
    if(i.item==2){
      idItem =i.id_mo;
      tabla = 'pu_us_mo';
    }
    if(i.item==3){
      idItem =i.id_mat;
      tabla = 'pu_us_mat';
    }
    console.log(idItem);
    this.dataPu = {
      id_insumo: idItem,
      id_usuario: this.idUs,
      id_proyecto: this.id_proyec,
      tabla: tabla,
      tipo: i.item,
      pu_us: 0
    }
    console.log(this.dataPu);
    this.item = i.item;
    this.getItem();
  }




  getItem(){
    this.editar = true;
    switch(this.item){
      case 1:
        this.eqServ.getUno(this.dataPu.id_insumo).subscribe(e=>{
          if(e){
            this.edit = e;
            console.log("aquiiiiiiiii", this.edit);
          }
        });
      break;
      case 2:
        this.moServ.getUno(this.dataPu.id_insumo).subscribe(e=>{
          if(e){
            this.edit  = e;
            console.log("aquiiiiiiiii", this.edit);
          }
        });

      break;
      case 3:
        this.matServ.getUno(this.dataPu.id_insumo).subscribe(e=>{
          if(e){
            this.edit  = e;
            console.log("aquiiiiiiiii", this.edit);
          }
        });
      break;
    }
    this.selectItem = true;


    this.getPUS();
  }
  getPUS(){
    this.precioServ.verificar(this.dataPu).subscribe(v=>{
      let ve:any = v;
      console.log("-------------------------->>",ve);
      if(ve.success==1){
        this.edit[0].pu_us = Number(ve.id[0].pu_us);
      }
    });
  }


  pus(pu:any){
    console.log(this.dataPu);
    this.precioServ.verificar(this.dataPu).subscribe(v=>{
      let ve:any = v;
      console.log(v);
      if(ve.success==1){
        let id:any = ve.id;
        id = id[0];
        console.log("EIDTAR!!!!! id---->>>",id);
        this.dataPu.pu_us = Number(pu);
        this.dataPu.id = Number(id.id);
        console.log(this.dataPu);
        this.precioServ.editar(this.dataPu).subscribe(p=>{
          let r:any = p;
          console.log(r);
          if(r.success==1){
            console.log(r);
            this.getPrecios();
            this.selectItem = false;
          }
        });
      }
      if(ve.success==0){
        console.log("GUARDAR");
          this.dataPu.pu_us = Number(pu);
          this.precioServ.add(this.dataPu).subscribe(p=>{
            let r:any = p;
            if(r.success==1){
              console.log(r.success);
              this.getPrecios();
              this.selectItem = false;
            }
          });
      }
    });

  }

  cerrarDialogo(): void {
    const respuesta = {
      resultado:true,
      data: "Operación Cancelada"
    }
    this.dialogo.close(respuesta);
  }

  quitar(){

  }

  abrirModal(i:any){
    console.log(i);

    this.modal = true;
    let idItem:any;
    let tabla:any;
    if(i.item==1){
      idItem =i.id_equip;
      tabla = 'pu_us_eq';
    }
    if(i.item==2){
      idItem =i.id_mo;
      tabla = 'pu_us_mo';
    }
    if(i.item==3){
      idItem =i.id_mat;
      tabla = 'pu_us_mat';
    }
    console.log(idItem);
    this.dataPu = {
      id_insumo: idItem,
      id_usuario: this.idUs,
      id_proyecto: this.id_proyec,
      tabla: tabla,
      tipo: i.item,
      pu_us: 0,
      id: i.id
    }
    console.log(this.dataPu);
    //this.id_del = Number(id);
  }

  afirmativo(){
    this.precioServ.borrar(this.dataPu).subscribe(d=>{
      console.log(d);
      this.getPrecios();
      this.modal = false;

    });

  }

  closeModal(){
    this.modal = false;
    this.id_del = 0
  }

}
