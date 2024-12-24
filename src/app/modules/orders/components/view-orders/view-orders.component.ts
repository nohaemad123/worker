import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoService } from '@ngneat/transloco';
import { Router } from '@angular/router';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BasicServicesService } from 'app/core/services/Basic-services/basic-services.service';
import { PaginationData } from '@shared/models';
import { DynamicDialogComponent } from '@shared/components/dynamic-dialog/dynamic-dialog.component';
import { ENDPOINT } from 'app/core/enums/endPoints.enum';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-view-orders',
  templateUrl: './view-orders.component.html',
  styleUrl: './view-orders.component.scss'
})
export class ViewOrdersComponent implements OnInit {

  private _transloco = inject(TranslocoService);
  private _router = inject(Router);
  private _dialogService = inject(DialogService);
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
      userName: '',
      companyBranchId: null
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
        header: this._transloco.translate('orders.view.table.client_name'),
        field: 'userName',
        type: 'text',
        sortable: false,
        style: 'text-center',
        rowStyle: 'text-center font-regular text-black text-md',
      },
      {
        header: this._transloco.translate('orders.view.table.order_date'),
        field: 'createdOn',
        type: 'date',
        sortable: false,
        style: 'text-center',
        rowStyle: 'text-center text-black text-md',
      },
      {
        header: this._transloco.translate('orders.view.table.edit_date'),
        field: 'lastUpdatedOn',
        type: 'date',
        sortable: false,
        style: 'text-center',
        rowStyle: 'text-center text-black text-md',
      },
      {
        header: this._transloco.translate('orders.view.table.nationality'),
        field: 'nationalityName',
        type: 'text',
        sortable: false,
        style: 'text-center',
        rowStyle: 'text-center text-black text-md',
      },
      {
        header: this._transloco.translate('orders.view.table.order_status'),
        field: 'orderStatusId',
        // type: 'text',
        type: 'selection',
        sortable: false,
        style: 'text-center',
        rowStyle: 'text-center text-black text-md',
      },
      {
        header: this._transloco.translate('orders.view.table.payment_status'),
        field: 'paymentStatus',
        type: 'text',
        sortable: false,
        style: 'text-center',
        rowStyle: 'text-center text-black text-md',
      },

      {
        header: this._transloco.translate('orders.view.table.total'),
        field: 'price',
        type: 'number',
        sortable: false,
        style: 'text-center',
        rowStyle: 'text-center text-black text-md',
      },
      // {
      //   header: "Operations",
      //   field: '',
      //   style: '',
      //   sortable: false,
      //   type: 'operation',
      // },
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
      // {
      //   label: 'Delete',
      //   key: 'DELETE',
      //   icon: 'feather:trash-2',
      //   type: 'ACTION',
      // },
    ],
    tableFilter: [],
  };
  numberOfItemsFromEnd = 5;

  servicesTypesFilterCriteria = {
    page: 1,
    pageSize: 1000,
    search: null,
    readDto: {
      name: null,
      isActive: true
    },
    selectColumns: [
      'id',
      'name'
    ],
    sortColumn: '',
    sortColumnDirection: 'asc',
  };
  servicesTypesList: any[] = [];
  servicesTypesLoading = false;

  branchesFilterCriteria = {
    page: 1,
    pageSize: 1000,
    search: null,
    readDto: {
      name: null,
      isActive: true
    },
    selectColumns: [
      'id',
      'branchName'
    ],
    sortColumn: '',
    sortColumnDirection: 'asc',
  };
  branchesList: any[] = [];
  branchesLoading = false;

  paginationData: PaginationData;
  orders: any[] = [];

  ngOnInit(): void {
    this.initSearchForm();
    // this.getAllServicesTypesList();
    this.getAllBranchesList();
    this.getAllOrdersList();
  }

  getAllServicesTypesList(): void {
    this.servicesTypesLoading = true;
    this._basicService
      .getAll(ENDPOINT.SERVICES, this.servicesTypesFilterCriteria)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(
        (res) => {
          this.servicesTypesList = [... this.servicesTypesList, ...res.data.listData];
          this.servicesTypesLoading = false;
        },
        (err) => {
          this.servicesTypesLoading = false;
        }
      );
  }

  onServiceTypesSearch(searchTerm: any): void {
    if (searchTerm?.term?.trim().length > 2) {
      this.servicesTypesList = [];
      this.servicesTypesFilterCriteria.page = 1;
      this.servicesTypesFilterCriteria.search = searchTerm?.term?.trim();
      this.getAllServicesTypesList();
    }
  }

  onClearServicesTypes(ev: any): void {
    this.servicesTypesList = [];
    this.servicesTypesFilterCriteria.page = 1;
    this.servicesTypesFilterCriteria.search = '';
    this.getAllServicesTypesList();
  }

  onServiceTypesScroll({ end }): void {
    if (end + this.numberOfItemsFromEnd >= this.servicesTypesList?.length) {
      this.getAllServicesTypesList();
    }
  }

  onServiceTypesScrollToEnd(): void {
    this.servicesTypesFilterCriteria.page++;
    this.getAllServicesTypesList();
  }

  getAllBranchesList(): void {
    this.branchesLoading = true;
    this._basicService
      .getAll(ENDPOINT.COMPANY_BRANCHES, this.branchesFilterCriteria)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(
        (res) => {
          this.branchesList = [...this.branchesList, ...res.data.listData];
          this.branchesLoading = false;
        },
        (err) => {
          this.branchesLoading = false;
        }
      );
  }

  onBranchesSearch(searchTerm: any): void {
    if (searchTerm?.term?.trim().length > 2) {
      this.branchesList = [];
      this.branchesFilterCriteria.page = 1;
      this.branchesFilterCriteria.search = searchTerm?.term?.trim();
      this.getAllBranchesList();
    }
  }

  onClearBranches(ev: any): void {
    this.branchesList = [];
    this.branchesFilterCriteria.page = 1;
    this.branchesFilterCriteria.search = '';
    this.getAllBranchesList();
  }

  onBranchesScroll({ end }): void {
    if (end + this.numberOfItemsFromEnd >= this.branchesList?.length) {
      this.getAllBranchesList();
    }
  }

  onBranchesScrollToEnd(): void {
    this.branchesFilterCriteria.page++;
    this.getAllBranchesList();
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
    this.filterCriteria.readDto.companyBranchId =
      this.searchForm.controls['companyBranchId'].value;
    // this.filterCriteria.readDto.code =
    //   this.searchForm.controls['commercialRegistrationNumber'].value;
    this.filterCriteria.readDto.userName = this.searchForm.controls['userName']
      .value
      ? this.searchForm.controls['userName'].value
      : null;
    this.filterCriteria.page = 1;
    this.getAllOrdersList();
  }


  initSearchForm(): void {
    this.searchForm = this._formBuilder.group({
      userName: [''],
      companyBranchId: [null],
    });
  }


  askDeleteOrder(id: any): void {
    this.ref = this._dialogService.open(DynamicDialogComponent, {
      width: '30vw',
      height: 'auto',
      data: {
        title: 'dynamicDialog.ask_delete_order',
        description: 'dynamicDialog.delete_order_description',
        actionText: 'dynamicDialog.delete',
        cancelText: 'dynamicDialog.back',
        image: 'assets/images/ui/Inbox_cleanup.gif',
      },
    });

    if (this.ref) {
      this.ref.onClose.subscribe((data) => {
        if (data) {
          if (data.action === 'action') {
            this.onDeleteOrder(id);
            // this.clearForm();
          } else if (data.action === 'cancel') {
            this.getAllOrdersList();
            // this._router.navigate([`Companies/view`]);
          }
        }
      });
    } else {
      console.error('Dialog could not be opened.');
    }
  }

  deletedOrder(): void {
    this.ref = this._dialogService.open(DynamicDialogComponent, {
      width: '30vw',
      height: 'auto',
      data: {
        title: 'dynamicDialog.Congratulations',
        description: 'dynamicDialog.delete_order',
        cancelText: 'dynamicDialog.back',
        image: 'assets/images/ui/Inbox_cleanup.gif',
      },
    });

    if (this.ref) {
      this.ref.onClose.subscribe((data) => {
        if (data) {
          this.getAllOrdersList();
          // this._router.navigate([`Companies/view`]);
        }
      });
    } else {
      console.error('Dialog could not be opened.');
    }
  }

  onDeleteOrder(id: any): void {
    this._basicService
      .delete(ENDPOINT.ORDERS, id)
      .subscribe((res: any) => {
        this.deletedOrder()
      });
  }

  onActionClick(ev: { key: string; item: any }): void {
    switch (ev.key) {
      case 'CHANGE_STATUS':
          this.changeOrderStatus(ev.item);
          break;
      case 'DELETE':
          this.askDeleteOrder(ev.item.id);
          break;
      default:
          break;
    }
  }

  changeOrderStatus(item: any): void {
    this._basicService
    .updateWithParams(ENDPOINT.ORDERS + '/UpdateOrderStatus', {
      id: item.id,
      orderStatus: item.newStatus
    }, {})
    .pipe(takeUntilDestroyed(this._destroyRef))
    .subscribe((response: any) => {
        this.getAllOrdersList();
    });
  }

  onPaginationChange(event: any): void {
    this.filterCriteria.page = event.first / event.rows + 1;
    this.filterCriteria.pageSize = event.rows;
    this.tableConfig.rows = event.rows;
    this.getAllOrdersList();
  }

}
