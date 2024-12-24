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
import { CitiesRoutingModule } from './cities-routing.module';
import { ViewCitiesComponent } from './components/view-cities/view-cities.component';
import { DeletedCitiesComponent } from './components/deleted-cities/deleted-cities.component';
import { AddEditCitiesComponent } from './components/add-edit-cities/add-edit-cities.component';

@NgModule({
  declarations: [
  
    ViewCitiesComponent,
       DeletedCitiesComponent,
       AddEditCitiesComponent
  ],
  imports: [
    CommonModule,
    CitiesRoutingModule,
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
export class CitiesModule { }
