import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewAdvertisementsComponent } from './components/view-advertisements/view-advertisements.component';
import { AddEditAdvertisementComponent } from './components/add-edit-advertisement/add-edit-advertisement.component';

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'view' },
    { path: 'view', component: ViewAdvertisementsComponent },
    { path: 'add-edit', component: AddEditAdvertisementComponent },
    { path: 'add-edit/:id', component: AddEditAdvertisementComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdvertisementsRoutingModule { }
