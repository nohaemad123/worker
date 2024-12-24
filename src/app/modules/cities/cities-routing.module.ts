import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewCitiesComponent } from './components/view-cities/view-cities.component';
import { DeletedCitiesComponent } from './components/deleted-cities/deleted-cities.component';
import { AddEditCitiesComponent } from './components/add-edit-cities/add-edit-cities.component';

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'view' },
    { path: 'view', component: ViewCitiesComponent },
    { path: 'deleted', component: DeletedCitiesComponent },
    { path: 'add-edit', component: AddEditCitiesComponent },
    { path: 'add-edit/:id', component: AddEditCitiesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CitiesRoutingModule { }
