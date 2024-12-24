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
import { WorkersRoutingModule } from './workers-routing.module';
import { AddEditWorkersComponent } from './components/add-edit-workers/add-edit-workers.component';
import { ViewWorkersComponent } from './components/view-workers/view-workers.component';
import { DropdownModule } from 'primeng/dropdown';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { MatIconModule } from '@angular/material/icon';
import { PositiveNumberDirective } from '@shared/directives/positive-number.directive';

@NgModule({
  declarations: [
  
    AddEditWorkersComponent,
       ViewWorkersComponent,
  ],
  imports: [
    CommonModule,
    WorkersRoutingModule,
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
    MatIconModule,
    PositiveNumberDirective

  ],
  providers: [DialogService]
})
export class WorkersModule { }
