import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProyectosService } from 'src/app/servicios/proyectos.service';
import * as moment from 'moment';
import { UsersService } from 'src/app/servicios/users.service';

@Component({
  selector: 'app-setPremiun',
  templateUrl: './setPremiun.component.html',
  styleUrls: ['./setPremiun.component.scss']
})
export class SetPremiunComponent implements OnInit {

  public usuario:any;
  public id_us:any;
  public autorizado = true;
  public fechaToday = moment().format();
  public fechaMes:any;
  public fechaAnio:any;
  constructor(
    private route: ActivatedRoute,
    private router:Router,
    private usServ: UsersService,
  ) { }

  ngOnInit() {
    console.log(this.route.snapshot.params['us']);

    if(this.route.snapshot.params['us']){

      this.fechaMes = moment(this.fechaToday).add(31, 'd');
      this.fechaAnio = moment(this.fechaToday).add(366, 'd');

      this.fechaMes = moment(this.fechaMes).format('YYYY-M-D');
      this.fechaAnio = moment(this.fechaAnio).format('YYYY-M-D');

      if(localStorage.getItem('SFNOM') == 'J4V13RC' || localStorage.getItem('SFNOM') == 'M1K30'){
        this.autorizado = true;
        this.id_us = this.route.snapshot.params['us'];
        console.log(this.usuario);
        let data = {
          id_us: this.id_us
        }
        this.usServ.userVerus(data).subscribe(u=>{
          console.log(u);
          if(u){
            this.usuario = u;
            this.usuario = this.usuario[0];
            console.log(this.usuario);
          }
        });
      }else{
        this.router.navigate(['home']);
      }



    }
  }
  SetPremiun(t:any){
    let data = {};
    if(t==1){
      data = {
        id_us: this.id_us,
        fecha_Expiracion: this.fechaMes
      }
    }
    if(t==2){
     data = {
        id_us: this.id_us,
        fecha_Expiracion: this.fechaAnio
      }
    }
    this.usServ.setPremiun(data).subscribe(p=>{
      console.log(p);
      this.router.navigate(['gestion-de-usuarios']);


    });
  }

  atras(){
    this.router.navigate(['page']);
  }

}
