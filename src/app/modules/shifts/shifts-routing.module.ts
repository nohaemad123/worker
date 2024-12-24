import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewShiftsComponent } from './components/view-shifts/view-shifts.component';
import { DeletedShiftsComponent } from './components/deleted-shifts/deleted-shifts.component';
import { AddEditShiftsComponent } from './components/add-edit-shifts/add-edit-shifts.component';

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'view' },
    { path: 'view', component: ViewShiftsComponent },
    { path: 'deleted', component: DeletedShiftsComponent },
    { path: 'add-edit', component: AddEditShiftsComponent },
    { path: 'add-edit/:id', component: AddEditShiftsComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ShiftsRoutingModule { }
