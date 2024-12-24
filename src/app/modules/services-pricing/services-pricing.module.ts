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
import { NgSelectModule } from '@ng-select/ng-select';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ServicesPricingRoutingModule } from './services-pricing-routing.module';
import { ViewServicesPricingComponent } from './components/view-services-pricing/view-services-pricing.component';
import { AddEditServicesPricingComponent } from './components/add-edit-services-pricing/add-edit-services-pricing.component';
import { PositiveNumberDirective } from '@shared/directives/positive-number.directive';
import { MatIconModule } from '@angular/material/icon';
import { InputNumberMaskDirective } from '@shared/directives/input-number-mask.directive';
import { ToastModule } from 'primeng/toast';

@NgModule({
    declarations: [
        ViewServicesPricingComponent,
        AddEditServicesPricingComponent
    ],
    imports: [
        CommonModule,
        ServicesPricingRoutingModule,
        DataTableComponent,
        TranslocoModule,
        InputTextModule,
        InputIconModule,
        IconFieldModule,
        FormsModule,
        ReactiveFormsModule,
        DynamicDialogModule,
        DynamicDialogComponent,
        DropdownModule,
        RadioButtonModule,
        NgSelectModule,
        PositiveNumberDirective,
        MatIconModule,
        InputNumberMaskDirective,
        ToastModule
    ],
    providers: [DialogService]
})
export class ServicesPricingModule { }
