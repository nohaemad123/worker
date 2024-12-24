import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewSystemServicesComponent } from './components/view-system-services/view-system-services.component';
import { AddEditSystemServicesComponent } from './components/add-edit-system-services/add-edit-system-services.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'view' },
  { path: 'view', component: ViewSystemServicesComponent },
  { path: 'add-edit', component: AddEditSystemServicesComponent },
  { path: 'add-edit/:id', component: AddEditSystemServicesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemServiceRoutingModule { }
