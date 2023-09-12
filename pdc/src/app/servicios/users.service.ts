import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  public API = environment.url+"user.php"
  constructor(
    private http: HttpClient
  ) { }

    userslistar(){
      return this.http.get(this.API+"listar=1");
    }
    usersbuscar(parm:any){
      return this.http.get(this.API+"?buscar="+parm);
    }
    usersadd(data:any){
      return this.http.post(this.API+"?insertar=1", data);
    }
    userLogin(data:any){
      return this.http.post(this.API+"?login=1", data);
    }
    userseditar(id:any, data:any){
      return this.http.post(this.API+"?actualizar="+id, data);
    }
    usersborrar(id:any){
      return this.http.post(this.API+"?borrar="+id, id);
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
    userVerus(data:any){
      return this.http.post(this.API+"?verUs=1", data);
    }
    userEditar(data:any){
      return this.http.post(this.API+"?editar=1", data);
    }
    setPremiun(data:any){
      return this.http.post(this.API+"?premiun=1", data);
    }
    contarUs(){
      return this.http.get(this.API+"?contarUs=1");
    }

}
