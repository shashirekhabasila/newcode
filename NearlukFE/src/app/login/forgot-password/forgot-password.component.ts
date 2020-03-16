import { Forgot } from './../../model/login';
import { Component, OnInit } from '@angular/core';
import { NearlukService } from 'src/app/services/nearluk.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  forgot: Forgot;
  display: boolean = false;

  constructor(private ns: NearlukService, private toastr: ToastrService, private router: Router) {
    this.forgot = new Forgot();

  }
  Forgotpwd(frm: any) {

    if (this.forgot.email == null || this.forgot.email == undefined) {
      this.toastr.error('Enter valid email Id');
    }
    else {

      this.ns.fogotPwd(this.forgot).subscribe((data) => {

        if (data.result == true) {
          this.toastr.success(data.message);

        }
        else if (data.result == false) {
          this.toastr.error(data.message);


        }
        else {

        }
        frm.reset()
      })
    }


  }


  cancle() {
    this.router.navigate(['login'])

  }
  ngOnInit() {
    this.display = true;
  }


}