import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewWorkersComponent } from './components/view-workers/view-workers.component';
import { AddEditWorkersComponent } from './components/add-edit-workers/add-edit-workers.component';

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'view' },
    { path: 'view', component: ViewWorkersComponent },
    { path: 'add-edit', component: AddEditWorkersComponent },
    { path: 'add-edit/:id', component: AddEditWorkersComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkersRoutingModule { }
