import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserPermissionsRoutingModule } from './user-permissions-routing.module';
import { DataTableComponent } from '@shared/components/data-table/data-table.component';
import { TranslocoModule } from '@ngneat/transloco';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { DynamicDialogComponent } from '@shared/components/dynamic-dialog/dynamic-dialog.component';
import { DropdownModule } from 'primeng/dropdown';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { MatIconModule } from '@angular/material/icon';
import { PasswordModule } from 'primeng/password';
import { AddEditUserPermissionComponent } from './components/add-edit-user-permission/add-edit-user-permission.component';
import { ViewUserPermissionComponent } from './components/view-user-permission/view-user-permission.component';
import { TableModule } from 'primeng/table';
import { CheckboxModule } from 'primeng/checkbox';

@NgModule({
    declarations: [
        AddEditUserPermissionComponent,
        ViewUserPermissionComponent
    ],
    imports: [
        CommonModule,
        UserPermissionsRoutingModule,
        DataTableComponent,
        TranslocoModule,
        InputTextModule,
        InputIconModule,
        IconFieldModule,
        FormsModule,
        ReactiveFormsModule,
        DynamicDialogModule,
        DynamicDialogComponent,
        DynamicDialogModule,
        DropdownModule,
        BsDropdownModule,
        PasswordModule,
        MatIconModule,
        TableModule,
        CheckboxModule
    ],
    providers: [DialogService],
})
export class UserPermissionsModule { }
