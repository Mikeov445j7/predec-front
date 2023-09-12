import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsersService } from '../servicios/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import * as moment from 'moment';



@Component({
  selector: 'app-upgrade',
  templateUrl: './upgrade.component.html',
  styleUrls: ['./upgrade.component.scss']
})
export class UpgradeComponent implements OnInit {

public a=false;
public usuario:any;
public usData = {
	nombre:"",
  apellido:"",
  ci:"",
  cel:"",
  mail:""
}
  public id_us:any;
  constructor(
    //public dialogo: MatDialogRef<UpgradeComponent>,
   // @Inject(MAT_DIALOG_DATA) public data:any,
    private usServ: UsersService,
    private route: ActivatedRoute,
    private router:Router,

  ) { }

  ngOnInit() {
    this.id_us = localStorage.getItem('id');
    let data = {
      id_us: this.id_us
    }
    this.usServ.userVerus(data).subscribe(u=>{
      if(u){
        this.usuario = u;
        this.usuario = this.usuario[0];
        console.log(this.usuario);
        this.usData.nombre = this.usuario.nombre;
        this.usData.apellido = this.usuario.apellido;
        this.usData.ci = this.usuario.ci;
        this.usData.cel = this.usuario.cel;
        this.usData.mail = this.usuario.mail;
      }
    });
  }

  save(val:any){
    console.log(val);
    val.id_us = this.id_us;
    this.usServ.userEditar(val).subscribe(e=>{
      console.log(e);
    });

  }
  Aceptar(v:any){
    if(v._checked===true){
      this.a=true;
      console.log(v._checked);
    }else{
      this.a=false;
    }
  }
}
