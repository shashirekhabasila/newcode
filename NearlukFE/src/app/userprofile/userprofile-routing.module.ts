import { RegistrationComponent } from './registration/registration.component';
import { ProfileComponent } from './profile/profile.component';
import { NearuComponent } from './nearu/nearu.component';
import { MyagentsComponent } from './myagents/myagents.component';
import { MyOwnersComponent } from './my-owners/my-owners.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EnquiryComponent } from './enquiry/enquiry.component';
import { RecommendationComponent } from './recommendation/recommendation.component';
import { VerifyComponent } from './verify/verify.component';


const routes: Routes = [
  {path:'myowner',component:MyOwnersComponent},
  {path:'myagent',component:MyagentsComponent},
  {path:'nearu',component:NearuComponent},
  {path:'profile',component:ProfileComponent},
  {path:'registration',component:RegistrationComponent},
  {path:'enquiry',component:EnquiryComponent},
  {path:'recommendation',component:RecommendationComponent},
  {path:'verify/:sessionid',component:VerifyComponent}
];

@NgModule({
  
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserprofileRoutingModule { }
