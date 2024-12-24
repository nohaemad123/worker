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
import { ShiftsRoutingModule } from './shifts-routing.module';
import { ViewShiftsComponent } from './components/view-shifts/view-shifts.component';
import { AddEditShiftsComponent } from './components/add-edit-shifts/add-edit-shifts.component';
import { DeletedShiftsComponent } from './components/deleted-shifts/deleted-shifts.component';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CalendarModule } from 'primeng/calendar';

@NgModule({
    declarations: [
        ViewShiftsComponent,
        AddEditShiftsComponent,
        DeletedShiftsComponent
    ],
    imports: [
        CommonModule,
        ShiftsRoutingModule,
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
        RadioButtonModule,
        CalendarModule
    ],
    providers: [DialogService]
})
export class ShiftsModule { }
