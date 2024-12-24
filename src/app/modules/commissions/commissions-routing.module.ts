import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewCommissionsComponent } from './components/view-commissions/view-commissions.component';
import { AddEditCommissionComponent } from './components/add-edit-commission/add-edit-commission.component';

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'view' },
    { path: 'view', component: ViewCommissionsComponent },
    { path: 'add-edit', component: AddEditCommissionComponent },
    { path: 'add-edit/:id', component: AddEditCommissionComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommissionsRoutingModule { }
