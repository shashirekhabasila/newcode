import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NearlukService } from '../services/nearluk.service';

@Component({
  selector: 'app-propertybycity',
  templateUrl: './propertybycity.component.html',
  styleUrls: ['./propertybycity.component.css']
})
export class PropertybycityComponent implements OnInit {
  propertydetails: any[]
  images: any;
  page: any = 1;
  constructor(private router: Router, private nearlukservice: NearlukService, private acr: ActivatedRoute) { }
  MoreDetails(propertyid: any) {
    window.open('moredetails' + '/' + propertyid)
    // this.router.navigate(['moredetails' + '/' + propertyid])

  }

  onScroll() {
    this.page = this.page + 1;
    this.infinite();
  }

  infinite() {
    var cityid = this.acr.snapshot.params.cid;
    this.nearlukservice.getPropertiesByCity(cityid,this.page).subscribe((data) => {
      this.propertydetails = data.data
    })

  }

  ngOnInit() {
    this.infinite();
  }

}




