import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { UsersRoutingModule } from './users-routing.module';
import { ViewUsersComponent } from './components/view-users/view-users.component';
import { AddEditUserComponent } from './components/add-edit-user/add-edit-user.component';
import { PasswordModule } from 'primeng/password';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
    declarations: [ViewUsersComponent, AddEditUserComponent],
    imports: [
        CommonModule,
        UsersRoutingModule,
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
        NgSelectModule
    ],
    providers: [DialogService],
})
export class UsersModule {}
