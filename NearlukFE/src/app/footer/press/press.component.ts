import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NearlukService } from 'src/app/services/nearluk.service';

@Component({
  selector: 'app-press',
  templateUrl: './press.component.html',
  styleUrls: ['./press.component.css']
})
export class PressComponent implements OnInit {

  constructor( private router: Router,private nearlukservice: NearlukService) { }

  ngOnInit() {
    // this.router.navigate(['login'])
  }

}
