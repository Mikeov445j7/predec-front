import { Component, OnInit } from '@angular/core';
import { ComponentesService } from '../componentes.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { SocialAuthService, GoogleLoginProvider, SocialUser } from 'angularx-social-login';



import * as moment from 'moment';

@Component({
  selector: 'sc-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public spinner= false;
  public googleLogoURL = "https://raw.githubusercontent.com/fireflysemantics/logo/master/Google.svg";
  public subscription:any;
  public user:any;
  public isLoggedin: boolean | undefined;
  public  socialUser: SocialUser | undefined;
  public dataLog = {
    username: '',
    password: ''
  }
  constructor(
    public serv: ComponentesService,
    private socialAuthService: SocialAuthService,
    public _router: Router,
    public _location: Location
  ) { }

  ngOnInit() {
    localStorage.removeItem('email');
    localStorage.removeItem('name');
    localStorage.removeItem('id');
    localStorage.removeItem('photoUrl');

  }


  login(loginForm: any){
      console.log(loginForm);

  }

  loginWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
    this.socialAuthService.authState.subscribe((user) => {
      if(user){
        this.spinner = true;
        this.socialUser = user;
        this.isLoggedin = (user != null);
        console.log("LISTO----------------->>",this.socialUser);
        localStorage.setItem('email', this.socialUser.email);
        localStorage.setItem('name', this.socialUser.name);
        localStorage.setItem('id', this.socialUser.id);
        localStorage.setItem('photoUrl', this.socialUser.photoUrl);
        this._router.navigate(['']);
       }
     });
  }


  mostrarMensaje(msj:any){
    console.log(msj);
  }

}
