import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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
import { NgSelectModule } from '@ng-select/ng-select';
import { TableModule } from 'primeng/table';
import { MultiSelectModule } from 'primeng/multiselect';
import { MenuModule } from 'primeng/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { PaginatorModule } from 'primeng/paginator';
import { CommissionsRoutingModule } from './commissions-routing.module';
import { ViewCommissionsComponent } from './components/view-commissions/view-commissions.component';
import { AddEditCommissionComponent } from './components/add-edit-commission/add-edit-commission.component';


@NgModule({
  declarations: [
    ViewCommissionsComponent,
    AddEditCommissionComponent
  ],
  imports: [
    CommonModule,
    CommissionsRoutingModule,
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
    MatIconModule,
    NgSelectModule,
    TableModule,
    MultiSelectModule,
    MenuModule,
    MatButtonModule,
    MatMenuModule
  ]
})
export class CommissionsModule { }
