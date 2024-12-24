import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompaniesRoutingModule } from './companies-routing.module';
import { AddEditCompaniesComponent } from './components/add-edit-companies/add-edit-companies.component';
import { ViewCompaniesComponent } from './components/view-companies/view-companies.component';
import { DataTableComponent } from '@shared/components/data-table/data-table.component';
import { TranslocoModule } from '@ngneat/transloco';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeletedCompaniesComponent } from './components/deleted-companies/deleted-companies.component';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { DynamicDialogComponent } from '@shared/components/dynamic-dialog/dynamic-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { PositiveNumberDirective } from '@shared/directives/positive-number.directive';
import { InputNumberMaskDirective } from '@shared/directives/input-number-mask.directive';

@NgModule({
  declarations: [
    AddEditCompaniesComponent,
    ViewCompaniesComponent,
    DeletedCompaniesComponent
  ],
  imports: [
    CommonModule,
    CompaniesRoutingModule,
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
    PositiveNumberDirective,
    InputNumberMaskDirective

  ],
  providers: [DialogService]
})
export class CompaniesModule { }
