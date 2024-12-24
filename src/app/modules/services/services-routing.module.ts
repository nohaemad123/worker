import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewServicesComponent } from './components/view-services/view-services.component';
import { DeletedServicesComponent } from './components/deleted-services/deleted-services.component';
import { AddEditServicesComponent } from './components/add-edit-services/add-edit-services.component';

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'view' },
    { path: 'view', component: ViewServicesComponent },
    { path: 'deleted', component: DeletedServicesComponent },
    { path: 'add-edit', component: AddEditServicesComponent },
    { path: 'add-edit/:id', component: AddEditServicesComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ServicesRoutingModule { }
