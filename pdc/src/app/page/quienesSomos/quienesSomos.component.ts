import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-quienesSomos',
  templateUrl: './quienesSomos.component.html',
  styleUrls: ['./quienesSomos.component.scss']
})
export class QuienesSomosComponent implements OnInit {
  public log=true;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    if(localStorage.getItem('mail')&&localStorage.getItem('id')){
      this.log= false;
    }
  }
  registro(){
    this.router.navigate(['page/registro']);
  }


}

