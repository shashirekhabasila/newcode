import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NearlukService } from 'src/app/services/nearluk.service';

@Component({
  selector: 'app-house-owners',
  templateUrl: './house-owners.component.html',
  styleUrls: ['./house-owners.component.css']
})
export class HouseOwnersComponent implements OnInit {

  constructor(private router: Router,private nearlukservice: NearlukService) { }

  ngOnInit() {
   
    // this.router.navigate(['login'])
}

}
