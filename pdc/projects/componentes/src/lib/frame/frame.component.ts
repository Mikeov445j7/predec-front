import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import * as moment from 'moment';
import { ComponentesService } from '../componentes.service';

@Component({
  selector: 'sc-frame',
  templateUrl: './frame.component.html',
  styleUrls: ['./frame.component.scss']
})
export class FrameComponent implements OnInit {

  public verMenu= false;
  public menu:any;
  public foto:any;
  public name:any;
  constructor(
    private _location: Location,
    public serv: ComponentesService,
    private router: Router,
  ) { }

  ngOnInit() {

    if(localStorage.getItem('mail')&&localStorage.getItem('id')){
      this.verMenu = true;
      this.name = localStorage.getItem('name');
//      this.router.navigate(['home']);
      if(localStorage.getItem('SFNOM')==='M1K30' || localStorage.getItem('SFNOM')==='J4V13RC' ){
        this.menu =  [
          {ruta:'proyectos', label: 'PROYECTOS', icono:'home'},
          {ruta:'crud-items', label: 'CRUD ITEMS', icono:'list'},
          {ruta:'actividades', label: 'ACTIVIDADES', icono:'list'},
          {ruta: 'gestion-de-usuarios', label:'GESTION USUARIOS', icono:'list'}
        ];
      }else{
        this.menu = [
          {ruta:'proyectos', label: 'PROYECTOS', icono:'home'},
        ];
      }
    }else{
      this.verMenu = false;
      this.router.navigate(['page']);
      //this.router.navigate(['login']);
    }
  }

  logOut(){
    this.serv.LogOut();
    this.router.navigate(['login']);
    window.location.reload();
  }


  ir(){
    this.router.navigate(['home']);
  }
  atras(){
    this._location.back();
  }
  page(){
    this.router.navigate(['page']);
  }



}
