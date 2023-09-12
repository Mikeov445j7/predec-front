import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-comoseusa',
  templateUrl: './comoseusa.component.html',
  styleUrls: ['./comoseusa.component.scss']
})
export class ComoseusaComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
  }
  registro(){
    this.router.navigate(['page/registro']);
  }

}
