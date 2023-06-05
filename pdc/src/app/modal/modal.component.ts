import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {ActividadesService} from '../servicios/actividades.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  public actividad:any;
  constructor(
    public dialogo: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    public actServ: ActividadesService
  ) { }

  ngOnInit() {
    console.log("Confirmar?", this.data);
    console.log(this.data);
    this.verAct(this.data.data);

  }
  cerrarDialogo(): void {
    const respuesta = {
      resultado:false,
      data: "Operación Cancelada"
    }
    this.dialogo.close(respuesta);
  }
  confirmado(): void {
    const respuesta = {
      resultado:false,
      data: "Operación Cancelada"
    }
      this.dialogo.close(respuesta);

  }
  verAct(a:any){
    this.actServ.verActividad(Number(a)).subscribe(a=>{
      if(a){
        console.log(a);
        this.actividad = a;
        console.log("Actividad------>", this.actividad);
      }
    });
  }

}
