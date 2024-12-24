import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BasicServicesService } from 'app/core/services/Basic-services/basic-services.service';
import { PaginationData } from '@shared/models';
import { ENDPOINT } from 'app/core/enums/endPoints.enum';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { formatDate } from '@angular/common';
import moment from 'moment';
import { FormatDate } from '@shared/utils/formatDate';

@Component({
  selector: 'app-orders-reports',
  templateUrl: './orders-reports.component.html',
  styleUrl: './orders-reports.component.scss'
})
export class OrdersReportsComponent implements OnInit {

  private _transloco = inject(TranslocoService);
  private _formBuilder = inject(FormBuilder);
  private _basicService = inject(BasicServicesService);
  private _destroyRef = inject(DestroyRef);

  searchForm!: FormGroup;
  ref: DynamicDialogRef;
  filterCriteria = {
    page: 1,
    pageSize: 10,
    search: null,
    readDto: {
      from: null,
      to: null
    },
    selectColumns: [
      'id',
      'companyName',
      'countOfVisit',
      'agreementDuration',
      'countOfWorker',
      'descount',
      'firstVisit',
      'isActive',
      'nationalityName',
      'orderDays',
      'orderStatus',
      'orderStatusId',
      'paymentStatus',
      'paymentStatusId',
      'price',
      'shiftName',
      'tax',
      'userAddres',
      'userName',
      'CreatedOn',
      'LastUpdatedOn'
    ],
    sortColumn: '',
    sortColumnDirection: 'asc',
  };
  tableConfig = {
    columns: [
      {
        header: '#',
        field: 'id',
        type: 'text',
        sortable: false,
        style: 'text-start',
        rowStyle: 'text-start',
      },
      {
        header: this._transloco.translate('reports.view.table.client_name'),
        field: 'userName',
        type: 'text',
        sortable: false,
        style: 'text-center',
        rowStyle: 'text-center font-regular text-black text-md',
      },
      {
        header: this._transloco.translate('reports.view.table.order_date'),
        field: 'createdOn',
        type: 'date',
        sortable: false,
        style: 'text-center',
        rowStyle: 'text-center text-black text-md',
      },
      {
        header: this._transloco.translate('reports.view.table.edit_date'),
        field: 'lastUpdatedOn',
        type: 'date',
        sortable: false,
        style: 'text-center',
        rowStyle: 'text-center text-black text-md',
      },
      {
        header: this._transloco.translate('reports.view.table.nationality'),
        field: 'nationalityName',
        type: 'text',
        sortable: false,
        style: 'text-center',
        rowStyle: 'text-center text-black text-md',
      },
      {
        header: this._transloco.translate('reports.view.table.order_status'),
        field: 'orderStatus',
        type: 'text',
        // type: 'selection',
        sortable: false,
        style: 'text-center',
        rowStyle: 'text-center text-black text-md',
      },
      {
        header: this._transloco.translate('reports.view.table.payment_status'),
        field: 'paymentStatus',
        type: 'text',
        sortable: false,
        style: 'text-center',
        rowStyle: 'text-center text-black text-md',
      },

      {
        header: this._transloco.translate('reports.view.table.total'),
        field: 'price',
        type: 'number',
        sortable: false,
        style: 'text-center',
        rowStyle: 'text-center text-black text-md',
      },
      {
        header: 'Actions',
        field: '',
        style: '',
        sortable: false,
        type: 'action',
      },
    ],
    data: [],
    total: 0,
    totalPages: 0,
    paginator: true,
    lazy: true,
    loading: false,
    withCheckBoxes: false,
    withSort: true,
    controlColumns: false,
    withSearch: false,
    withFilter: false,
    rows: this.filterCriteria.pageSize,
    tableStyle: { 'min-width': '50rem' },
    rowsPerPageOptions: [5, 10, 20, 30],
    globalFilterFields: [],
    emptyMsg: 'No records found',
    actions: [
      {
        label: 'Print',
        key: 'PRINT',
        icon: 'feather:printer',
        type: 'ACTION',
      },
    ],
    tableFilter: [],
  };
  numberOfItemsFromEnd = 5;

  paginationData: PaginationData;

  ngOnInit(): void {
    this.initSearchForm();
    this.getAllOrdersList();
  }

  getAllOrdersList(): void {
    this.tableConfig.loading = true;
    this._basicService
      .getAll(ENDPOINT.ORDERS, this.filterCriteria)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(
        (res) => {
          this.paginationData = res.data.paginationData;
          this.tableConfig.data = res.data.listData;
          this.tableConfig.total = res.data.paginationData.totalCount;
          this.tableConfig.totalPages = res.data.paginationData.totalPages;
          this.tableConfig.loading = false;
          this.tableConfig = { ... this.tableConfig };
        },
        (err) => {
          this.tableConfig.loading = false;
        }
      );
  }


  search(): void {
    this.filterCriteria.readDto.from = this.searchForm.controls['from']
      .value
      ? FormatDate(this.searchForm.controls['from'].value)
      : null;
    this.filterCriteria.readDto.to = this.searchForm.controls['to']
      .value
      ? FormatDate(this.searchForm.controls['to'].value)
      : null;
    this.filterCriteria.page = 1;
    this.getAllOrdersList();
  }


  resetSearch(): void {
    this.searchForm.reset();
    this.filterCriteria.readDto.from = null;
    this.filterCriteria.readDto.to = null;
    this.filterCriteria.page = 1;
    this.getAllOrdersList();
  }


  initSearchForm(): void {
    this.searchForm = this._formBuilder.group({
      from: [null],
      to: [null],
    });
  }

  onActionClick(event: any): void {
    switch (event.key) {
      case 'PRINT':
        this.onPrintReport(event.item);
        break;
    }
  }

  onPrintReport(item: any): void {
    this._basicService
      .getWithParams(ENDPOINT.ORDER_REPORT + '/GetOrderReport/' + item.id, {})
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(
        (res) => {
          console.log(res);
          this.openPdfInNewTab(res?.stringBase64);
        },
        (err) => {

        }
      );
  }

  openPdfInNewTab(base64Data): void {
    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'application/pdf' });

    // Open Blob in new tab
    const blobUrl = URL.createObjectURL(blob);
    window.open(blobUrl, '_blank');
  }

  onPaginationChange(event: any): void {
    this.filterCriteria.page = event.first / event.rows + 1;
    this.filterCriteria.pageSize = event.rows;
    this.tableConfig.rows = event.rows;
    this.getAllOrdersList();
  }

}
