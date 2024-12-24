import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewServicesPricingComponent } from './components/view-services-pricing/view-services-pricing.component';
import { AddEditServicesPricingComponent } from './components/add-edit-services-pricing/add-edit-services-pricing.component';

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'view' },
    { path: 'view', component: ViewServicesPricingComponent },
    // { path: 'deleted', component: DeletedServicesComponent },
    { path: 'add-edit', component: AddEditServicesPricingComponent },
    { path: 'add-edit/:id', component: AddEditServicesPricingComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ServicesPricingRoutingModule { }
