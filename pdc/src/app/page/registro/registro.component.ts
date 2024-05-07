import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { UsersService } from 'src/app/servicios/users.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {

  public userReg = {
    mail:'',
    password:'',
    nombre:'',
    apellido:'',
    cel:''
   }
   public usuario:any;
   public registro= false;
   public cargando= false;
  public spinner= false;
  public googleLogoURL = "https://raw.githubusercontent.com/fireflysemantics/logo/master/Google.svg";
  public subscription:any;
  public user:any;
  //public isLoggedin: boolean | undefined;
  //public  socialUser: SocialUser | undefined;
  public dataLog = {
    mail: '',
    password: ''
  }
  constructor(
    public serv: UsersService,
   // private socialAuthService: SocialAuthService,
    public _router: Router,
    public _location: Location,
    private _snackBar: MatSnackBar
  ) { }


  ngOnInit() {
  }

  verificarUser(ver:any){
    this.cargando = true;
    let resp:any;
    this.serv.verificaUser(ver.mail).subscribe(v=>{
      if(v){
        resp = v;
          if(resp.success==0){
            console.log("VERIFICADOOO", v);
            this.registrar(ver);
          }
          else{
            this.cargando = false;
            this._snackBar.open('ESTE CORREO ELECTRONICO YA ESTA REGISTRADO', "CERRAR",{
              panelClass: 'snackbar-verificacion',
              horizontalPosition: 'center',
              verticalPosition: 'top',
              duration: 5000
            });

          }
      }
    });
  }

  registrar(r:any){
    let resp:any;
    console.log(r);

      this.serv.usersAdd(r).subscribe(u=>{
      if(u){
        resp = u;
        console.log(resp);
        if(resp.success==1){
          this.cargando=false;
          this._router.navigate(['login']);
        }
        else{
          this._snackBar.open('hubo un problema por favor intentelo de nuevo', "CERRAR",{
            panelClass: 'snackbar-verificacion',
            horizontalPosition: 'center',
            verticalPosition: 'top',
            duration: 5000
          });
        }
      }
    });

  }

  login(){
    this._router.navigate(['login']);

  }
}
