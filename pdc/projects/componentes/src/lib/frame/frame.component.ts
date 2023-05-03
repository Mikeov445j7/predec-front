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
    if(localStorage.getItem('email')&&localStorage.getItem('id')){
      this.verMenu = true;
      console.log('holaaaaaaaa');

      if(localStorage.getItem('photoUrl')){
        this.foto = localStorage.getItem('photoUrl');
      }else{
        this.foto = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png';
      }
      if(localStorage.getItem('name')){
        this.name = localStorage.getItem('name');
      }else{
        this.name = '';
      }
      console.log(this.foto);

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
