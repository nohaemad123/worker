import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewNationalitiesComponent } from './components/view-nationalities/view-nationalities.component';
import { DeletedNationalitiesComponent } from './components/deleted-nationalities/deleted-nationalities.component';
import { AddEditNationalitiesComponent } from './components/add-edit-nationalities/add-edit-nationalities.component';

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'view' },
    { path: 'view', component: ViewNationalitiesComponent },
    { path: 'deleted', component: DeletedNationalitiesComponent },
    { path: 'add-edit', component: AddEditNationalitiesComponent },
    { path: 'add-edit/:id', component: AddEditNationalitiesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NationalitiesRoutingModule { }
