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
    RpresuGral(data:any){
      return this._Http.post(this.API+"RpresuGral.php?RpresuGral=1", data);
    }
    RmatXmod(data:any){
      return this._Http.post(this.API+"RmatXmod.php?RmatXmod=1", data);
    }
    RmanoObrXmod(data:any){
      return this._Http.post(this.API+"RmanoObrXmod.php?RmanoObrXmod=1", data);
    }
    RequipoXmod(data:any){
      return this._Http.post(this.API+"RequipoXmod.php?RequipoXmod=1", data);
    }
    RtotalMatxModu(data:any){//RtotalManoObraxModu
      return this._Http.post(this.API+"RtotalMatxModu.php?RtotalMatxModu=1", data);
    }
    RtotalManoObraxModu(data:any){//RtotalEquipoxModu
      return this._Http.post(this.API+"RtotalManoObraxModu.php?RtotalManoObraxModu=1", data);
    }
    RtotalEquipoxModu(data:any){//RtotalEquipoxModu
      return this._Http.post(this.API+"RtotalEquipoxModu.php?RtotalEquipoxModu=1", data);
    }


}
