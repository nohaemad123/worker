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
import { ProvidedServicesRoutingModule } from './provided-services-routing.module';
import { ViewProvidedServicesComponent } from './components/view-provided-services/view-provided-services.component';
import { DeletedProvidedServicesComponent } from './components/deleted-provided-services/deleted-provided-services.component';
import { AddEditProvidedServicesComponent } from './components/add-edit-provided-services/add-edit-provided-services.component';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';

@NgModule({
    declarations: [
        ViewProvidedServicesComponent,
        DeletedProvidedServicesComponent,
        AddEditProvidedServicesComponent
    ],
    imports: [
        CommonModule,
        ProvidedServicesRoutingModule,
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
        RadioButtonModule
    ],
    providers: [DialogService]
})
export class ProvidedServicesModule { }
