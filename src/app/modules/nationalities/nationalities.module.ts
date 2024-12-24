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
import { NationalitiesRoutingModule } from './nationalities-routing.module';
import { AddEditNationalitiesComponent } from './components/add-edit-nationalities/add-edit-nationalities.component';
import { DeletedNationalitiesComponent } from './components/deleted-nationalities/deleted-nationalities.component';
import { ViewNationalitiesComponent } from './components/view-nationalities/view-nationalities.component';

@NgModule({
  declarations: [
  
    AddEditNationalitiesComponent,
       DeletedNationalitiesComponent,
       ViewNationalitiesComponent
  ],
  imports: [
    CommonModule,
    NationalitiesRoutingModule,
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
export class NationalitiesModule { }
