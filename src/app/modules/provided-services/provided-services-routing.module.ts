import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewProvidedServicesComponent } from './components/view-provided-services/view-provided-services.component';
import { DeletedProvidedServicesComponent } from './components/deleted-provided-services/deleted-provided-services.component';
import { AddEditProvidedServicesComponent } from './components/add-edit-provided-services/add-edit-provided-services.component';

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'view' },
    { path: 'view', component: ViewProvidedServicesComponent },
    { path: 'deleted', component: DeletedProvidedServicesComponent },
    { path: 'add-edit', component: AddEditProvidedServicesComponent },
    { path: 'add-edit/:id', component: AddEditProvidedServicesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProvidedServicesRoutingModule { }
