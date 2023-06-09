import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { ModulosService } from 'src/app/servicios/modulos.service';
import { ProyectosService } from '../../servicios/proyectos.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../../modal/modal.component';
import * as moment from 'moment';
import {FormModuloComponent} from '../../modulos/form-modulo/form-modulo.component';
import { ReportesService } from 'src/app/servicios/reportes.service';
import { RpresuXmodComponent } from 'src/app/reportes/RpresuXmod/RpresuXmod.component';


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
    public dialogo: MatDialog,
    public servRep:ReportesService
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
    let m:any;
    this.modServ.getModulosProyecto(this.idProyecto).subscribe(mod=>{
      if(mod){
        m=mod;
        if(m.success!=0){
          this.modulos = mod;
          console.log(this.modulos);
        } else {
          console.log("no data");

        }

      }
    });
  }


  selecItem(item:any){
    console.log(item.id_modulo);
    this.router.navigate(['ver-modulo/'+item.id_modulo]);

  }
  agregarModulo(){
    this.dialogo.open( FormModuloComponent, {
      width: '80%',
      data: {
        Proyecto: this.proyecto,
        tipo: "Crear",
        cod:1
      }
    })
    .afterClosed()
    .subscribe((confirmado:any) => {
      if (confirmado.resultado) {
        console.log(confirmado);
      }
      else {
        console.log(confirmado.data);

      }
      this.getModulos();
    });
  }

  PresMod(){

    this.dialogo.open( RpresuXmodComponent, {
      width: '80%',
      data: {
        id_proyec: this.idProyecto,
        tipo: "rpresuXmod",
        cod:1
      }
    })
    .afterClosed()
    .subscribe((confirmado:any) => {
      if (confirmado.resultado) {
        console.log(confirmado);
      }
      else {
        console.log(confirmado.data);

      }
      this.getModulos();
    });

  }

}
