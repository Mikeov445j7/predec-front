import { Component, OnInit } from '@angular/core';
import { ModulosService } from '../servicios/modulos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { AgregarActividadComponent } from './agregar-actividad/agregar-actividad.component';

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
      if(act){
        console.log(act);
        this.actividades = act
        for(let i=0; i<this.actividades.length; i++){
          this.actividades[i].total = Number(this.actividades[i].catidad) * Number(this.actividades[i].unitario)
        }

       /* this.dialogo.open( ModalComponent, {
            width: '80%',
            data: {
              tipo: 'Actividades',
              data: this.actividades,
              modulo: item,
              mensaje: 'Actividades del Modulo: '+item.nombre,
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
        });*/
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
    ;
    this.dialogo.open( AgregarActividadComponent, {
      width: '80%',
      data: {
        tipo: 1,

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

}
