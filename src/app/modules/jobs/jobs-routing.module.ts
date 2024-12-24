import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewJobsComponent } from './components/view-jobs/view-jobs.component';
import { DeletedJobsComponent } from './components/deleted-jobs/deleted-jobs.component';
import { AddEditJobsComponent } from './components/add-edit-jobs/add-edit-jobs.component';

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'view' },
    { path: 'view', component: ViewJobsComponent },
    { path: 'deleted', component: DeletedJobsComponent },
    { path: 'add-edit', component: AddEditJobsComponent },
    { path: 'add-edit/:id', component: AddEditJobsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobsRoutingModule { }
