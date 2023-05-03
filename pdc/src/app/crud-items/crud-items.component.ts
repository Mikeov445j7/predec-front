import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EquipoService } from '../servicios/equipo.service';
import { ManoDeObraService } from '../servicios/mano-de-obra.service';
import { MaterialesService } from '../servicios/materiales.service';

@Component({
  selector: 'app-crud-items',
  templateUrl: './crud-items.component.html',
  styleUrls: ['./crud-items.component.scss']
})
export class CrudItemsComponent implements OnInit {
  public results:any = [];
  public item:any;
  public itemsTipo = [
    {
      id:3,
      desc: 'MATERIALES'
    },
    {
      id:2,
      desc: 'MANO DE OBRA'
    },
    {
      id:1,
      desc: 'EQUIPO'
    }

  ]

  constructor(
    public eqServ:EquipoService,
    public moServ:ManoDeObraService,
    public matServ:MaterialesService,
    private router:Router,
  ) { }

  ngOnInit() {
      this.listar();
  }
  listar(){
    switch(this.item){
      case 1:
        this.eqServ.ver().subscribe(e=>{
          if(e){
            this.results = e;
            console.log(this.results);
          }
        });
      break;
      case 2:
        this.moServ.ver().subscribe(e=>{
          if(e){
            this.results = e;
            console.log(this.results);
          }
        });

      break;
      case 3:
        this.matServ.ver().subscribe(e=>{
          if(e){
            this.results = e;
            console.log(this.results);
          }
        });
      break;
    }
  }

  buscarItem(param:any){
    switch(this.item){
      case 1:
        this.eqServ.buscar(param).subscribe(e=>{
          if(e){
            this.results = e;
            console.log(this.results);
          }
        });
      break;
      case 2:
        this.moServ.buscar(param).subscribe(e=>{
          if(e){
            this.results = e;
            console.log(this.results);
          }
        });

      break;
      case 3:
        this.matServ.buscar(param).subscribe(e=>{
          if(e){
            this.results = e;
            console.log(this.results);
          }
        });

      break;

    }
  }
  getTipo(e:any){
    console.log(e);
    this.item = Number(e.value);
    this.listar();
  }

  selecItem(i:any){
    console.log(i);
    let idItem:any
    if(this.item==1){idItem =i.id_equip}
    if(this.item==2){idItem =i.id_mo}
    if(this.item==3){idItem =i.id_mat}
    console.log(idItem);

    this.router.navigate(['formulario-item/'+this.item+'/'+idItem]);
  }

  agregarItem(){
    this.router.navigate(['formulario-item/'+this.item]);
  }
}
