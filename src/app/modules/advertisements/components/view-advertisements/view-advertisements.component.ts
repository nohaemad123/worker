import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BasicServicesService } from 'app/core/services/Basic-services/basic-services.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ENDPOINT } from 'app/core/enums/endPoints.enum';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DynamicDialogComponent } from '@shared/components/dynamic-dialog/dynamic-dialog.component';
import { PaginationData } from '@shared/models';
import { PermissionsService } from 'app/core/services/permissions/permissions.service';

@Component({
  selector: 'app-view-advertisements',
  templateUrl: './view-advertisements.component.html',
  styleUrl: './view-advertisements.component.scss'
})
export class ViewAdvertisementsComponent implements OnInit {

  private _transloco = inject(TranslocoService);
  private _router = inject(Router);
  private _dialogService = inject(DialogService);
  private _formBuilder = inject(FormBuilder);
  private _basicService = inject(BasicServicesService);
  private _destroyRef = inject(DestroyRef);
  private _permissionsService = inject(PermissionsService);

  searchForm!: FormGroup;
  ref: DynamicDialogRef;
  filterCriteria = {
    page: 1,
    pageSize: 10,
    search: null,
    readDto: {
      date: null,
      id: null,
      from: null,
      to: null
    },
    selectColumns: [
      'id',
      'date',
      'image'
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
      // {
      //   header: this._transloco.translate('advertisements.view.table.order'),
      //   field: 'order',
      //   type: 'number',
      //   sortable: false,
      //   style: 'text-center',
      //   rowStyle: 'text-center text-black text-md',
      // },
      {
        header: this._transloco.translate('advertisements.view.table.image'),
        field: 'image',
        type: 'image',
        sortable: false,
        style: 'text-center',
        rowStyle: 'text-center text-black text-md',
      },
      {
        header: this._transloco.translate('advertisements.view.table.date'),
        field: 'date',
        type: 'date',
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
      // { label: 'View', key: 'VIEW', icon: 'feather:eye', type: 'LINK' },
      // { label: 'LOCK', key: 'LOCK', icon: 'feather:lock', type: 'ACTION' },
      { label: 'Edit', key: 'EDIT', icon: 'feather:edit', type: 'LINK' },
      {
        label: 'Delete',
        key: 'DELETE',
        icon: 'feather:trash-2',
        type: 'ACTION',
      },
    ],
    tableFilter: [],
  };
  paginationData: PaginationData;

  // Permissions
  addPermission = false;
  editPermission = false;
  deletePermission = false;

  ngOnInit(): void {
    this.getPermissions();
    this.initSearchForm();
    this.getAllAdsList();
  }

  getPermissions(): void {
    const allowedPermissions = this._permissionsService.getPermissions('Advertisements');
    this.addPermission = allowedPermissions.addPermission;
    this.editPermission = allowedPermissions.editPermission;
    if (!this.editPermission) this.tableConfig.actions = this.tableConfig.actions.filter(action => action.key !== 'EDIT' && action.key !== 'LOCK');
    this.deletePermission = allowedPermissions.deletePermission;
    if (!this.deletePermission) this.tableConfig.actions = this.tableConfig.actions.filter(action => action.key !== 'DELETE');
  }

  getAllAdsList(): void {
    this.tableConfig.loading = true;
    this._basicService
      .getAll(ENDPOINT.ADVERTISEMENT, this.filterCriteria)
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

  navigateToAddNewAdvertisement(): void {
    this._router.navigate([`Advertisements/add-edit`]);
  }

  navigateToDeletedAdvertisement(): void {
    this._router.navigate([`Advertisements/deleted`]);
  }

  onPaginationChange(event: any): void {
    this.filterCriteria.page = event.first / event.rows + 1;
    this.filterCriteria.pageSize = event.rows;
    this.tableConfig.rows = event.rows;
    this.getAllAdsList();
  }


  search(): void {
    this.filterCriteria.readDto.from = this.searchForm.controls['from']
      .value
      ? this.searchForm.controls['from'].value.toISOString()
      : null;
    this.filterCriteria.readDto.to = this.searchForm.controls['to']
      .value
      ? this.searchForm.controls['to'].value.toISOString()
      : null;
    this.filterCriteria.page = 1;
    this.getAllAdsList();
  }

  resetSearch(): void {
    this.searchForm.reset();
    this.filterCriteria.readDto.from = null;
    this.filterCriteria.readDto.to = null;
    this.filterCriteria.page = 1;
    this.getAllAdsList();
  }

  initSearchForm(): void {
    this.searchForm = this._formBuilder.group({
      from: [null],
      to: [null],
    });
  }

  askDeleteAdvertisement(id: any): void {
    this.ref = this._dialogService.open(DynamicDialogComponent, {
      width: '30vw',
      height: 'auto',
      data: {
        title: 'dynamicDialog.ask_delete_adv',
        description: 'dynamicDialog.delete_adv_description',
        actionText: 'dynamicDialog.delete',
        cancelText: 'dynamicDialog.back',
        image: 'assets/images/ui/Inbox_cleanup.gif',
      },
    });

    if (this.ref) {
      this.ref.onClose.subscribe((data) => {
        if (data) {
          if (data.action === 'action') {
            this.onDeleteAdvertisement(id);
            // this.clearForm();
          } else if (data.action === 'cancel') {
            this.getAllAdsList();
            // this._router.navigate([`Advertisements/view`]);
          }
        }
      });
    } else {
      console.error('Dialog could not be opened.');
    }
  }

  deletedAdvertisement(): void {
    this.ref = this._dialogService.open(DynamicDialogComponent, {
      width: '30vw',
      height: 'auto',
      data: {
        title: 'dynamicDialog.Congratulations',
        description: 'dynamicDialog.delete_adv',
        cancelText: 'dynamicDialog.back',
        image: 'assets/images/ui/Inbox_cleanup.gif',
      },
    });

    if (this.ref) {
      this.ref.onClose.subscribe((data) => {
        if (data) {
          this.getAllAdsList();
          // this._router.navigate([`Advertisements/view`]);
        }
      });
    } else {
      console.error('Dialog could not be opened.');
    }
  }

  lock(item): void {
    this._basicService
      .lock(ENDPOINT.ADVERTISEMENT, item.id)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe((response: any) => {
        console.log(response.data.isActive);
        this.getAllAdsList();
      });
  }

  onActionClick(ev: { key: string; item: any }): void {
    switch (ev.key) {
      case 'LOCK':
        this.lock(ev.item);
        break;
      case 'EDIT':
        this._router.navigate([`/Advertisements/add-edit/${ev.item.id}`]);
        break;
      case 'DELETE':
        this.askDeleteAdvertisement(ev.item.id);
        break;
      default:
        break;
    }
  }

  onSort(event: string): void {
    this.filterCriteria.sortColumnDirection =
      this.filterCriteria.sortColumnDirection === 'asc' ? 'desc' : 'asc';
    this.filterCriteria.sortColumn = event;
    this.getAllAdsList();
  }

  onDeleteAdvertisement(id: any): void {
    this._basicService
      .delete(ENDPOINT.ADVERTISEMENT, id)
      .subscribe((res: any) => {
        this.deletedAdvertisement()
      });
  }

}
