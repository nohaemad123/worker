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
import { JobsRoutingModule } from './jobs-routing.module';
import { ViewJobsComponent } from './components/view-jobs/view-jobs.component';
import { DeletedJobsComponent } from './components/deleted-jobs/deleted-jobs.component';
import { AddEditJobsComponent } from './components/add-edit-jobs/add-edit-jobs.component';

@NgModule({
  declarations: [
  
    ViewJobsComponent,
       DeletedJobsComponent,
       AddEditJobsComponent
  ],
  imports: [
    CommonModule,
    JobsRoutingModule,
    DataTableComponent,
    TranslocoModule,
    InputTextModule,
    InputIconModule,
    IconFieldModule,
    FormsModule,
    ReactiveFormsModule,
    DynamicDialogModule,
    DynamicDialogComponent,
    DynamicDialogModule
  ],
  providers: [DialogService]
})
export class JobsModule { }
