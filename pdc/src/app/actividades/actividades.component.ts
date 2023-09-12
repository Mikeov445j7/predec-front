import { Component, OnInit } from '@angular/core';
import {ActividadesService} from '../servicios/actividades.service';
import { ReportesService } from '../servicios/reportes.service';
import { MatDialog } from '@angular/material/dialog';
import { FormActividadComponent } from './form-actividad/form-actividad.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.component.html',
  styleUrls: ['./actividades.component.scss']
})
export class ActividadesComponent {
  public r:any;
  public actividades:any= [];
  public idModulo:any;
  public modulo:any;
  public results:any;
  public mostrar=false;
  constructor(
    private router:Router,
    public repServ:ReportesService,
    public actServ: ActividadesService,
    public dialogo: MatDialog
  ){}
  ngOnInit(){

  }
  buscarItem(param:any){
    if(param.length>=3){
      this.actServ.buscar(param).subscribe(a=>{
        if(a){
          console.log(a);
          this.actividades = a;
          this.mostrar = true;
        }
      });
    } else {
      this.mostrar = false;
    }
  }
  agregarItem(item:any){
    this.router.navigate(['form-actividad']);
  }
  selecItem(i:any){
    console.log(i.id_actividad);
    this.router.navigate(['form-actividad/'+i.id_actividad]);
  }
}
