import { Component, OnInit, Input } from '@angular/core';

import { Router } from '@angular/router';

import * as moment from 'moment';
import { ComponentesService } from '../componentes.service';

@Component({
  selector: 'sc-frame',
  templateUrl: './frame.component.html',
  styleUrls: ['./frame.component.scss']
})
export class FrameComponent implements OnInit {
  public menu = [
    {ruta:'proyectos', label: 'PROYECTOS', icono:'home'},
    {ruta:'crud-items', label: 'CRUD ITEMS', icono:'list'},
  ];
  public verMenu= false;
  public foto:any;
  public name:any;
  constructor(
    public serv: ComponentesService,
    private router: Router,
  ) { }

  ngOnInit() {
    console.log(localStorage.getItem('mail'));

    if(localStorage.getItem('mail')&&localStorage.getItem('id')){
      this.verMenu = true;
      this.name = localStorage.getItem('name');
    }else{
      this.router.navigate(['login']);
    }
  }

  logOut(){
    this.serv.LogOut();
    this.router.navigate(['login']);
    window.location.reload();
  }


}
