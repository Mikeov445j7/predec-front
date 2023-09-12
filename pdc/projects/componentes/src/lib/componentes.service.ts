import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, retry } from 'rxjs/operators';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class ComponentesService {
   //API:string='http://localhost/pdc/pdc-back/apis/cruds/user.php';

   //API:string='https://boliviadark.com/apis/user.php';
   API:string='https://www.predeconst.online/apis/user.php';
  constructor(
    private http:HttpClient,
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
    localStorage.removeItem('SFNOM');
    localStorage.removeItem('ygtErd#22');
     return "sesion terminada";
  }
  usersListar(){
    return this.http.get(this.API+"?listar=1");
  }
  userLogin(data:any){
    return this.http.post(this.API+"?login=1", data);
  }

  usersBuscar(parm:any){
    return this.http.get(this.API+"?buscar="+parm);
  }
  verificaUser(mail:any){
    return this.http.get(this.API+"?verificauser="+mail);
  }
  usersAdd(data:any){
    return this.http.post(this.API+"?insertar=1", data);
  }
  usersEditar(id:any, data:any){
    return this.http.post(this.API+"?actualizar="+id, data);
  }
  usersBorrar(id:any){
    return this.http.post(this.API+"?borrar="+id, id);
  }
}
