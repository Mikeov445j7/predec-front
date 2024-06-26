import { Component, OnInit, Inject } from '@angular/core';
import { ReportesService } from '../../servicios/reportes.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ModulosService } from '../../servicios/modulos.service';
import {ActividadesService} from '../../servicios/actividades.service';
import * as XLSX from 'xlsx';
import { ActivatedRoute, Router } from '@angular/router';
import { Modal_PremiumComponent } from 'src/app/modal_Premium/modal_Premium.component';

@Component({
  selector: 'app-RtiempoxActiv',
  templateUrl: './RtiempoxActiv.component.html',
  styleUrls: ['./RtiempoxActiv.component.scss']
})
export class RtiempoxActivComponent implements OnInit {



  public modulo:any;
  public reporte:any;
  public modulos:any=[];
  public totalProyecto:any;
  public p:any;
  constructor(
    public repServ: ReportesService,
    public dialogo: MatDialogRef<RtiempoxActivComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    public modServ: ModulosService,
    public actServ: ActividadesService,
    private route: ActivatedRoute,
    private router:Router,
    public dia: MatDialog,
  ) { }


  ngOnInit() {
    this.p = localStorage.getItem('ygtErd#22');
    console.log(this.data);
    this.repServ.RmanoObrXmod(this.data).subscribe(r=>{
      let horasMod = 0;
      let horaSuma = 0;
      let promedioActividad = 0;
      this.reporte = r;
      console.log(this.reporte.modulos);
      for(let i=0; i<this.reporte.modulos.length; i++){
        horasMod = 0;
          for(let j=0; j<this.reporte.modulos[i].modulo.listadeinsumos.length; j++){
            horaSuma = 0;
            promedioActividad = 0;
            if(this.reporte.modulos[i].modulo.listadeinsumos[j].parcial!==0){
              for (let k = 0; k < this.reporte.modulos[i].modulo.listadeinsumos[j].Materiales.length; k++) {
                horaSuma = horaSuma + Number(this.reporte.modulos[i].modulo.listadeinsumos[j].Materiales[k].cantXmod)
              }
              promedioActividad = horaSuma / Number(this.reporte.modulos[i].modulo.listadeinsumos[j].Materiales.length);
              promedioActividad = Number(promedioActividad.toFixed(2));
              this.reporte.modulos[i].modulo.listadeinsumos[j].totalHorasActividad = promedioActividad;
              horasMod = horasMod + promedioActividad;

            }else {
              this.reporte.modulos[i].modulo.listadeinsumos[j].totalHorasActividad = 0;
            }
          }
          this.reporte.modulos[i].modulo.horasMod = horasMod.toFixed(2);
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

  verificarPremiun(r:any){
    if( this.p == 7 || this.p == 8 ){
      if(r==1){
        this.exportToExcel();
      }
      if(r==2){
        this.print();
      }
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

  exportToExcel(): void {
    const nombre = 'Presupuesto_por_módulo.xlsx'
    const element = document.getElementById('report');
    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const book: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(book, worksheet, 'Sheet1');
    XLSX.writeFile(book, nombre);
  }
  public print() {
    let printContents, popupWin;
    printContents = document.getElementById("report")?.innerHTML.toString();
    printContents = (<string>printContents + "").replace("col-sm", "col-xs");
    // console.log(printContents);
    popupWin = window.open("", "_blank", "top=20,left=30,height=100%,width=auto");
    popupWin?.document.open();
    popupWin?.document.write(`
      <html>
        <head>
          <title>Presupuesto_por_módulo</title>
          <meta name="viewport" content="width=10000, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">


         <style>
         body { margin: 0; font-family: Roboto, "Helvetica Neue", sans-serif; }
         body { margin: 0; font-family: Roboto, "Helvetica Neue", sans-serif; }
         .titulo{
           text-align: center;
         }
         table.customTable {
           margin:auto;
           margin-top: 30px;
           width: 95%;
           background-color: #FFFFFF;
           border-collapse: collapse;
           border-width: 0px;
           border-color: #000;
           border-style: solid;
           color: #454545;
           margin-bottom: 30px;
         }
         table.customTable th {
           border-width: 0px;
           border-color: #000;
           font-size:9px;
           border-style: solid;
           padding: 5px;
           text-transform: uppercase;
         }
         table.customTable td{
           border-width: 0px;
           border-color: #000;
           font-size:9px;
           border-style: solid;
           padding: 5px;
         }

         table.customTable thead {
           background-color: #3498DB;
           color: #000;
         }

          @page {
            size: A4;
            margin: 10mm;
          }
          @media print {
            body { margin: 0; font-family: Roboto, "Helvetica Neue", sans-serif; }
            .titulo{
              margin-top: 30px;
              text-align: center;
            }
            table.customTable {
              margin:auto;
              width: 90%;
              background-color: #FFFFFF;
              border-collapse: collapse;
              border-width: 0px;
              border-color: #000;
              border-style: solid;
              color: #454545;
              margin-bottom: 20px;
            }
            table.customTable th {
              border-width: 0px;
              border-color: #000;
              font-size:9px;
              border-style: solid;
              padding: 5px;
              text-transform: uppercase;
            }
            table.customTable td{
              border-width: 0px;
              border-color: #000;
              font-size:9px;
              border-style: solid;
              padding: 5px;
            }

            table.customTable thead {
              background-color: #aaa;
              color: #000;
            }

          }
         </style>

        </head>
        <body onload="window.print();">
              <div class='contenedor'>
              ${printContents}
              </div>
        </body>
      </html>`);
    popupWin?.document.close();

  }
}
