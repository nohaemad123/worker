import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BasicServicesService } from 'app/core/services/Basic-services/basic-services.service';
import { PaginationData } from '@shared/models';
import { ENDPOINT } from 'app/core/enums/endPoints.enum';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormatDate } from '@shared/utils/formatDate';

@Component({
  selector: 'app-total-commissions-reports',
  templateUrl: './total-commissions-reports.component.html',
  styleUrl: './total-commissions-reports.component.scss'
})
export class TotalCommissionsReportsComponent implements OnInit {

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
      to: null,
      companyId: null
    },
    selectColumns: [
      'id',
      'code',
      'companyName',
      'companyBranchName',
      'total',
      'commotionRate',
      'totalAfterCommotion',
      'createdOn',
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
        header: this._transloco.translate('reports.view.table.company_name'),
        field: 'companyName',
        type: 'text',
        sortable: false,
        style: 'text-center',
        rowStyle: 'text-center font-regular text-black text-md',
      },
      {
        header: this._transloco.translate('reports.view.table.branch_name'),
        field: 'companyBranchName',
        type: 'text',
        sortable: false,
        style: 'text-center',
        rowStyle: 'text-center font-regular text-black text-md',
      },
      {
        header: this._transloco.translate('reports.view.table.service_title'),
        field: 'serviceName',
        type: 'text',
        sortable: false,
        style: 'text-center',
        rowStyle: 'text-center font-regular text-black text-md',
      },
      // {
      //   header: this._transloco.translate('reports.view.table.order_number'),
      //   field: 'code',
      //   type: 'number',
      //   sortable: false,
      //   style: 'text-center',
      //   rowStyle: 'text-center font-regular text-black text-md',
      // },
      // {
      //   header: this._transloco.translate('reports.view.table.order_date'),
      //   field: 'createdOn',
      //   type: 'date',
      //   sortable: false,
      //   style: 'text-center',
      //   rowStyle: 'text-center text-black text-md',
      // },
      {
        header: this._transloco.translate('reports.view.table.value'),
        field: 'total',
        type: 'price',
        sortable: false,
        style: 'text-center',
        rowStyle: 'text-center font-regular text-black text-md',
      },
      {
        header: this._transloco.translate('reports.view.table.commission_percent'),
        field: 'commotionRate',
        type: 'percentage',
        sortable: false,
        style: 'text-center',
        rowStyle: 'text-center font-regular text-black text-md',
      },
      {
        header: this._transloco.translate('reports.view.table.total'),
        field: 'totalAfterCommotion',
        type: 'price',
        sortable: false,
        style: 'text-center',
        rowStyle: 'text-center text-black text-md',
      },
      // {
      //   header: 'Actions',
      //   field: '',
      //   style: '',
      //   sortable: false,
      //   type: 'action',
      // },
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
      // {
      //   label: 'Print',
      //   key: 'PRINT',
      //   icon: 'feather:printer',
      //   type: 'ACTION',
      // },
    ],
    tableFilter: [],
  };
  numberOfItemsFromEnd = 5;
  companyFilterCriteria = {
    page: 1,
    pageSize: 10,
    search: null,
    readDto: {
      companyName: null,
      isActive: true
    },
    selectColumns: [
      'id',
      'companyName'
    ],
    sortColumn: '',
    sortColumnDirection: 'asc',
  };
  companiesList: any[] = [];
  companiesLoading = false;
  paginationData: PaginationData;

  ngOnInit(): void {
    this.initSearchForm();
    this.getAllReportsList();
    this.getAllCompaniesList();
  }

  getAllReportsList(): void {
    this.tableConfig.loading = true;
    this._basicService
      .get(ENDPOINT.TOTAL_COMMISSIONS + '/GetTotalCommotionOrder', this.filterCriteria)
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
    this.filterCriteria.readDto.companyId = this.searchForm.controls['company']
      .value.id
      ? this.searchForm.controls['company'].value.id
      : '';
    this.filterCriteria.page = 1;
    this.getAllReportsList();
  }


  resetSearch(): void {
    this.searchForm.reset();
    this.filterCriteria.readDto.from = null;
    this.filterCriteria.readDto.to = null;
    this.filterCriteria.readDto.companyId = null;
    this.filterCriteria.page = 1;
    this.getAllReportsList();
  }


  initSearchForm(): void {
    this.searchForm = this._formBuilder.group({
      from: [null, [Validators.required]],
      to: [null, [Validators.required]],
      company: [null, [Validators.required]]
    });
  }

  getAllCompaniesList(): void {
    this._basicService
      .getAll(ENDPOINT.COMPANY, this.companyFilterCriteria)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(
        (res) => {
          this.companiesList = [...this.companiesList, ...res.data.listData];
        },
        (err) => {
        }
      );
  }

  onCompaniesSearch(searchTerm: any): void {
    if (searchTerm?.term?.trim().length > 2) {
      this.companiesList = [];
      this.companyFilterCriteria.page = 1;
      this.companyFilterCriteria.search = searchTerm?.term?.trim();
      this.getAllCompaniesList();
    }
  }

  onClearCompanies(ev: any): void {
    this.companiesList = [];
    this.companyFilterCriteria.page = 1;
    this.companyFilterCriteria.search = '';
    this.getAllCompaniesList();
  }

  onCompaniesScroll({ end }): void {
    if (end + this.numberOfItemsFromEnd >= this.companiesList?.length) {
      this.getAllCompaniesList();
    }
  }

  onCompaniesScrollToEnd(): void {
    this.companyFilterCriteria.page++;
    this.getAllCompaniesList();
  }

  onSelectCompany(company: any): void {
    this.searchForm.controls['company'].setValue(company);
  }

  onActionClick(event: any): void {
    switch (event.key) {
      case 'PRINT':
        // this.onPrintReport(event.item);
        break;
    }
  }

  // onPrintReport(item: any): void {
  //   this._basicService
  //     .getWithParams(ENDPOINT.COMMISSION_REPORT + '/GetCommissionReport/' + item.id, {})
  //     .pipe(takeUntilDestroyed(this._destroyRef))
  //     .subscribe(
  //       (res) => {
  //         console.log(res);
  //         this.openPdfInNewTab(res?.stringBase64);
  //       },
  //       (err) => {

  //       }
  //     );
  // }

  onPrintReport(): void {
    this._basicService
      .get(ENDPOINT.COMMISSION_REPORT + '/TotalCommotionOrderReport', {
        from: this.searchForm.value.from,
        to: this.searchForm.value.to,
        companyId: this.searchForm.value.company.id,
        companyName: this.searchForm.value.company.companyName
      })
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(
        (res) => {
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


}
