import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditUserPermissionComponent } from './components/add-edit-user-permission/add-edit-user-permission.component';
import { ViewUserPermissionComponent } from './components/view-user-permission/view-user-permission.component';

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'view' },
    { path: 'view', component: ViewUserPermissionComponent },
    { path: 'add-edit', component: AddEditUserPermissionComponent },
    { path: 'add-edit/:id', component: AddEditUserPermissionComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class UserPermissionsRoutingModule { }
