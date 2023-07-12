import { Component, OnInit, Inject } from '@angular/core';
import { ReportesService } from '../servicios/reportes.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModulosService } from '../servicios/modulos.service';
import {ActividadesService} from '../servicios/actividades.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.scss']
})
export class ReportesComponent implements OnInit {
  public data2  = {
    id_proyec:7,
    id_mod:3,
    id_actividad:5
  }
  public results:any;
  public actividades:any;
  public modulo:any;
  public act:any= [];
  public PxUact:any= [];
  constructor(
    public repServ: ReportesService,
    public dialogo: MatDialogRef<ReportesComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    public modServ: ModulosService,
    public actServ: ActividadesService,
  ) { }

  ngOnInit() {
    console.log(this.data);
    this.modulo = this.data.mod;
    console.log("MODULO:",this.modulo);
    this.repServ.PUXact(this.data).subscribe(pu=>{
      if(pu){

        this.PxUact = pu;
        console.log("------",this.PxUact);
        for(let i=0; i<this.PxUact.length; i++){
          console.log(this.PxUact[i].materiales.A);
          let gg = 0;
          gg = Number(this.PxUact[i].manoObra.E)*(this.PxUact[i].he_men/100);
          this.PxUact[i].equipo.H = Number(this.PxUact[i].equipo.F)+Number(gg);
          let ii = 0;
          ii =  (Number(this.PxUact[i].materiales.A) + Number(this.PxUact[i].manoObra.E) + Number(this.PxUact[i].equipo.H))*(Number(this.PxUact[i].g_grales)/100);
          let jj = 0;
          jj = (Number(this.PxUact[i].materiales.A) + Number(this.PxUact[i].manoObra.E) + Number(this.PxUact[i].equipo.H)+ii)*(Number(this.PxUact[i].utilidad)/100);
          let kk = 0;
          kk = (Number(this.PxUact[i].materiales.A) + Number(this.PxUact[i].manoObra.E) + Number(this.PxUact[i].equipo.H)+ii+jj)*(Number(this.PxUact[i].it)/100);
          let ll = 0;
          ll = (Number(this.PxUact[i].materiales.A) + Number(this.PxUact[i].manoObra.E) + Number(this.PxUact[i].equipo.H)+ii+jj+kk);
          this.PxUact[i].I = ii;
          this.PxUact[i].J = jj;
          this.PxUact[i].K = kk;
          this.PxUact[i].L = ll;
          this.PxUact[i].G = gg;

        }
      }
    });
    this.verActividades();
    this.getPUact(1);
  }

  verActividades(){
    this.modServ.getACtividadesModulo(this.data.idModulo).subscribe(act=>{
      let a:any;
      if(act){
        a = act;
        if(a.success!=0){
          this.actividades = act
          console.log(this.actividades);
          for(let i=0; i<this.actividades.length; i++){
            let d = {
              id_proyec:this.data.id_proyec,
              id_mod:this.data.idModulo,
              id_actividad:Number(this.actividades[i].id_actividad)
            }
            console.log(d);
            this.repServ.PUXact2(d).subscribe(r=>{
              console.log("ACTIVIDAD:",r);
              if(r){
                console.log("ACTIVIDAD:",r);
                this.results = r;
                this.act.push(this.results);
              }

            });
           // this.getPUact(d);
           console.log(this.act);
          }
        }
        else{
          console.log("sin datos");
        }
      }
    });
  }

  getPUact(data:any){
    let d = {
      id_proyec:this.data.id_proyec,
      id_mod:this.data.idModulo,
      id_actividad:153
    }
    this.repServ.PUXact2(d).subscribe(r=>{
      console.log(r);

      if(r){
        this.results = r;
        console.log(this.results);

      }
    });
   }

   exportToExcel(): void {
    const element = document.getElementById('report');
    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const book: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(book, worksheet, 'Sheet1');
    XLSX.writeFile(book, 'nombre.xlsx');
  }

}
