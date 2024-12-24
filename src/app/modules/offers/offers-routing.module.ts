import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewOffersComponent } from './components/view-offers/view-offers.component';
import { AddEditOfferComponent } from './components/add-edit-offer/add-edit-offer.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'view' },
  { path: 'view', component: ViewOffersComponent },
  { path: 'add-edit', component: AddEditOfferComponent },
  { path: 'add-edit/:id', component: AddEditOfferComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OffersRoutingModule { }
