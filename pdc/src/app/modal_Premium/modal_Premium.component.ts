import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-modal_Premium',
  templateUrl: './modal_Premium.component.html',
  styleUrls: ['./modal_Premium.component.Scss']
})
export class Modal_PremiumComponent implements OnInit {

  constructor(

    public dialogo: MatDialogRef<Modal_PremiumComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private dialogRef: MatDialog,
    private route: ActivatedRoute,
    private router:Router,

  ) { }

  ngOnInit() {
  }
  cerrarDialogo(): void {
    const respuesta = {
      resultado:true,
      data: "Operación Cancelada"
    }
    this.dialogo.close(respuesta);
    this.dialogRef.closeAll();
  }

  premiun(){
    this.cerrarDialogo();
    this.router.navigate(['upgrd']);

  }
}
