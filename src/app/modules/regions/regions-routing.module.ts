import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewRegionsComponent } from './components/view-regions/view-regions.component';
import { DeletedRegionsComponent } from './components/deleted-regions/deleted-regions.component';
import { AddEditRegionsComponent } from './components/add-edit-regions/add-edit-regions.component';

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'view' },
    { path: 'view', component: ViewRegionsComponent },
    { path: 'deleted', component: DeletedRegionsComponent },
    { path: 'add-edit', component: AddEditRegionsComponent },
    { path: 'add-edit/:id', component: AddEditRegionsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegionsRoutingModule { }
