import { Router, NavigationEnd } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NearlukService } from 'src/app/services/nearluk.service';
import { Profile } from 'src/app/model/Profile';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userData: any = {};
  profile: any;
  isTrue: boolean = true;
  userList: any;
  options: any = []
  url: any
  updateprofile: any
  optionscity: any = []
  optionsstate: any = []

  area: any = [];
  showSpinner: boolean;

  profiledel: boolean = false;

  maxDate = new Date();

  constructor(private ns: NearlukService, private router: Router, private toastr: ToastrService) {
    this.profile = new Profile();
    this.showSpinner = true;


  }


  // userbyUsersession() {

  //   this.ns.getUserbyUsersession(sessionStorage.getItem('user')).subscribe((data) => {

  //     if (data.data != 'NDF') {
  //       this.userData = data.data[0];


  //       this.url = 'http://localhost:3400/Profile/' + this.userData.id + '/' + this.userData.id + '.png';
  //       this.showSpinner = false;
  //     }
  //     else {

  //       sessionStorage.removeItem('user')

  //       this.router.navigate(['login']);
  //     }





  //   })
  // }


  userbyUsersession() {

    this.ns.getUserbyUsersession(sessionStorage.getItem('user')).subscribe((data) => {

      if (data.data != 'NDF') {
        this.userData = data.data[0];
        this.url = data.profileimage[0];
        this.profiledel = data.profile;
        this.showSpinner = false;
        sessionStorage.setItem('loimage', data.profileimage[0]);
      }
      else {
        sessionStorage.removeItem('user')
        this.router.navigate(['login']);
      }
    })
  }



  getUserId(id: any) {

    this.isTrue = false;

    this.ns.getStates(250).subscribe((data) => {

      this.optionsstate = data.data;
    });
    this.ns.getCities(this.userData.cityid).subscribe((data) => {

      this.optionscity = data.data;
    });
    this.ns.getArea(this.userData.stateid).subscribe((data) => {

      this.area = data.data
    })

    this.profile.id = this.userData.id;
    this.profile.name = this.userData.username;
    this.profile.email = this.userData.email;
    this.profile.mobile = this.userData.mobile;
    this.profile.address = this.userData.address;
    this.profile.gender = this.userData.gender;
    this.profile.occupation = this.userData.occupation;
    this.profile.dob = this.userData.dob;
    this.profile.area = this.userData.areaid;
    this.profile.city = this.userData.stateid;
    this.profile.state = this.userData.cityid;
    this.profile.country = 250
    this.profile.rolename = this.userData.rolename;
    this.profile.discription = this.userData.discription;




  }

  onDelete(a: any) {

    this.profiledel = false;



    this.ns.deleteprofileImages(a, this.userData.id).subscribe((data) => {
      this.url = data.image[0];


      
      sessionStorage.setItem('loimage', data.image[0]);
      // if (data) {
      //   for (let i = 0; i < this.url.length; i++) {
      //     if (this.url[i].source == a) {
      //       this.url.splice(i, 1);
      //     }
      //   }
      // }
    })
  }

  updateuser() {
    this.showSpinner = true;
    this.isTrue = true;

    // alert(JSON.stringify(this.profile))
    this.ns.updateUser(this.profile).subscribe((data) => {
      this.toastr.success('Profile updated successfully');
    })
    // this.ngOnInit();
    // this.router.navigateByUrl('/home', { skipLocationChange: true }).then(() =>
    //   this.router.navigate(["profile"]));
    setTimeout(() => {
      this.showSpinner = false;
      this.userbyUsersession();
    }, 1000)
  }





  fileSelect(event) { //upload Images
    this.profile.id = this.userData.id;

    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);

    reader.onload = (ev: any) => {
      this.profile.image = ev.target.result;
      this.profile.image = this.profile.image.replace('data:image/gif;base64,', '');
      this.profile.image = this.profile.image.replace('data:image/jpeg;base64,', '');
      this.profile.image = this.profile.image.replace('data:image/png;base64,', '');
      this.ns.putProfileImages(this.profile).subscribe((data) => {
        this.toastr.success('Image is uploaded')
      });
    }
  }




  getCities(id: any) {
    this.ns.getCities(id.value).subscribe((data) => {

      this.optionscity = data.data;
    });
  }



  getStates(id: any) {
    this.ns.getStates(id.value).subscribe((data) => {

      this.optionsstate = data.data;
    });
  }



  getAreas(city) {

    this.ns.getArea(city.value).subscribe((data) => {


      this.area = data.data;

    })
  }





  ngOnInit() {

    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0)
    });


    if (sessionStorage.getItem('user') != null) {

      this.userbyUsersession();

      this.ns.getcountries().subscribe((data) => {

        this.options.push(data.data[0]);


      });

    }

    else {
      sessionStorage.removeItem('user')

      this.router.navigate(['login']);
    }
  }

}