import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, retry } from 'rxjs/operators';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class ComponentesService {

  constructor(
    private http:HttpClient
  ) { }
  loginGmail(SocialU:any){
    const Email= SocialU.email;
    const Id= SocialU.id;
    const Name= SocialU.name;
    const PhotoUrl= SocialU.photoUrl;
    const FirstName= SocialU.firstName;
    const LastName= SocialU.lastName;
    const AuthToken= SocialU.authToken;
    const IdToken= SocialU.idToken
    return Email
  }

  LogOut(){
    localStorage.removeItem('email');
    localStorage.removeItem('name');
    localStorage.removeItem('id');
    localStorage.removeItem('photoUrl');
    return "sesion terminada";
  }
}
