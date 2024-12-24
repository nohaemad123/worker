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
import { RegionsRoutingModule } from './regions-routing.module';
import { DeletedRegionsComponent } from './components/deleted-regions/deleted-regions.component';
import { ViewRegionsComponent } from './components/view-regions/view-regions.component';
import { AddEditRegionsComponent } from './components/add-edit-regions/add-edit-regions.component';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
  declarations: [
    DeletedRegionsComponent,
    ViewRegionsComponent,
    AddEditRegionsComponent
  ],
  imports: [
    CommonModule,
    RegionsRoutingModule,
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
    DropdownModule
  ],
  providers: [DialogService]
})
export class RegionsModule { }
