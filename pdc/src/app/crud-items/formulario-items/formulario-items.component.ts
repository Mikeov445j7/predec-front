import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EquipoService } from 'src/app/servicios/equipo.service';
import { ManoDeObraService } from 'src/app/servicios/mano-de-obra.service';
import { MaterialesService } from 'src/app/servicios/materiales.service';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-formulario-items',
  templateUrl: './formulario-items.component.html',
  styleUrls: ['./formulario-items.component.scss']
})
export class FormularioItemsComponent implements OnInit {
  public tabla:any;
  public idItem:any;
  public itemResult:any;
  public edit = false;
  public titulo:any;
  public titulos=["","EQUIPO","MANO DE OBRA","MATERIALES"];
  public model = {
    id: 0,
    descripcion: '',
    unidad: '',
    PU: 0,
    jornal:0,
    mes: 0,
    grupo_insumo: 0
  };
  constructor(
    private route: ActivatedRoute,
    private router:Router,
    public eqServ:EquipoService,
    public moServ:ManoDeObraService,
    public matServ:MaterialesService,

  ) { }

  ngOnInit() {
    //:tabla/:idItem

    if(this.route.snapshot.params['tabla']&&this.route.snapshot.params['idItem']){
      this.idItem = Number(this.route.snapshot.params['idItem']);
      this.tabla = Number(this.route.snapshot.params['tabla']);
      console.log(this.tabla, this.idItem);
      this.getItem();
      this.edit = true;
    }
    if(this.route.snapshot.params['tabla']){
      this.tabla = Number(this.route.snapshot.params['tabla']);
     }
    this.titulo = this.titulos[Number(this.tabla)];

  }
  getItem(){
    console.log(this.tabla, this.idItem);
    switch(this.tabla){
      case 1:
        this.eqServ.getUno(this.idItem).subscribe(e=>{
          if(e){
            this.itemResult = e;
            this.itemResult = this.itemResult[0];
            this.model.id = this.idItem;
            this.model.descripcion = this.itemResult.descripcion;
            this.model.unidad = this.itemResult.unidad;
            this.model.PU = Number(this.itemResult.PU);
            console.log(this.itemResult);
          }
        });
      break;
      case 2:
        this.moServ.getUno(this.idItem).subscribe(e=>{
          if(e){
            this.itemResult = e;
            this.itemResult = this.itemResult[0];
            this.model.id = this.idItem;
            this.model.descripcion = this.itemResult.descripcion;
            this.model.unidad = this.itemResult.unidad;
            this.model.PU = Number(this.itemResult.PU);
            this.model.mes = Number(this.itemResult.jornal);
            this.model.jornal = Number(this.itemResult.mes);
            console.log(this.itemResult);
          }
        });

      break;
      case 3:
        this.matServ.getUno(this.idItem).subscribe(e=>{
          if(e){
            this.itemResult = e;
            this.itemResult = this.itemResult[0];
            this.model.id = this.idItem;
            this.model.descripcion = this.itemResult.descripcion;
            this.model.unidad = this.itemResult.unidad;
            this.model.PU = Number(this.itemResult.PU);
            console.log(this.itemResult);
          }
        });
      break;
    }


  }
  eventoBtn(data:any){
    if(!this.edit){
      this.guardarItem(data);
    }
    if(this.edit){
      this.editarItem(data);
    }

  }

  guardarItem(data:any){

    data.grupo_insumo = 0;
    console.log(data);
    switch(this.tabla){
      case 1:
        this.eqServ.add(data).subscribe(e=>{
          if(e){
            console.log(e);
          }
        });
      break;
      case 2:
        this.moServ.add(data).subscribe(e=>{
          if(e){
            console.log(e);
          }
        });

      break;
      case 3:
        this.matServ.add(data).subscribe(e=>{
          if(e){
            console.log(e);
          }
        });
      break;
    }
  }
  editarItem(data:any){
    data.grupo_insumo = 0;
    data.id = this.idItem;
    console.log(data);
    switch(this.tabla){
      case 1:
        this.eqServ.editar(this.idItem, data).subscribe(e=>{
          if(e){
            console.log(e);
          }
        });
      break;
      case 2:
        this.moServ.editar(this.idItem, data).subscribe(e=>{
          if(e){
            console.log(e);
          }
        });

      break;
      case 3:
        this.matServ.editar(this.idItem, data).subscribe(e=>{
          if(e){
            console.log(e);
          }
        });
      break;
    }
    this.getItem();
  }

  borrar(){

    switch(this.tabla){
      case 1:
        this.eqServ.borrar(this.idItem).subscribe(e=>{
          if(e){
            console.log(e);
          }
        });
      break;
      case 2:
        this.moServ.borrar(this.idItem).subscribe(e=>{
          if(e){
            console.log(e);
          }
        });

      break;
      case 3:
        this.matServ.borrar(this.idItem).subscribe(e=>{
          if(e){
            console.log(e);
          }
        });
      break;
    }
    this.getItem();
  }

}
