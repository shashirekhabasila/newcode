import { NgForm } from '@angular/forms';
import { NearlukService } from 'src/app/services/nearluk.service';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Bidding } from '../model/bidding';
import { SelectItem } from 'primeng/api';
import { filters } from '../model/filters';
import { Observable, of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @Input() showdata: any;
  blockspace: RegExp = /[^\s]/;
  optionPropertyType: any;
  showbidding: boolean;
  bidding: boolean;
  bidprice: any;
  details: any;
  userdetailsbidding: boolean;
  display: boolean;
  Bidd: Bidding;
  userid: any;
  currentsession: string;

  verify: any;
  urating: any;


  autoComplete: boolean;
  filterObj: filters;
  filter;
  pricefilter;
  propertytype: SelectItem[];
  FacingSelected: any[];
  facing: SelectItem[];
  rating: SelectItem[];
  verification: SelectItem[];
  ratings: any;
  name: any;
  prop: any;
  ownername: any;
  baseprice: any;
  logstatus: any;
  ccount1: any = 0;
  ccount2: any = 0;
  ccount3: any = 0;
  comparecount: any;
  compare1: any;
  compare2: any;
  compare3: any;
  propertybyareaorcity: any = [];
  showPropertiesByArea: boolean;
  propertymap: any;
  lat: number;
  lng: number;
  roleid: any;
  images: any;
  displayaverage: any;
  averagebyarea: any;
  propertyselect: { label: string; value: string[]; }[];
  prope: any[];


  brands: any[] = ['Mumbai,Maharashtra,India', 'Hyderabad,Telangana,India', 'Chennai,Tamil Nadu,India', 'Bangalore,Karnataka,India', 'Pune,Maharashtra,India', 'Jaipur,Rajasthan,India'];
  // brands: string[]=[];
  filteredBrands: any[];
  brand: any;
  citycount: any[];
  placesimages: any;
  citycnt: any[];
  citycnt1: any[];


  constructor(private nearlukservice: NearlukService, private router: Router, private toastr: ToastrService) {
    this.Bidd = new Bidding();
    this.filterObj = new filters();

    this.propertyselect = [



    ];


    this.facing = [
      { label: 'North', value: ['North'] },
      { label: 'South', value: ['South'] },
      { label: 'East', value: ['East'] },
      { label: 'West', value: ['West'] },
      { label: 'North East', value: ['North East'] },
      { label: 'North West', value: ['North West'] },
      { label: 'South East', value: ['South East'] },
      { label: 'South West', value: ['South West'] }


    ];
    this.verification = [
      { label: 'Verified', value: { id: 1, name: 'V', code: 'Verified' } },
      { label: 'Not Verified', value: { id: 2, name: 'N', code: 'Not Verified' } },

    ];
    this.rating = [
      { label: '1', value: { id: 1, name: '1', code: '1' } },
      { label: '2', value: { id: 2, name: '2', code: '2' } },
      { label: '3', value: { id: 3, name: '3', code: '3' } },
      { label: '4', value: { id: 4, name: '4', code: '4' } },
      { label: '5', value: { id: 5, name: '5', code: '5' } }
    ];
  }

  results: string[] = [];
  propertyid: any[] = [];
  propertyresults: any[] = [];
  propertyresults1: any[] = [];




  moredetails(propertyid: any) {

    window.open('moredetails' + '/' + propertyid)
    // this.router.navigate(['moredetails' + '/' + propertyid])

  }


  getaverage(ptype, area, pid: any) {
    this.nearlukservice.getaveragebyarea(ptype, area).subscribe(data => {


      if (data.result == false) {
        let averageerror = data.message;
        alert(averageerror);
      }
      else {
        if (data.data === 'NDF') {
          let averageerror = data.message;
          alert(averageerror)
        }
        else {
          this.displayaverage = pid;
          this.averagebyarea = data.data;
          // console.log(this.averagebyarea);
          this.averagebyarea.average = Math.floor(this.averagebyarea.average)
        }
      }
    })
  }




  clickproperty(propertytype) {
    var propname = propertytype.value;
    this.filterObj.propertytype=propname;
    for (var i = 0; i < this.prope.length; i++) {
      if (propname == this.prope[i].propertytype) {
        this.filterObj.propertyTypeId = this.prope[i].id;
      }

    }
  }

  searchProperty(event) {
    this.propertyresults = []
    this.propertyresults1 = []
    if (event.query != undefined) {
      for (var i = 0; i < this.prope.length; i++) {

        var form = event.query
        var proptype = this.prope[i].propertytype

        if (form.toUpperCase() == proptype.toUpperCase().substring(0, form.length)) {
          this.propertyresults.push(proptype);

        }
      }
      this.propertyresults1 = this.propertyresults
    }
    else {
      for (var i = 0; i < this.prope.length; i++) {
        var proptype = this.prope[i].propertytype
        this.propertyresults1.push(proptype);
      }
    }
  }




  checkedd(propertyid: any, chk: any) {
    var v1 = 0
    var v2 = 0
    var v3 = 0
    // alert(propertyid)
    if (sessionStorage.getItem('compare1') == propertyid) {
      // sessionStorage.removeItem('compare1');
      v1 = 1
      v2 = 1
      v3 = 1
    }
    else if (sessionStorage.getItem('compare2') == propertyid && v2 == 0) {
      // sessionStorage.removeItem('compare2');
      v1 = 1
      v2 = 1
      v3 = 1
    }
    else if (sessionStorage.getItem('compare3') == propertyid && v3 == 0) {

      // sessionStorage.removeItem('compare3');
      v1 = 1
      v2 = 1
      v3 = 1
    }
    if (sessionStorage.getItem('compare1') == null && v1 == 0) {
      sessionStorage.setItem('compare1', propertyid);
    }
    else if (sessionStorage.getItem('compare2') == null && v2 == 0) {
      sessionStorage.setItem('compare2', propertyid);
      v2 = 1
    }
    else if (sessionStorage.getItem('compare3') == null && v3 == 0) {
      sessionStorage.setItem('compare3', propertyid);
      v3 = 1
    }
    else if (sessionStorage.getItem('compare3') != null && sessionStorage.getItem('compare3') == propertyid) {
      chk.checked = false;
      sessionStorage.removeItem('compare3');
    }
    else if (sessionStorage.getItem('compare1') != null && sessionStorage.getItem('compare1') == propertyid) {
      chk.checked = false;
      sessionStorage.removeItem('compare1');
    }
    else if (sessionStorage.getItem('compare2') != null && sessionStorage.getItem('compare2') == propertyid) {
      chk.checked = false;
      sessionStorage.removeItem('compare2');
    }
    else {

      chk.checked = false;
      alert("Excedd the limit ...")
    }

  }
  CheckLocalStore(): Observable<any> {
    return of(sessionStorage.getItem('user'));
  }


  ngDoCheck() {
    this.CheckLocalStore().subscribe((data) => { this.logstatus = data })

    if (sessionStorage.getItem('compare1') != null) { this.ccount1 = 1 }
    if (sessionStorage.getItem('compare2') != null) { this.ccount2 = 1 }
    if (sessionStorage.getItem('compare3') != null) { this.ccount3 = 1 }
    if (sessionStorage.getItem('remove') == 'remo') {
      this.ngOnInit();
      sessionStorage.removeItem('remove')
    }

    this.comparecount = this.ccount1 + this.ccount2 + this.ccount3;

  }


  getBidding(propertyid: any, price: any, ownerid: any) {
    if (!this.userid) {
      this.router.navigate(['login'])
    }
    else {
      this.Bidd.ownerid = ownerid;
      this.baseprice = price;
      this.Bidd.propertyid = propertyid;
      this.bidding = true;

      this.nearlukservice.getBidding(propertyid).subscribe((data) => {
        this.bidprice = data.data;
      })
    }

  }



  GetUserDetails(userid: any) {

    this.nearlukservice.detailsforbiding(userid).subscribe((data) => {
      this.details = data.data;
      this.userdetailsbidding = true;
    })
  }



  btnprice(biddingprice: any) {
    if ((biddingprice.value == null) || (biddingprice.value == '')) {

    }

    else {
      this.Bidd.biddingprice = biddingprice.value;
      this.Bidd.tenantid = this.userid;

      if (parseInt(this.baseprice) >= parseInt(biddingprice.value)) {
        alert("Bid price should be greater than base price..!")
      }
      else {
        this.nearlukservice.priceSend(this.Bidd).subscribe((data) => {
          biddingprice.value = '';
        })

      }
    }

  }

  onSubmit(myFrm: NgForm) {
    myFrm.resetForm();
  }



  propertyTypeOnChange(c: any) {

    this.filterObj.propertyTypeId = c.value

  }
  clickCity(cityname: any) {
    this.filterObj.cityName = cityname.value
  }

  searchCity(event) {
    this.results.length = 0;
    if (event.query.length > 2) {
      this.nearlukservice.cityAutoComplete(event.query).subscribe(data => {
        if (data.result == false) {
          let errormessage = data.message;
        } else {
          if (data.data === 'NDF') {
            let errormessage = data.message;
          }
          else {

            this.results = data.data;


          }
        }
      });
    }

    else if (event.query == '') {
      this.results = this.brands;

    }

  }



  // search(verifyy, rat) {

  //   if (verifyy.value != undefined) {
  //     this.filterObj.veification = verifyy.value.name
  //   }
  //   else if (rat.value != undefined) {
  //     this.filterObj.rating = rat.value.id
  //   }
  //   else if (this.filterObj.minprice) {
  //     if (this.filterObj.minprice <= this.filterObj.maxprice) {
  //       this.nearlukservice.filtersearch(this.filterObj)
  //       this.router.navigate(['search'])
  //     }
  //     else {
  //       this.toastr.error('maxprice should be greater than minprice');
  //     }
  //   }
  //   else {
  //     this.nearlukservice.filtersearch(this.filterObj)
  //     this.router.navigate(['search'])
  //   }
  // }


  search(verifyy, rat) {

    if (verifyy.value != undefined) {
      this.filterObj.veification = verifyy.value.name
    }
    if (rat.value != undefined) {
      this.filterObj.rating = rat.value.id
    }
    if (this.filterObj.cityName == undefined) {
      this.toastr.error('Select City');
      return
    }

    else if (this.filterObj.minprice) {
      if (this.filterObj.minprice <= this.filterObj.maxprice) {
        this.nearlukservice.filtersearch(this.filterObj)
        this.router.navigate(['search'])
      }
      else {
        this.toastr.error('maxprice should be greater than minprice');
      }
    }
    else {
      this.nearlukservice.filtersearch(this.filterObj)
      this.router.navigate(['search'])
    }
  }


  getpropertybyarea(ptype) {
    this.router.navigateByUrl('/getareabycity', { skipLocationChange: true }).then(() =>
      this.router.navigate(['getareabycity' + '/' + ptype]));
  }

  getProperies(i: any) {
    this.router.navigate(['propertybycity/' + i])
  }


  searchbyall(s: any) {

    if (s.value == '') {
      alert("Search Please ")
    }
    else {
      this.router.navigate(['searchbyall/' + s.value])

    }
  }

  Viewproperty(type: any) {

    this.router.navigate(['viewproperty/' + type])
  }

  ngOnInit() {

    if (sessionStorage.getItem('user') != null) {
      this.nearlukservice.getSectionid(sessionStorage.getItem('user')).subscribe((data) => {
        this.userid = data[0].userid;
        this.roleid = data[0].roleid;

      });
    }

    this.compare1 = sessionStorage.getItem('compare1')
    this.compare2 = sessionStorage.getItem('compare2')
    this.compare3 = sessionStorage.getItem('compare3')

    var area = sessionStorage.getItem('area');
    var city = sessionStorage.getItem('city');
    var state = sessionStorage.getItem('state');
    this.nearlukservice.getAllPropertys(state, city).subscribe((data1) => {

      this.optionPropertyType = data1.data;

      this.images = data1.img

    });


    this.nearlukservice.getPropertyType().subscribe((data) => {//Get Property Type Dropdown
      this.prope = data.data
      // alert(JSON.stringify(this.prope))
      if (data.result == false) {
        var res = data.message

      }
      else {
        if (data.data == "NDF") {
          var res = data.message
        }
        else {

          this.propertytype = data.data;

          for (var i = 0; i < data.data.length; i++) {


            this.propertyselect.push({ label: data.data[i].propertytype, value: data.data[i].id })

          }
        }
      }
    });



    var area = sessionStorage.getItem('area');
    var city = sessionStorage.getItem('city');


    this.nearlukservice.getpropertybyareaorcity(city, area).subscribe(data => {
      this.showPropertiesByArea = true;
      if (data.result == false) {
        var res = data.message

      }
      else {
        if (data.data == "NDF") {
          var res = data.message
        }
        else {

          this.propertybyareaorcity = data.data;


        }
      }
    });

    this.nearlukservice.cityCount().subscribe((data) => {
      this.citycount = data;
      this.citycnt = this.citycount.slice(0, 4);
      this.citycnt1 = this.citycount.slice(4, 8);

    })

  }

}














