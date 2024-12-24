import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SystemServiceRoutingModule } from './system-service-routing.module';
import { DataTableComponent } from '@shared/components/data-table/data-table.component';
import { TranslocoModule } from '@ngneat/transloco';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { DynamicDialogComponent } from '@shared/components/dynamic-dialog/dynamic-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { PositiveNumberDirective } from '@shared/directives/positive-number.directive';
import { ViewSystemServicesComponent } from './components/view-system-services/view-system-services.component';
import { AddEditSystemServicesComponent } from './components/add-edit-system-services/add-edit-system-services.component';

@NgModule({
  declarations: [ViewSystemServicesComponent,AddEditSystemServicesComponent],
  imports: [
    CommonModule,
    SystemServiceRoutingModule,
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
    MatIconModule,
    PositiveNumberDirective
  ],
  providers: [DialogService]
})
export class SystemServiceModule { }
