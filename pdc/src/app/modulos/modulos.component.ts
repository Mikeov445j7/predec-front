import { Component, OnInit } from '@angular/core';
import { ModulosService } from '../servicios/modulos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { AgregarActividadComponent } from './agregar-actividad/agregar-actividad.component';
import { ReportesComponent } from '../reportes/reportes.component';
import { PxUactModComponent } from '../reportes/pxUactMod/pxUactMod.component';

@Component({
  selector: 'app-modulos',
  templateUrl: './modulos.component.html',
  styleUrls: ['./modulos.component.scss']
})
export class ModulosComponent {
  public actividades:any;
  public idModulo:any;
  public modulo:any;
  constructor(
    public modServ: ModulosService,
    private route: ActivatedRoute,
    private router:Router,
    public dialogo: MatDialog
  ){}



  ngOnInit(){
    if(this.route.snapshot.params['idModulo']){
      console.log("");
      this.idModulo = Number(this.route.snapshot.params['idModulo']);
      console.log(this.idModulo);
      this.verModulo();
    }
  }

  verModulo(){
    this.modServ.getUno(this.idModulo).subscribe(m=>{

      if(m){
        console.log(m);
        this.modulo = m;
        this.modulo = this.modulo[0];
        this.verActividades();
      }
    });
  }

  verActividades(){
    this.modServ.getACtividadesModulo(this.idModulo).subscribe(act=>{
      let a:any;
      if(act){
        a = act;
        if(a.success!=0){
          this.actividades = act
          for(let i=0; i<this.actividades.length; i++){
            this.actividades[i].total = Number(this.actividades[i].catidad) * Number(this.actividades[i].unitario)
          }
        }
        else{
          console.log("sin datos");

        }
        console.log(this.actividades);

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
              mensaje: 'Actividad: '+item.descripcion,
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
        tipo: 2,
        cod:1
      }
    })
    .afterClosed()
    .subscribe((confirmado:any) => {
      if (confirmado.resultado) {
          this.verActividades();
      }
      else {
        console.log(confirmado.data);
        this.verActividades();
      }
        this.verActividades();
    });
  }

  quitar(id:any){
    console.log(id);
    this.modServ.quitarActividad(id).subscribe(m=>{
      if(m){
        console.log(m);
        window.location.reload();
      }
    });
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
          this.verActividades();
      }
      else {
        console.log(confirmado.data);
        this.verActividades();
      }
        this.verActividades();
    });

  }
}
