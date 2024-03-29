import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProyectosService {

  public API = environment.url+"proyectos.php";
  public API2 = environment.url+"copiarProyecto.php";
  constructor(
    private _Http: HttpClient
  ) { }
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
    editar(id:any, data:any){
      return this._Http.post(this.API+"?actualizar="+id, data);
    }
    borrar(id:any){
      return this._Http.post(this.API+"?borrar="+id, id);
    }

    CopiarProyecto(data:any){
      return this._Http.post(this.API2+"?CopiarProyecto=1", data);
    }
}
