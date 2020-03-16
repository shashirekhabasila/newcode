import { Component, OnInit } from '@angular/core';
import { EnquiryForm } from 'src/app/model/enquiryform';
import { Router } from '@angular/router';
import { NearlukService } from 'src/app/services/nearluk.service';
import swal from 'sweetalert2';
@Component({
  selector: 'app-recommendation',
  templateUrl: './recommendation.component.html',
  styleUrls: ['./recommendation.component.css']
})
export class RecommendationComponent implements OnInit {


  Enquiry: EnquiryForm;
  optionsarea: any
  Propertys: any;
  getEnquiryForm: any;
  userid: any;
  page: any = 1;
  constructor(private nls: NearlukService, private router: Router) {
    this.Enquiry = new EnquiryForm();
  }


  MoreDetails(propertyid: any, userid: any) {
    // var userid = this.userid;
    // if (username != null && ownername != username) {
    //   this.nls.Insert_property_views(property_id, username).subscribe((data) => {

    //   })
    // }
    this.router.navigate(['moredetails' + '/' + propertyid])
  }


  infinite() {
    this.nls.SearchInOwnerPrpertyByEnquiryForm(this.Enquiry).subscribe((data) => {
      this.Propertys = data.data;
      // console.log(this.Propertys)
    })
  }

  ngOnInit() {

    if (sessionStorage.getItem('user') != null) {
      this.nls.getSectionid(sessionStorage.getItem('user')).subscribe((data) => {
        // console.log(data.data)
        this.userid = data[0].userid;
        if (data.length > 0) {
          this.nls.GetPropertyRecommendations(this.userid).subscribe((data) => {
            // console.log(JSON.parse(JSON.stringify(data)).data)
            this.getEnquiryForm = JSON.parse(JSON.stringify(data)).data;
            // alert(JSON.stringify(this.getEnquiryForm))
            this.Enquiry.propertytypeid = this.getEnquiryForm[0].propertytypeid;
            this.Enquiry.minprice = this.getEnquiryForm[0].minprice;
            this.Enquiry.maxprice = this.getEnquiryForm[0].maxprice;
            this.Enquiry.facing = this.getEnquiryForm[0].facing;
            this.Enquiry.countryid = this.getEnquiryForm[0].countryid;
            this.Enquiry.stateid = this.getEnquiryForm[0].stateid;
            this.Enquiry.cityid = this.getEnquiryForm[0].cityid;
            this.Enquiry.areaid = this.getEnquiryForm[0].areaid;
            
            this.infinite();
          })
        
        }
        else {
          swal({
            type: 'error',
            title: 'Oops...',
            text: "please login again",
            // width: '400px',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'OK'
          }).then((result) => {
            if (result.value) {
              sessionStorage.clear();
              this.router.navigate(['login']);
            }
          })
        }
      })
    }

  }
}