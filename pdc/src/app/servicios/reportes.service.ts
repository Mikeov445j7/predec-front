import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ReportesService {
  public API = environment.url;
  constructor(
      private _Http: HttpClient
  ) { }

    reporte1(){
      return this._Http.get(this.API);
    }
    PUXact2(data:any){
      return this._Http.post(this.API+"preciosUnitariosXActividad.php?PUXact=1", data);
    }

    PUXact(data:any){
      return this._Http.post(this.API+"RpxuAct.php?pxua=1", data);
    }
    RpresuXmod(data:any){
      return this._Http.post(this.API+"RpresuXmod.php?RpXmod=1", data);
    }


}
