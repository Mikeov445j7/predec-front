import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProyectosService } from 'src/app/servicios/proyectos.service';
import * as moment from 'moment';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-form-proyecto',
  templateUrl: './form-proyecto.component.html',
  styleUrls: ['./form-proyecto.component.scss']
})
export class FormProyectoComponent implements OnInit {
  public titulo:any;
  public idProyecto:any;
  public proyecto:any;
  public fecha = moment().format('dd-mm-yyyy');

  public proyectos = {
    id_proyec:0,
    id_us:localStorage.getItem('id'),
    nombre:'',
    codigo:0,
    fecha_creacion: moment().format('dd-mm-yyyy'),
    Ben_Soc:55,
    iva:14.94,
    he_men: 5,
    g_grales: 7,
    utilidad:10,
    IT:3.09,
    cliente:'',
    tip_cambio:6.96,
    fecha:moment().format('dd-mm-yyyy'),
    ubicacion:'',
    id_proyecOr:0
  }
  public edit = false;

  constructor(
    public dialogo: MatDialogRef<FormProyectoComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    public proyecServ: ProyectosService,
    private route: ActivatedRoute,
    private router:Router,
  ) { }

  ngOnInit() {
    if(this.data.idProyecto){
      this.idProyecto = this.data.idProyecto;
      this.getProyecto();
      this.edit = true;
      this.titulo = "EDITAR PROYECTO";
    } else {
      this.titulo = "NUEVO PROYECTO"
    }
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
          id_us:localStorage.getItem('id'),
          nombre:this.proyecto. nombre,
          codigo:this.proyecto.codigo,
          fecha_creacion:moment(this.proyecto.fecha_creacion).format('yyyy-MM-DD'),
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
    data.id_us = localStorage.getItem('id');
    data.fecha_creacion = moment(data.fecha_creacion).format('YYYY-M-D');
    console.log(data);
    data.id_proyecOr=1;
    this.proyecServ.add(data).subscribe(r=>{
      if(r){
        console.log(r);
        this.cerrarDialogo();
      }
    });

  }

  editarProyecto(data:any){
    console.log(data);

    this.proyecServ.editar(this.idProyecto, data).subscribe(r=>{
      if(r){
        console.log(r);
        this.cerrarDialogo();
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


  cerrarDialogo(): void {
    const respuesta = {
      resultado:true,
      data: "Operación Cancelada"
    }
    this.dialogo.close(respuesta);
  }
}
