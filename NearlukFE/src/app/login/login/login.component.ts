import { AppComponent } from './../../app.component';
import { Component, OnInit } from '@angular/core';
import { Login } from 'src/app/model/login';
import { NearlukService } from 'src/app/services/nearluk.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  display: boolean = false;

  login: Login
  session: any;
  sess: any;
  ses: string;
  verifymail:boolean;

  constructor(private ls: NearlukService, private router: Router, private toastr: ToastrService, private app: AppComponent) {
    this.login = new Login()
  }

  cncl() {
    this.display = false;
    this.router.navigate(['home'])
  }

  registration() {  //for register button
    this.router.navigate(['registration'])
  }

  Login() {
    this.ls.logingetalldetails(this.login).subscribe(data => {
      this.session = data;
      if (this.session.result == true) {


        // alert(this.session.data[0].status)

        if(this.session.data[0].status=='Verified'){
          sessionStorage.setItem('user', this.session.data[0].session)
          sessionStorage.setItem("loroolid", this.session.data[0].roleid)
          sessionStorage.setItem("loimage", this.session.image)
          this.toastr.success('LogIn  successfully');
          this.router.navigate(['/home'])
        }
        else{
// alert(JSON.stringify(this.session))
          this.verifymail=true;
          this.toastr.error('Please check your email to activate');
        }
   
      }
      else {
        this.toastr.error(this.session.message);
      }
    })
  }


  
  verifyemail(){
    // alert(this.session.data[0].userid)
    this.ls.verifyemails(this.session.data[0].userid).subscribe((data) => {

  })

  }

  ngOnInit() {
    this.display = true; //for popup primeNg

  }

}