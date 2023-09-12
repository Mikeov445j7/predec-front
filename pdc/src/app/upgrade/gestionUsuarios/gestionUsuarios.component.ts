import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProyectosService } from 'src/app/servicios/proyectos.service';
import * as moment from 'moment';
import { UsersService } from 'src/app/servicios/users.service';

@Component({
  selector: 'app-gestionUsuarios',
  templateUrl: './gestionUsuarios.component.html',
  styleUrls: ['./gestionUsuarios.component.scss']
})
export class GestionUsuariosComponent implements OnInit {
  public contar:any;
  public usuarios:any;
  public mostrar=false;
  constructor(
    private route: ActivatedRoute,
    private router:Router,
    private usServ: UsersService,
  ) { }

  ngOnInit() {
    this.contarUsuarios();
  }

  contarUsuarios(){
    this.usServ.contarUs().subscribe(u=>{
      this.contar = u;
      console.log(this.contar);

    });
  }

  buscar(ci:any){
    if(ci.length>=3){
      this.usServ.usersBuscar(ci).subscribe(u=>{
        if(u){
          this.usuarios = u;
          console.log(this.usuarios);
          this.mostrar = true;
        }
      });
    }

  }

}
