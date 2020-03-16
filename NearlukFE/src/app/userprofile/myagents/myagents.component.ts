import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NearlukService } from 'src/app/services/nearluk.service';
import { tenantnotifications } from 'src/app/model/agent';

@Component({
  selector: 'app-myagents',
  templateUrl: './myagents.component.html',
  styleUrls: ['./myagents.component.css']
})
export class MyagentsComponent implements OnInit {
  userid: any;
  myagent: any;
  roleid: any;

  page: any = 1;
  notification: tenantnotifications
  constructor(private nearlukservice: NearlukService, private router: Router) {

    this.notification = new tenantnotifications();
  }



  // deleteAgents(pid: any) {

  //   this.nearlukservice.deleteMyAgent(pid, this.userid).subscribe(() => {
  //     alert('delete');
  //     this.router.navigate(['home']);
  //   })
  //   this.ngOnInit();
  // }


  deleteAgents(pid: any, agent: any, propertyname: any) {



    this.notification.touserid = agent;
    this.notification.fromuserid = this.userid;
    this.notification.message = this.userid + ' ' + 'has removed you from property' + ' ' + propertyname;
    this.notification.notificationtype = "agentremoved";
    this.notification.status = "unseen";
    this.notification.notifydate = new Date();
    this.notification.propertyid = pid;
    this.nearlukservice.addagentnotifications(this.notification).subscribe(data => {
    })
    this.nearlukservice.deleteMyAgent(pid, agent).subscribe(() => {
      alert("deleted")
      this.router.navigateByUrl('/myagentref', { skipLocationChange: true }).then(() =>
        this.router.navigate(["myagent"]));
    })
  }



  moredetails(propertyid: any) {
    // this.router.navigate(['moredetails' + '/' + propertyid])
    window.open('moredetails' + '/' + propertyid)

  }


  onScroll() {
    this.page = this.page + 1;
    this.getagents();
  }

  

  getagents() {
    if (sessionStorage.getItem('user') != null) {
      this.nearlukservice.getSectionid(sessionStorage.getItem('user')).subscribe((data) => {

        if (data.length > 0) {
          this.userid = data[0].userid;
          this.roleid = data[0].roleid;
          this.nearlukservice.MyAgents(this.userid,this.page).subscribe((data) => {
            // alert(JSON.stringify(data.data))
            this.myagent = data.data;
          })
        }
        else {
          sessionStorage.removeItem('user')

          this.router.navigate(['login']);
        }


      });
    }
    else {
      sessionStorage.removeItem('user')

      this.router.navigate(['login']);
    }

  }


  ngOnInit() {

    this.getagents();

  }

}