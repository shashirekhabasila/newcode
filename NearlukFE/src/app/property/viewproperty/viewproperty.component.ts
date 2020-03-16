import { GMapsService } from './../../services/gmaps.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NearlukService } from 'src/app/services/nearluk.service';

@Component({
  selector: 'app-viewproperty',
  templateUrl: './viewproperty.component.html',
  styleUrls: ['./viewproperty.component.css']
})
export class ViewpropertyComponent implements OnInit {

  viewProperty: any
  optionPropertyType: any
  images: any
  page: any = 1;
  constructor(private arc: ActivatedRoute, private map: GMapsService, private nluk: NearlukService) { }

  moredetails(propertyid: any) {
    window.open('moredetails' + '/' + propertyid)
  }

  onScroll() {
    this.page = this.page + 1;
    this.infinite();
  }

  infinite() {
    var type = this.arc.snapshot.params.type;
    var propertytype = type;
    var statename = this.map.state;
    var cityname = this.map.city;
    this.nluk.getCityidbyPropertytype(propertytype, statename, cityname, this.page).subscribe((data) => {
      this.viewProperty = data.data;
    })
  }

  ngOnInit() {
    this.infinite();
  }
}