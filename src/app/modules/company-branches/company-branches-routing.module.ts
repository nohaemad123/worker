import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewCompanyBranchesComponent } from './components/view-company-branches/view-company-branches.component';
import { DeletedCompanyBranchesComponent } from './components/deleted-company-branches/deleted-company-branches.component';
import { AddEditCompanyBranchesComponent } from './components/add-edit-company-branches/add-edit-company-branches.component';

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'view' },
    { path: 'view', component: ViewCompanyBranchesComponent },
    { path: 'deleted', component: DeletedCompanyBranchesComponent },
    { path: 'add-edit', component: AddEditCompanyBranchesComponent },
    { path: 'add-edit/:id', component: AddEditCompanyBranchesComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CompanyBranchesRoutingModule { }
