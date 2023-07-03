import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
  })
export class EquipoService {
  public API = environment.url+'equipo.php';

  constructor(
      private _Http: HttpClient
  ) { }
  ver(){
    return this._Http.get(this.API+"?listar=1");
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
  editar(id:any, data:any){
    return this._Http.post(this.API+"?actualizar="+id, data);
  }
  borrar(id:any){
    return this._Http.post(this.API+"?borrar="+id, id);
  }
}
