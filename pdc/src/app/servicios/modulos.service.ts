import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModulosService {

  API:string='http://localhost/pdc/pdc-back/apis/cruds/modulos.php';//http://boliviadark.com/apis/
  //API:string='https://boliviadark.com/apis/modulos.php';
  constructor(
    private _Http: HttpClient
  ) { }
    getModulosProyecto(id_proyec:any){
      return this._Http.get(this.API+"?proyecto="+id_proyec);
    }
    getACtividadesModulo(id_modulo:any){
      return this._Http.get(this.API+"?modulo="+id_modulo);
    }

    ver(){
      return this._Http.get(this.API);
    }
    getUno(id:any){
      return this._Http.get(this.API+"?consultar="+id);
    }
    getProyectosUsuario(id_us:any){
      return this._Http.get(this.API+"?id_us="+id_us);
    }
    buscarPU(parm:any, id_us:any){
      const dat = {
        id_us:id_us,
        param:parm
      }
      return this._Http.post(this.API+"?buscarPUS="+id_us, dat);
    }
    buscar(parm:any){
      return this._Http.get(this.API+"?buscar="+parm);
    }
    add(data:any){
      return this._Http.post(this.API+"?insertar=1", data);
    }
    agregarActividad(id:any, data:any){
      return this._Http.post(this.API+"?agregarAct="+id, data);

    }
    editar(id:any, data:any){
      return this._Http.post(this.API+"?actualizar="+id, data);
    }
    borrar(id:any){
      return this._Http.post(this.API+"?borrar="+id, id);
    }

}
