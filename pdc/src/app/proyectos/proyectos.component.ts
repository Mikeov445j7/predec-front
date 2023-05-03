import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProyectosService } from '../servicios/proyectos.service'

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.scss']
})
export class ProyectosComponent implements OnInit {

public proyectos = {
  id_proyec:0,
  id_us:0,
  nombre:0,
  codigo:0,
  fecha_creacion:'',
  Ben_Soc:0,
  iva:0,
  he_men: 0,
  g_grales: 0,
  utilidad:0,
  IT:0,
  cliente:'',
  tip_cambio:0,
  fecha:'',
  ubicacion:'',
  id_proyecOr:0
}

/*
MODULOS

`id_modulo`,
`id_proyec`,
`orden`,
`nombre`,
`codigo`,
`id_modOr`,
`fecha_inicio`,
`ordenado`
  */
  public results:any = [];
  public item:any;

  constructor(
    private proyecServ: ProyectosService,
    private router:Router
  ) { }

  ngOnInit() {
      this.listar();
  }
  listar(){
     this.proyecServ.getProyectosUsuario(1).subscribe(p=>{
        if(p){
          this.results = p;
          console.log(this.results);
        }
     });
  }

  buscarItem(param:any){
    this.proyecServ.buscarPU(param, 1).subscribe(p=>{
      if(p){
        console.log(p);
        this.results = p;
      }
    });

  }
  getTipo(e:any){
    console.log(e);
    this.item = Number(e.value);
    this.listar();
  }

  selecItem(i:any){
    console.log(i.id_proyec);
    this.router.navigate(['ver-proyecto/'+i.id_proyec]);
    //this.router.navigate(['editar-proyecto/'+i.id_proyec]);
  }

  agregarItem(){
    this.router.navigate(['nuevo-proyecto']);
  }

}
