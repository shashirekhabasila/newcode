import { UpdatepropertyComponent } from './updateproperty/updateproperty.component';
import { MypropertyComponent } from './myproperty/myproperty.component';
import { FavouritesComponent } from './favourites/favourites.component';
import { ContactAgentComponent } from './contact-agent/contact-agent.component';
import { BiddingComponent } from './bidding/bidding.component';

import { CompareComponent } from './compare/compare.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PropertysComponent } from './propertys/propertys.component';
import { GetareabycityComponent } from './getareabycity/getareabycity.component';
import { ViewpropertyComponent } from './viewproperty/viewproperty.component';

const routes: Routes = [
  { path: 'bidding', component: BiddingComponent },
  { path: 'compare', component: CompareComponent },
  { path: 'contactagent/:propertyid', component: ContactAgentComponent },
  { path: 'favourites', component: FavouritesComponent },
  { path: 'property', component: PropertysComponent },
  { path: 'myproperty', component: MypropertyComponent },
  { path: 'updateproperty/:id', component: UpdatepropertyComponent },
  { path: 'getareabycity/:id', component: GetareabycityComponent },
  { path: 'viewproperty/:type', component: ViewpropertyComponent }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PropertyRoutingModule { }
