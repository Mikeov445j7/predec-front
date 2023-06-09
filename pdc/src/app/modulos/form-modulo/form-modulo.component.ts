import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProyectosService } from 'src/app/servicios/proyectos.service';
import * as moment from 'moment';
import { ModulosService } from 'src/app/servicios/modulos.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-form-modulo',
  templateUrl: './form-modulo.component.html',
  styleUrls: ['./form-modulo.component.scss']
})
export class FormModuloComponent implements OnInit {
  public edit= false;
  public modulo = {
    id_proyec:0,
    orden:0,
    nombre:'',
    codigo:'',
    id_modOr:0,
    fecha_inicio:0,
    ordenado:0
  }
  constructor(
    private route: ActivatedRoute,
    private router:Router,
    private modServ:ModulosService,
    public dialogo: MatDialogRef<FormModuloComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
  ) { }

  ngOnInit() {
    console.log("Confirmar?", this.data);
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

  eventoBtn(modform:any){

      this.modulo = {
        id_proyec:this.data.Proyecto.id_proyec,
        orden:modform.ordenado,
        nombre:modform.nombre,
        codigo:modform.codigo,
        id_modOr:0,
        fecha_inicio:modform.fecha_inicio,
        ordenado:modform.ordenado
      }
      console.log(this.modulo);
      this.modServ.add(this.modulo).subscribe(m=>{
        if(m){
          console.log();
          this.confirmado();
        }
      });

  }

}
