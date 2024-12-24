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
import { ServicesRoutingModule } from './services-routing.module';
import { ViewServicesComponent } from './components/view-services/view-services.component';
import { AddEditServicesComponent } from './components/add-edit-services/add-edit-services.component';
import { DeletedServicesComponent } from './components/deleted-services/deleted-services.component';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';

@NgModule({
    declarations: [
        ViewServicesComponent,
        AddEditServicesComponent,
        DeletedServicesComponent
    ],
    imports: [
        CommonModule,
        ServicesRoutingModule,
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
        RadioButtonModule
    ],
    providers: [DialogService]
})
export class ServicesModule { }
