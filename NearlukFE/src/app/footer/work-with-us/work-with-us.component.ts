import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-work-with-us',
  templateUrl: './work-with-us.component.html',
  styleUrls: ['./work-with-us.component.css']
})
export class WorkWithUsComponent implements OnInit {
  

  constructor( private router: Router) { }

  ngOnInit() {
    // this.router.navigate(['login'])
  }

}
