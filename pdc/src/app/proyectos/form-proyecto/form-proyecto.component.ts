import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProyectosService } from 'src/app/servicios/proyectos.service';
import * as moment from 'moment';

@Component({
  selector: 'app-form-proyecto',
  templateUrl: './form-proyecto.component.html',
  styleUrls: ['./form-proyecto.component.scss']
})
export class FormProyectoComponent implements OnInit {
  public titulo:any;
  public idProyecto:any;
  public proyecto:any;

  public proyectos = {
    id_proyec:0,
    id_us:1,
    nombre:'',
    codigo:0,
    fecha_creacion: moment().format('dd-mm-yyyy'),
    Ben_Soc:0,
    iva:0,
    he_men: 0,
    g_grales: 0,
    utilidad:0,
    IT:0,
    cliente:'',
    tip_cambio:0,
    fecha:moment().format('dd-mm-yyyy'),
    ubicacion:'',
    id_proyecOr:0
  }
  public edit = false;

  constructor(
    public proyecServ: ProyectosService,
    private route: ActivatedRoute,
    private router:Router,
  ) { }

  ngOnInit() {
    if(this.route.snapshot.params['idProyecto']){
      this.idProyecto = Number(this.route.snapshot.params['idProyecto']);
      this.getProyecto();
    }
      if(this.edit){ this.titulo = "Registrar Nuevo Proyecto"}
      if(!this.edit){ this.titulo = "Editar Proyecto"}
  }

  getProyecto(){
    this.proyecServ.getUno(this.idProyecto).subscribe(p=>{
      if(p){
        this.proyecto = p;
        this.proyecto = this.proyecto[0];
        console.log(this.proyecto);
        this.edit= true;
        this.proyectos = {
          id_proyec:this.proyecto.id_proyec,
          id_us:this.proyecto.id_us,
          nombre:this.proyecto. nombre,
          codigo:this.proyecto.codigo,
          fecha_creacion:this.proyecto.fecha_creacion,
          Ben_Soc:this.proyecto.Ben_Soc,
          iva:this.proyecto.iva,
          he_men: this.proyecto.he_men,
          g_grales: this.proyecto.g_grales,
          utilidad:this.proyecto.utilidad,
          IT:this.proyecto.IT,
          cliente:this.proyecto.cliente,
          tip_cambio:this.proyecto.tip_cambio,
          fecha:this.proyecto.fecha,
          ubicacion:this.proyecto.ubicacion,
          id_proyecOr:this.proyecto.id_proyecOr.id_proyecOr
        }
      }
    });

  }

  eventoBtn(data:any){
    if(this.edit){ this.editarProyecto(data);}
    if(!this.edit){ this.registarProyecto(data); }

  }

  registarProyecto(data:any){
    console.log(data);
    data.id_us = localStorage.getItem('id');
    data.id_proyecOr=1;
    this.proyecServ.add(data).subscribe(r=>{
      if(r){
        console.log(r);
        this.router.navigate(['/proyectos']);
      }
    });

  }

  editarProyecto(data:any){
    console.log(data);

    this.proyecServ.editar(this.idProyecto, data).subscribe(r=>{
      if(r){
        console.log(r);
        this.router.navigate(['/proyectos']);

      }
    });

  }

  borrar(){
    this.proyecServ.borrar(this.idProyecto).subscribe(r=>{
      if(r){
        console.log(r);

      }
    });

  }
}
