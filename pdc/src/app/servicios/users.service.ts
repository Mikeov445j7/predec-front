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
    private _Http: HttpClient
  ) { }

    userslistar(){
      return this._Http.get(this.API+"listar=1");
    }
    usersbuscar(parm:any){
      return this._Http.get(this.API+"?buscar="+parm);
    }
    usersadd(data:any){
      return this._Http.post(this.API+"?insertar=1", data);
    }
    userseditar(id:any, data:any){
      return this._Http.post(this.API+"?actualizar="+id, data);
    }
    usersborrar(id:any){
      return this._Http.post(this.API+"?borrar="+id, id);
    }

}
