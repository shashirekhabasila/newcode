import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NearlukService } from 'src/app/services/nearluk.service';

@Component({
  selector: 'app-large-organizations',
  templateUrl: './large-organizations.component.html',
  styleUrls: ['./large-organizations.component.css']
})
export class LargeOrganizationsComponent implements OnInit {

  constructor( private router: Router,private nearlukservice: NearlukService) { }

  ngOnInit() {
    // this.router.navigate(['login'])
  }

}
