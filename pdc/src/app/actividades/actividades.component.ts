import { Component, OnInit } from '@angular/core';
import {ActividadesService} from '../servicios/actividades.service';

@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.component.html',
  styleUrls: ['./actividades.component.scss']
})
export class ActividadesComponent {
  public actividades:any;
  public idModulo:any;
  public modulo:any;
  constructor(
    public actServ: ActividadesService,

  ){}



  ngOnInit(){
      this.actServ.verunitAct().subscribe(t=>{
        if(t){
          console.log(t);

        }
      });
  }

}
