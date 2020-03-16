import { Component, OnInit } from '@angular/core';
import { NearlukService } from '../../services/nearluk.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  requestnotifications: any;
  notifications: any;
  userid: any;
  roleid: any;

  constructor(private nearlukservice: NearlukService) { }


  get() {
    this.nearlukservice.getNotificationsbyuserid(this.userid).subscribe((data) => {
      if (data.result == false) {
        var res = data.message
      }
      else {
        if (data.data == "NDF") {
          var res = data.message
        }
        else {
          if (data.data.length > 0) {
            this.notifications = data.data;
          }
          else {
          }
        }
      }
    })
  }

  getAgentRequest() {
    this.nearlukservice.getagentnotifications(this.userid).subscribe((data) => {

      if (data.result == false) {
        var res = data.message
      }
      else {
        if (data.data == "NDF") {
          var res = data.message
          // alert("No Data")

        }
        else {
          if (data.data.length > 0) {

            this.requestnotifications = data.data;

          }
          else {
          }
        }
      }
    })
  }

  ngOnInit() {

    this.nearlukservice.getSectionid(sessionStorage.getItem('user')).subscribe((data) => {
      this.userid = data[0].userid;
      this.roleid = data[0].roleid;
      this.get();
      this.getAgentRequest();
    });




  }

}