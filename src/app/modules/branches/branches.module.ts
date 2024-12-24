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
import { BranchesRoutingModule } from './branches-routing.module';
import { ViewBranchesComponent } from './components/view-branches/view-branches.component';
import { AddEditBranchesComponent } from './components/add-edit-branches/add-edit-branches.component';
import { DeletedBranchesComponent } from './components/deleted-branches/deleted-branches.component';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';

@NgModule({
    declarations: [
        ViewBranchesComponent,
        AddEditBranchesComponent,
        DeletedBranchesComponent
    ],
    imports: [
        CommonModule,
        BranchesRoutingModule,
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
export class BranchesModule { }
