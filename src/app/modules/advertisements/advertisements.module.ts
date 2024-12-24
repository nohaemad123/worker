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
import { ViewAdvertisementsComponent } from './components/view-advertisements/view-advertisements.component';
import { AddEditAdvertisementComponent } from './components/add-edit-advertisement/add-edit-advertisement.component';
import { AdvertisementsRoutingModule } from './advertisements-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { PositiveNumberDirective } from '@shared/directives/positive-number.directive';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { MAT_DATE_LOCALE } from '@angular/material/core';

@NgModule({
    declarations: [
        ViewAdvertisementsComponent,
        AddEditAdvertisementComponent
    ],
    imports: [
        CommonModule,
        AdvertisementsRoutingModule,
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
        MatIconModule,
        PositiveNumberDirective,
        MatDatepickerModule,
        MatMomentDateModule

    ],
    providers: [DialogService,
        { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
        { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }

    ]
})
export class AdvertisementsModule { }
