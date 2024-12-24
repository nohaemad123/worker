import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OffersRoutingModule } from './offers-routing.module';
import { DataTableComponent } from '@shared/components/data-table/data-table.component';
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
import { ViewOffersComponent } from './components/view-offers/view-offers.component';
import { AddEditOfferComponent } from './components/add-edit-offer/add-edit-offer.component';
import { PasswordModule } from 'primeng/password';
import { NgSelectModule } from '@ng-select/ng-select';
import { PositiveNumberDirective } from '@shared/directives/positive-number.directive';

@NgModule({
    declarations: [ViewOffersComponent, AddEditOfferComponent],
    imports: [
        CommonModule,
        OffersRoutingModule,
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
        NgSelectModule,
        PositiveNumberDirective
    ],
    providers: [DialogService],
})
export class OffersModule {}
