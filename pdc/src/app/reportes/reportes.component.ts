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

    this.verActividades();

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
              id_actividad:this.actividades[i].id_actividad
            }
            this.repServ.PUXact(d).subscribe(r=>{
              if(r){
                this.results = r;
                this.act.push(this.results);

              }
              return this.results;
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
    this.repServ.PUXact(data).subscribe(r=>{
      if(r){
        this.results = r;
        console.log(this.results);

      }
      return this.results;
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
