import { Component, OnInit, Inject } from '@angular/core';
import { ReportesService } from '../../servicios/reportes.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ProyectosService } from 'src/app/servicios/proyectos.service';
import { UsersService } from 'src/app/servicios/users.service';
import { Modal_PremiumComponent } from 'src/app/modal_Premium/modal_Premium.component';

@Component({
  selector: 'app-copiarproyecto',
  templateUrl: './copiarproyecto.component.html',
  styleUrls: ['./copiarproyecto.component.scss']
})
export class CopiarproyectoComponent implements OnInit {
  public contar:any;
  public usuarios:any;
  public usDestino:any;
  public mostrar=false;
  public aceptar=false;
  public id_proyec:any;
  public enviado=false;
  public Premium=false;
  public p:any;
  constructor(
    public proyecServ: ProyectosService,
    public dialogo: MatDialogRef<CopiarproyectoComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private route: ActivatedRoute,
    private router:Router,
    private usServ: UsersService,
    public dia: MatDialog,
  ) { }

  ngOnInit() {
    console.log(this.data);
    this.p = localStorage.getItem('ygtErd#22');
    this.id_proyec = this.data.id_proyec;
    this.verificarPremiun();
  }
  verificarPremiun(){
    if( this.p == 7 || this.p == 8 ){
        this.Premium = true;
    }
    else{
      console.log("NOOOOOOOOOO");
      this.dia.open( Modal_PremiumComponent, {
        width: '80%',
        data: {

        }
      })
      .afterClosed()
      .subscribe((confirmado:any) => {
        if (confirmado.resultado) {

        }
        else {
          console.log(confirmado.data);

        }

      });

    }
  }

  buscar(ci:any){
    if(ci.length>=3){
      this.usServ.usersBuscar(ci).subscribe(u=>{
        if(u){
          this.usuarios = u;
          //console.log(this.usuarios);
          this.mostrar = true;
        }
      });
    }
  }
  selecItem(item:any){
    //console.log(item);
    this.usDestino = item;
    this.aceptar=true;
    //this.router.navigate(['ver-modulo/'+item.id_modulo]);

  }

  enviar(n:any){
    if(n==1){
      let data = {
        id_proyec: this.id_proyec,
        id_us_destino : this.usDestino.id_us
      }
      //console.log(data);
      this.proyecServ.CopiarProyecto(data).subscribe(c=>{
        /*if(c){
          console.log(c);

        }*/
        this.enviado = true;
        //this.cerrarDialogo();
      });

    }
    if(n==2){
      this.cerrarDialogo();
    }

  }

  cerrarDialogo(): void {
    const respuesta = {
      resultado:true,
      data: "Operación Cancelada"
    }
    this.dialogo.close(respuesta);
  }

}
