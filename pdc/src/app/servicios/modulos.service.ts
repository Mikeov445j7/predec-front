import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ModulosService {

  public API = environment.url+'modulos.php';

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
    quitarActividad(id:any){
      return this._Http.post(this.API+"?quitarAct="+id, id);
    }
    editar(data:any){
      return this._Http.post(this.API+"?actualizar=1", data);
    }
    borrar(id:any){
      return this._Http.post(this.API+"?borrar=1", id);
    }

    UpdateRlActModulo(data:any){
      return this._Http.post(this.API+'?UpdateRlActModulo=1', data);
    }

}
