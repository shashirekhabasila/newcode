import { GMapsService } from './services/gmaps.service';
import { tenantnotifications, owneraddagent } from './model/agent';
import { NearlukService } from 'src/app/services/nearluk.service';
import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { DEFAULT_INTERRUPTSOURCES, Idle } from '@ng-idle/core';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  requestcount: any;
  notificatiosdisplay: boolean;
  logstatus: any;
  userid: any;
  // notifications: any;
  nomessage: string;
  notifyvisible: boolean;
  tenantnotifications: tenantnotifications;
  notifications: any[];
  notificationseen: any[] = [];

  addagent: owneraddagent;
  lat: any;
  lng: any;
  compare1: any = 0;
  compare2: any = 0;
  compare3: any = 0;
  comparecount: any = 0;
  owner: boolean;
  admin: boolean;
  agent: boolean;
  roleid: any;
  notificationscount: any;
  notificationdata: any;
  imagepic: any;
  imagepic1: any;
  constructor(private router: Router, private toastr: ToastrService, private nearlukservice: NearlukService, private gMapsService: GMapsService, private idle: Idle) {
    this.tenantnotifications = new tenantnotifications();
    this.addagent = new owneraddagent();
    idle.setIdle(12000);
    // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
    idle.setTimeout(12000);
    // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
    idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);
    idle.onTimeout.subscribe(() => {
      alert('Timed out!');
    });
    idle.onIdleStart.subscribe(() =>
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
    );
    this.reset();
  }
  get() {
    this.nearlukservice.getSectionid(sessionStorage.getItem('user')).subscribe((data) => {
      this.userid = data[0].userid;
      this.roleid = data[0].roleid;
      // alert(JSON.stringify(data))
      // alert(this.userid)
      setInterval(() => {
        this.count()
      }, 5000)
      if (data[0].roleid == 2) {

        this.agent = true;
      }
      else if (data[0].roleid == 3) {
        this.router.navigate(['adminhome'])
      }
      else {
        this.owner = true;
      }
    });
  }
  reset() {
    this.idle.watch();
  }
  btnCompare() {
    this.router.navigate(['compare'])
  }
  LogoutClick() {
    sessionStorage.clear();
    this.router.navigate(['home'])
  }


  getImage() {
    this.nearlukservice.getprofileimage(this.userid).subscribe((data) => {
      this.imagepic = data.data[0].img;
    })
  }


  accept(touserid, propertyid, notification_id) {

    this.notificatiosdisplay = false;

    this.tenantnotifications.propertyid = propertyid
    this.tenantnotifications.fromuserid = this.userid;
    this.tenantnotifications.touserid = touserid;

    this.nearlukservice.addagentnotifications(this.tenantnotifications).subscribe(data => {

    })


    if (this.roleid == 2) {
      this.addagent.agentuserid = this.userid;
    }
    else {
      this.addagent.agentuserid = touserid;
    }
    this.addagent.propertyid = propertyid;
    this.addagent.status = 'accepted'
    this.nearlukservice.insertowneragent(this.addagent).subscribe(data => { console.log(data) })
    this.nearlukservice.updateagentrequest(notification_id, this.addagent.status).subscribe(data => {
      this.notifyvisible = false;
      this.ngOnInit();
      this.agentRequest();
    })

  }

  agentRequest() {
    this.nearlukservice.getagentnotifications(this.userid).subscribe((data) => {
      if (data.result == false) {
        var res = data.message
      }
      else {
        if (data.data == "NDF") {
          var res = data.message
          this.toastr.error('No request notifications')
        }
        else {
          if (data.data.length > 0) {

            this.notifications = data.data;
            this.notificatiosdisplay = true;
          }
          else {
          }
        }
      }
    })
  }



  reject(username, property_id, notification_id) {
    // this.nearlukservice.updateNotification([notification_id]).subscribe(data => {
    //   this.ngOnInit();
    //   this.notifyvisible = false;

    // })
    this.addagent.agentuserid = username;
    this.addagent.propertyid = property_id;
    this.addagent.status = 'rejected';
    this.nearlukservice.updateagentrequest(notification_id, this.addagent.status).subscribe(data => {
      this.notifyvisible = false;

      this.ngOnInit();
    })
  }




  getNotificationsbyuserid() {
    // let userid = 1;
    this.nearlukservice.getNotificationsbyuserid(this.userid).subscribe((data) => {
      if (data.result == false) {
        var res = data.message
      }
      else {
        if (data.data == "NDF") {
          var res = data.message
          this.toastr.error('Notifications not available')

          // alert("No Data")
        }
        else {
          if (data.data.length > 0) {
            this.notifications = data.data;
            this.notifyvisible = true;
          }
          else {
          }
        }
      }
    })
  }
  getNotificationsbyuserid1() {
    this.nearlukservice.getNotificationsbyuserid1(this.userid).subscribe((data) => {

    })

  }
  count() {
    this.nearlukservice.getNotificationsbyuserid(this.userid).subscribe((data) => {

      if (data.data[0].status == true) {
        this.notificationscount = null;
      }

      else if (data.data[0].status == false) {
        this.notificationscount = data.data.length;
      }
      this.notificationdata
    })
    this.nearlukservice.getagentnotifications_count(this.userid).subscribe((data) => {
      // if (data.data.length > 0) {
      //   this.notifications = data.data;
      this.requestcount = data.data.length;
      // alert(JSON.stringify(this.requestcount))
      // }
      this.requestcount = data.data;

    })
  }






  ViewAll() {
    this.router.navigate(['notification'])
    this.notifyvisible = false;
    this.notificatiosdisplay = false;

    // alert(this.notifyvisible)

  }

  seenn() {
    this.notifyvisible = false;
  }
  // seen() {
  //   this.notifyvisible = false;
  //   // alert(this.notifyvisible)
  //   // this.notifyvisible = "";
  //   this.nearlukservice.updateNotification(this.notificationseen).subscribe(data => {
  //     // console.log(data);
  //     this.ngOnInit();
  //   })
  // }
  CheckLocalStore(): Observable<any> {
    return of(sessionStorage.getItem("user"));
  }
  ngOnInit() {

    if (sessionStorage.getItem("uname")) {

    }

    if (sessionStorage.getItem('user') != null) {
      this.get();

      this.nearlukservice.getSectionid(sessionStorage.getItem('user')).subscribe((data) => {
        this.userid = data[0].userid;
        this.roleid = data[0].roleid;
        // alert(JSON.stringify(data))
        // alert(this.userid)
        setInterval(() => {
          this.count()
        }, 5000)

        this.getImage();

        if (data[0].roleid == 2) {

          this.agent = true;
        }
        else if (data[0].roleid == 3) {
          this.router.navigate(['adminhome'])
        }
        else {
          this.owner = true;
        }
      });

    }

    navigator.geolocation.getCurrentPosition((position) => {
      this.lat = position.coords.latitude;
      this.lng = position.coords.longitude;



      this.gMapsService.getLatLan(this.lat, this.lng).subscribe(result => {


      }, error =>
          console.log(error),

        () => console.log('Geocoding completed!')
      );


    });





  }
  postproperty() {
    if (sessionStorage.getItem('user')) {
      this.router.navigate(['property'])
    }
    else {
      swal({
        title: 'You are not logged in!!',
        text: "Please login to post your property!!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Login Here'
      }).then((result) => {
        if (result.value) {
          sessionStorage.setItem("PP", "postProperty");
          this.router.navigate(['login'])
        }
      })
    }
  }
  ngDoCheck() {
    this.CheckLocalStore().subscribe((data) => { this.logstatus = data })

    if (localStorage.getItem('compare1') != null) { this.compare1 = 1 } else { this.compare1 = 0 }
    if (localStorage.getItem('compare2') != null) { this.compare2 = 1 } else { this.compare2 = 0 }
    if (localStorage.getItem('compare3') != null) { this.compare3 = 1 } else { this.compare3 = 0 }
    if (localStorage.getItem('remove') == 'remo') {
      this.compare1 = 0;
      this.compare2 = 0;
      this.compare3 = 0;

      localStorage.removeItem('remove')

    }

    this.comparecount = this.compare1 + this.compare2 + this.compare3;
    if (sessionStorage.getItem('loroolid') != null) {


      this.roleid = sessionStorage.getItem('loroolid');



      if (this.roleid == 2) {

        this.agent = true;
      }
      else if (this.roleid == 3) {
        this.router.navigate(['adminhome'])
      }
      else {
        this.owner = true;
      }


      sessionStorage.removeItem('loroolid')

    }


    if (sessionStorage.getItem('loimage') != null) {
      this.imagepic = sessionStorage.getItem('loimage');
      sessionStorage.removeItem('loimage');
    }


  }

}
