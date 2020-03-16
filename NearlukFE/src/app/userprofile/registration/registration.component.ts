import { NearlukService } from 'src/app/services/nearluk.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { registration } from 'src/app/model/Registration';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  register: registration;
  display: boolean;
  mobile: any;
  // mobileExist: boolean;
  userExist: boolean;
  constructor(private nearlukservice: NearlukService, private router: Router,private toastr: ToastrService) {
    this.register = new registration();
  }

  cncl() {  //for cancel button
    this.display = false;
    this.router.navigate(['home'])

  }

  ngOnInit() {
    this.display = true;
  }

  signUpClick(myFrm: any) {

    this.nearlukservice.RegisterPost(this.register).subscribe((data) => {

      if (data.result == false) {
        var res = data.message
      }
      else {
        if (data.data == "NDF") {
          var res = data.message
          // alert(JSON.stringify(data))
          this.toastr.error("Email already exists");
          this.display = true;

        }
        else {
          if (data.data.length > 0) {
            // this.email = true;
            this.toastr.success('Please check your email to activate your account');
            this.toastr.success('Registered Successfully');
            this.router.navigate(['login'])
          }
        }
      }
    })

  }



  makeUserFalse() {
    this.userExist = false;
  }


  // makeMobileFalse() {
  //   this.mobileExist = false;
  // }
  // mobileclick() {
  //   alert('came')
  //   this.nearlukservice.getByMobile(this.register.mobile).subscribe((data) => {

  //     if (data.result == false) {
  //       var res = data.message
  //     }
  //     else {
  //       if (data.data == "NDF") {
  //         var res = data.message
  //         this.mobile = this.register.mobile;
  //         this.nearlukservice.RegisterPost(this.register).subscribe((data) => {
  //           // alert(JSON.stringify(data))
  //           alert("posted successfully....")
  //           this.router.navigate(['login'])
  //         })
  //       }
  //       else {

  //         if (data.data.length > 0) {
  //           this.mobileExist = true;
  //         }

  //       }
  //     }
  //   })
  // }

}
