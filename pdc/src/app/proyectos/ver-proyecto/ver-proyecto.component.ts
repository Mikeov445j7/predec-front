import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { ModulosService } from 'src/app/servicios/modulos.service';
import { ProyectosService } from '../../servicios/proyectos.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../../modal/modal.component';
import * as moment from 'moment';

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
  constructor(
    public proyecServ: ProyectosService,
    public modServ: ModulosService,
    private route: ActivatedRoute,
    private router:Router,
    public dialogo: MatDialog
  ) { }

  ngOnInit() {
    if(this.route.snapshot.params['idProyecto']){
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
        this.getModulos()
      }
    });
  }

  getModulos(){
    this.modServ.getModulosProyecto(this.idProyecto).subscribe(mod=>{
      if(mod){
        this.modulos = mod;
        console.log(this.modulos);
      }
    });
  }


  selecItem(item:any){
    console.log(item.id_modulo);
    this.modServ.getACtividadesModulo(item.id_modulo).subscribe(act=>{
      if(act){
        console.log(act);
        this.actividades = act
        for(let i=0; i<this.actividades.length; i++){
          this.actividades[i].total = Number(this.actividades[i].catidad) * Number(this.actividades[i].unitario)
        }
        this.dialogo.open( ModalComponent, {
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
        });
      }
    });

  }

}
