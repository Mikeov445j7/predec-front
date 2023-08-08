import { Component, OnInit, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
import { ModulosService } from 'src/app/servicios/modulos.service';
import { BeautifulChartsModule } from 'ngx-beautiful-charts';

@Component({
  selector: 'app-RGattModulo',
  templateUrl: './RGattModulo.component.html',
  styleUrls: ['./RGattModulo.component.scss']
})
export class RGattModuloComponent implements OnInit {


  constructor(
    public dialogo: MatDialogRef<RGattModuloComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    public modServ: ModulosService,
  ) { }

  ngOnInit() {
    console.log("Confirmar?", this.data);
  }
}
