import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NearlukService } from 'src/app/services/nearluk.service';

@Component({
  selector: 'app-agents',
  templateUrl: './agents.component.html',
  styleUrls: ['./agents.component.css']
})
export class AgentsComponent implements OnInit {

  constructor(private router: Router,private nearlukservice: NearlukService) { }

  ngOnInit() {
    // this.router.navigate(['login'])
  }

}
