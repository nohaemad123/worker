import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewCompaniesComponent } from './components/view-companies/view-companies.component';
import { AddEditCompaniesComponent } from './components/add-edit-companies/add-edit-companies.component';
import { DeletedCompaniesComponent } from './components/deleted-companies/deleted-companies.component';

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'view' },
    { path: 'view', component: ViewCompaniesComponent },
    { path: 'deleted', component: DeletedCompaniesComponent },
    { path: 'add-edit', component: AddEditCompaniesComponent },
    { path: 'add-edit/:id', component: AddEditCompaniesComponent },
    { path: 'view-details/:mode/:id', component: AddEditCompaniesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompaniesRoutingModule { }
