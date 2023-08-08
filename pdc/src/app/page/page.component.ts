import { Component, OnInit } from '@angular/core';
import { ElementRef, VERSION, ViewChild } from '@angular/core';
import { ViewportScroller } from "@angular/common";
import { Router } from "@angular/router";
import { ActivatedRoute} from '@angular/router';
import * as moment from 'moment';


@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {
  public anio:any;

  constructor(
    private route: ActivatedRoute,
    private router:Router,

  ) {}
  ngOnInit() {
    this.router.navigate(['funciones'], {relativeTo: this.route});
    this.anio = moment().format('YYYY');
  }

  scroll(id:any){
    console.log(id);
    let elmnt = document.getElementById(id)!;
    elmnt.scrollIntoView({behavior: "smooth"});

  }

  navegar(ruta:any){
    switch(ruta){
      case 1:
        this.router.navigate(['quienes-somos'], {relativeTo: this.route});
      break;
      case 2:
        this.router.navigate(['funciones'], {relativeTo: this.route});
      break;
      case 3:
        this.router.navigate(['comoseusa'], {relativeTo: this.route});

      break;
      case 4:
        this.router.navigate(['precios'], {relativeTo: this.route});

      break;
      case 5:
        this.router.navigate(['registro'], {relativeTo: this.route});

      break;
      case 6:
        this.router.navigate(['login']);
      break;
    }
  }

}
