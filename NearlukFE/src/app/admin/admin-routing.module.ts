import { ContactusdetailsComponent } from './contactusdetails/contactusdetails.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminhomeComponent } from './adminhome/adminhome.component';


const routes: Routes = [
  { path: 'adminhome', component: AdminhomeComponent },
  { path: 'admincontactus', component: ContactusdetailsComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes),],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
