import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    SimpleChanges,
    ViewChild,
    inject,
    signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Table, TableModule } from 'primeng/table';
import { SortEvent } from 'primeng/api';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { MatIconModule } from '@angular/material/icon';
// import { SplitButtonModule } from 'primeng/splitbutton';
import { MenuModule } from 'primeng/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { TranslocoModule, TranslocoService } from '@ngneat/transloco';
import { Router } from '@angular/router';
import { PaginatorModule } from 'primeng/paginator';
import { DropdownModule } from 'primeng/dropdown';

@Component({
    selector: 'app-data-table',
    standalone: true,
    imports: [
        CommonModule,
        TableModule,
        FormsModule,
        ReactiveFormsModule,
        MultiSelectModule,
        MatIconModule,
        MenuModule,
        MatButtonModule,
        MatMenuModule,
        TranslocoModule,
        PaginatorModule,
        DropdownModule,
    ],
    templateUrl: './data-table.component.html',
    styleUrl: './data-table.component.scss',
})
export class DataTableComponent implements OnChanges {
    private _transloco = inject(TranslocoService);

    @Input() tableConfig;
    @Output() paginationEmitter = new EventEmitter();
    @Output() actionEmitter = new EventEmitter();
    @Output() sortcal = new EventEmitter();

    loading = false;
    lang = this._transloco.getActiveLang();

    selectedItems = [];
    @ViewChild('dt') dt: Table;
    initialValue = signal([]);
    isSorted: boolean = null;

    selectedColumns: any = signal([]);
    representatives: boolean = false;
    productGroup: boolean = false;
    router = inject(Router);
    rowsItems = 0;
    imgPath = 'https://worker.bnoop.net/';


    ngOnInit() {
        if (this.router.url.includes('representatives')) {
            this.representatives = true;
        }
        if (this.router.url.includes('product-group')) {
            this.productGroup = true;
        }
        this.selectedColumns.set(this.tableConfig.columns);
        this.tableConfig.data = this.tableConfig.data.map((item, index) => ({
            ...item,
            index: index + 1,
        }));
        this.initialValue.set([...this.tableConfig.data]);
        this.rowsItems = this.tableConfig.rows;
        
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.tableConfig = changes.tableConfig.currentValue
            ? changes.tableConfig.currentValue
            : this.tableConfig;
        this.tableConfig.data = this.tableConfig.data.map((item, index) => ({
            ...item,
            index: index + 1,
        }));
        this.initialValue.set([...this.tableConfig.data]);
    }

    onPageSizeChange(event): void {
        this.rowsItems = event.value;
        this.pageChange({ first: 0, rows: event.value });
    }

    pageChange(event): void {
        this.paginationEmitter.emit({
            ...event,
            rows: this.rowsItems,
        });
    }

    customSort(event: SortEvent) {
        if (this.isSorted == null || this.isSorted === undefined) {
            this.isSorted = true;
            this.sortTableData(event);
        } else if (this.isSorted == true) {
            this.isSorted = false;
            this.sortTableData(event);
        } else if (this.isSorted == false) {
            this.isSorted = null;
            this.tableConfig.data = [...this.initialValue()];
            this.dt.reset();
        }
    }

    sortTableData(event) {
        event.data.sort((data1, data2) => {
            let value1 = data1[event.field];
            let value2 = data2[event.field];
            let result = null;
            if (value1 == null && value2 != null) result = -1;
            else if (value1 != null && value2 == null) result = 1;
            else if (value1 == null && value2 == null) result = 0;
            else if (typeof value1 === 'string' && typeof value2 === 'string')
                result = value1.localeCompare(value2);
            else result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;

            return event.order * result;
        });
    }

    actionClicked(key: string, type: 'LINK' | 'ACTION', item: any): void {
        this.actionEmitter.emit({ key, item });
    }
    SortData(col: any) {
        if(col.sortable) {
            this.sortcal.emit(col.field);
        }
    }
}
