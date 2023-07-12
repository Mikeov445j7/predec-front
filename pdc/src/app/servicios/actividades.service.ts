import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ActividadesService {

  public API = environment.url+'actividades.php';
  constructor(
      private _Http: HttpClient
  ) { }

  listarActividades(){
    return this._Http.get(this.API+"?listar=1");
  }
  verActividad(id:any){
    return this._Http.get(this.API+"?mostarAct="+id);
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
  getGrupos(){
    return this._Http.get(this.API+"?gruposA=1");
  }
  verunitAct(){
    return this._Http.get("http://localhost/pdc/pdc-back/apis/cruds/reportes.php");
  }

  relActvInsumo(data:any){
    return this._Http.post(this.API+"?relActvInsumo=1", data);
  }
  quitarRelActvInsumo(data:any){
    return this._Http.post(this.API+"?quitarRelActvInsumo=1", data);
  }

  pu(){
    return this._Http.get("http://localhost/pdc/pdc-back/apis/cruds/RpxuAct.php?pxua=1");
  }

}
