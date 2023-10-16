import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PreciosUsuarioService {


public API = environment.url+'preciosUsuario.php';

constructor(
  private _Http: HttpClient
) { }
  ver(data:any){
    return this._Http.post(this.API+"?listar=1", data);
  }
  getUno(id:any){
    return this._Http.get(this.API+"?consultar="+id);
  }
  buscar(parm:any){
    return this._Http.get(this.API+"?buscar="+parm);
  }
  add(data:any){
    return this._Http.post(this.API+"?insertar=1", data);
  }
  editar(data:any){
    return this._Http.post(this.API+"?actualizar=1", data);
  }
  borrar(data:any){
    return this._Http.post(this.API+"?borrar=1", data);
  }
  verificar(data:any){
    return this._Http.post(this.API+"?verificar=1", data);
  }

}
