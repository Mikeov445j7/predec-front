import { Component, OnInit } from '@angular/core';
import { ComponentesService } from '../componentes.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
//import { SocialAuthService, GoogleLoginProvider, SocialUser } from 'angularx-social-login';



import * as moment from 'moment';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'sc-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public userReg = {
    mail:'',
    password:'',
    nombre:'',
    apellido:''
   }
   public usuario:any;
   public registro= false;
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
    public serv: ComponentesService,
   // private socialAuthService: SocialAuthService,
    public _router: Router,
    public _location: Location,
    private _snackBar: MatSnackBar

  ) { }

  ngOnInit() {
    if(localStorage.getItem('mail')&&localStorage.getItem('id')){
      this._router.navigate(['home']);
    } else{
      localStorage.removeItem('mail');
      localStorage.removeItem('name');
      localStorage.removeItem('id');
    }

  }

  login(loginForm: any){
    this.spinner = true;
    let l:any;
      console.log(loginForm);
      this.serv.userLogin(loginForm).subscribe(l=>{
        if(l){
          console.log(l);
          this.usuario = l;
          this.usuario = this.usuario[0];
          console.log(this.usuario);

          localStorage.setItem('mail', this.usuario.mail);
          localStorage.setItem('name', this.usuario.nombre+" "+this.usuario.apellido);
          localStorage.setItem('id', this.usuario.id_us);
          localStorage.setItem('ygtErd#22',  this.usuario.premiun);
          localStorage.setItem('SFNOM',  this.usuario.ip_user);

          window.location.reload();

          this.spinner = true;
          //localStorage.setItem('photoUrl', this.socialUser.photoUrl);
        } else {
          this._snackBar.open('Usuario no Encontrado revise sus datos ', "CERRAR",{
            panelClass: 'snackbar-verificacion',
            horizontalPosition: 'center',
            verticalPosition: 'top',
            duration: 5000
          });
          this.spinner = false;
        }
      });
  }
  mostrarMensaje(msj:any){
    console.log(msj);
  }
  formRegistro(){
    this.registro =true;
  }
  NoformRegistro(){
    this.registro =false;
  }

  verificarUser(ver:any){
    let resp:any;
    this.serv.verificaUser(ver.mail).subscribe(v=>{
      if(v){
        resp = v;
          if(resp.success==0){
            console.log("VERIFICADOOO", v);
            this.registrar(ver);
          }
          else{
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
          this.registro=false;
          this.ngOnInit();
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

  reloadCurrentRoute() {

  }

  inicio(){
    this._router.navigate(['page']);
  }

}
