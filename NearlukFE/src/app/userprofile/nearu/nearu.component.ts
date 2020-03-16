import { Component, OnInit } from '@angular/core';
import { GMapsService } from 'src/app/services/gmaps.service';
import { NearlukService } from 'src/app/services/nearluk.service';

@Component({
  selector: 'app-nearu',
  templateUrl: './nearu.component.html',
  styleUrls: ['./nearu.component.css']
})
export class NearuComponent implements OnInit {
  public iconUrl = {
    url: '../assets/images/maps.png',
    scaledSize: {
      height: 40,
      width: 30
    }
  }
  label: string = 'current Location'
  propertyList: any; 
  latt: any;
  lngg: any;
  propertymap: any;
  constructor(private nearlukservice: NearlukService, private gMapsService: GMapsService) { }
  moredetails(propertyid) {
    window.open('moredetails' + '/' + propertyid)
  }
  onMouseOverout(infoWindow, gm) {
    gm.lastOpen = infoWindow;
  }
  onMouseOver(infoWindow, gm, properyid) {
    this.nearlukservice.getPropertyDetailsForMap(properyid).subscribe((data) => {
      this.propertymap = data.data[0];
    });
    if (gm.lastOpen != null) {
      gm.lastOpen.close();
    }
    gm.lastOpen = infoWindow;
    infoWindow.open();
  }
  onScroll() {
    this.page = this.page + 1;
    this.infinite();
  }
  page: any = 1;
  infinite() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latt = position.coords.latitude;
        this.lngg = position.coords.longitude;
        this.nearlukservice.nearU(this.latt, this.lngg, this.page).subscribe((data) => {
          if (data.result == "false") {
            let dislikeerror = data.message
          }
          else {
            if (data.data === "NDF") {
              let dislikeerror = data.message
            }
            else {

              this.propertyList = data.data;
            }
          }
        })
        this.gMapsService.getLatLan(this.latt, this.lngg).subscribe(result => {
        }, error =>
            console.log(error),
          () => console.log('Geocoding completed!')
        );
      });
    }
    else {
      alert("Geolocation is not supported by this browser.");
    }
  }
  ngOnInit() {
    this.infinite();
  }
}