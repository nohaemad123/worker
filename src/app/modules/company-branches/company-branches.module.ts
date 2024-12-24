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
import { CompanyBranchesRoutingModule } from './company-branches-routing.module';
import { ViewCompanyBranchesComponent } from './components/view-company-branches/view-company-branches.component';
import { AddEditCompanyBranchesComponent } from './components/add-edit-company-branches/add-edit-company-branches.component';
import { DeletedCompanyBranchesComponent } from './components/deleted-company-branches/deleted-company-branches.component';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { MapPopupComponent } from './components/map-popup/map-popup.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
    declarations: [
        ViewCompanyBranchesComponent,
        AddEditCompanyBranchesComponent,
        DeletedCompanyBranchesComponent,
        MapPopupComponent
    ],
    imports: [
        CommonModule,
        CompanyBranchesRoutingModule,
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
        LeafletModule,
        MatAutocompleteModule,
        MatFormFieldModule,
        MatInputModule,
        MatOptionModule,
        MatIconModule
    ],
    providers: [DialogService]
})
export class CompanyBranchesModule { }
