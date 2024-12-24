import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewBranchesComponent } from './components/view-branches/view-branches.component';
import { DeletedBranchesComponent } from './components/deleted-branches/deleted-branches.component';
import { AddEditBranchesComponent } from './components/add-edit-branches/add-edit-branches.component';

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'view' },
    { path: 'view', component: ViewBranchesComponent },
    { path: 'deleted', component: DeletedBranchesComponent },
    { path: 'add-edit', component: AddEditBranchesComponent },
    { path: 'add-edit/:id', component: AddEditBranchesComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BranchesRoutingModule { }
