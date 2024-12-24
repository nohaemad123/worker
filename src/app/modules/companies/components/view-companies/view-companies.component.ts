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
    selector: 'app-view-companies',
    templateUrl: './view-companies.component.html',
    styleUrl: './view-companies.component.scss',
})
export class ViewCompaniesComponent implements OnInit {
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
            code: null,
            companyName: null,
            taxNumber: null,
        },
        selectColumns: [
            'id',
            'code',
            'companyName',
            'commercialRegistrationNumber',
            'taxNumber',
            'yearsOfExperience',
            'companyMobileNumber',
            'headquarters',
            'isActive',
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
                header: this._transloco.translate('companies.view.table.code'),
                field: 'code',
                type: 'number',
                sortable: false,
                style: 'text-center',
                rowStyle: 'text-center font-regular text-black text-md',
            },
            {
                header: this._transloco.translate('companies.view.table.name'),
                field: 'companyName',
                type: 'link',
                sortable: false,
                style: 'text-center',
                rowStyle: 'text-center w-full block text-primary hover:underline cursor-pointer text-lg',
            },
            {
                header: this._transloco.translate(
                    'companies.view.table.commerical'
                ),
                field: 'commercialRegistrationNumber',
                type: 'text',
                sortable: false,
                style: 'text-center',
                rowStyle: 'text-center',
            },
            {
                header: this._transloco.translate(
                    'companies.view.table.number'
                ),

                field: 'taxNumber',
                type: 'text',
                sortable: false,
                style: 'text-center',
                rowStyle: 'text-center',
            },
            {
                header: this._transloco.translate('companies.view.table.phone'),
                field: 'companyMobileNumber',
                type: 'number',
                sortable: false,
                style: 'text-center',
                rowStyle: 'text-center',
            },
            {
                header: this._transloco.translate(
                    'companies.view.table.address'
                ),
                field: 'headquarters',
                type: 'text',
                sortable: false,
                style: 'text-center',
                rowStyle: 'text-center',
            },
            {
                header: this._transloco.translate(
                    'companies.view.table.experience'
                ),
                field: 'yearsOfExperience',
                type: 'number',
                sortable: false,
                style: 'text-center',
                rowStyle: 'text-center',
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
            {
                label: 'LOCK',
                key: 'LOCK',
                icon: 'feather:lock',
                type: 'ACTION',
                id: 1,
            },
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
    companies: any[] = [];

    // Permissions
    addPermission = false;
    editPermission = false;
    deletePermission = false;

    ngOnInit(): void {
        this.getPermissions();
        this.initSearchForm();
        this.getAllCompaniesList();
    }

    getPermissions(): void {
        const allowedPermissions = this._permissionsService.getPermissions('Companies');
        this.addPermission = allowedPermissions.addPermission;
        this.editPermission = allowedPermissions.editPermission;
        if (!this.editPermission) this.tableConfig.actions = this.tableConfig.actions.filter(action => action.key !== 'EDIT' && action.key !== 'LOCK');
        this.deletePermission = allowedPermissions.deletePermission;
        if (!this.deletePermission) this.tableConfig.actions = this.tableConfig.actions.filter(action => action.key !== 'DELETE');
    }

    getAllCompaniesList(): void {
        this.tableConfig.loading = true;
        this._basicService
            .getAll(ENDPOINT.COMPANY, this.filterCriteria)
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe(
                (res) => {
                    this.paginationData = res.data.paginationData;
                    this.tableConfig.data = res.data.listData;
                    this.tableConfig.total = res.data.paginationData.totalCount;
                    this.tableConfig.totalPages =
                        res.data.paginationData.totalPages;
                    this.tableConfig.loading = false;
                    this.tableConfig = { ...this.tableConfig };
                },
                (err) => {
                    this.tableConfig.loading = false;
                }
            );
    }

    navigateToAddNewCompany(): void {
        this._router.navigate([`Companies/add-edit`]);
    }

    navigateToDeletedCompany(): void {
        this._router.navigate([`Companies/deleted`]);
    }

    onPaginationChange(event: any): void {
        this.filterCriteria.page = event.first / event.rows + 1;
        this.filterCriteria.pageSize = event.rows;
        this.tableConfig.rows = event.rows;
        this.getAllCompaniesList();
    }

    search(): void {
        // this.filterCriteria.readDto.code =
        //     this.searchForm.controls['code'].value;
        this.filterCriteria.readDto.companyName =
            this.searchForm.controls['companyName'].value;
        this.filterCriteria.readDto.taxNumber =
            this.searchForm.controls['taxNumber'].value;
        this.filterCriteria.page = 1;
        // this.filterCriteria.readDto.code = this.searchForm.controls['code']
        //     .value
        //     ? this.searchForm.controls['code'].value
        //     : null;
        this.getAllCompaniesList();
    }

    initSearchForm(): void {
        this.searchForm = this._formBuilder.group({
            // code: [null],
            companyName: [null],
            taxNumber: [null],
        });
    }

    askDeleteCompany(id: any): void {
        this.ref = this._dialogService.open(DynamicDialogComponent, {
            width: '30vw',
            height: 'auto',
            data: {
                title: 'dynamicDialog.ask_delete_company',
                description: 'dynamicDialog.delete_company_description',
                actionText: 'dynamicDialog.delete',
                cancelText: 'dynamicDialog.back',
                image: 'assets/images/ui/Inbox_cleanup.gif',
            },
        });

        if (this.ref) {
            this.ref.onClose.subscribe((data) => {
                if (data) {
                    if (data.action === 'action') {
                        this.onDeleteCompany(id);
                        // this.clearForm();
                    } else if (data.action === 'cancel') {
                        this.getAllCompaniesList();
                        // this._router.navigate([`Companies/view`]);
                    }
                }
            });
        } else {
            console.error('Dialog could not be opened.');
        }
    }

    deletedCompany(): void {
        this.ref = this._dialogService.open(DynamicDialogComponent, {
            width: '30vw',
            height: 'auto',
            data: {
                title: 'dynamicDialog.Congratulations',
                description: 'dynamicDialog.delete_company',
                cancelText: 'dynamicDialog.back',
                image: 'assets/images/ui/Inbox_cleanup.gif',
            },
        });

        if (this.ref) {
            this.ref.onClose.subscribe((data) => {
                if (data) {
                    this.getAllCompaniesList();
                    // this._router.navigate([`Companies/view`]);
                }
            });
        } else {
            console.error('Dialog could not be opened.');
        }
    }

    lock(item): void {
        this._basicService
            .lock(ENDPOINT.COMPANY, item.id)
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe((response: any) => {
                console.log(response.data.isActive);
                this.getAllCompaniesList();
            });
    }

    onActionClick(ev: { key: string; item: any }): void {
        switch (ev.key) {
            case 'LOCK':
                this.lock(ev.item);
                break;
            case 'EDIT':
                this._router.navigate([`/Companies/add-edit/${ev.item.id}`]);
                break;
            case 'VIEW':
                this._router.navigate([`/Companies/view-details/view/${ev.item.id}`]);
                break;
            case 'DELETE':
                this.askDeleteCompany(ev.item.id);
                // this.onDeleteUser(ev.item.id);
                break;
            default:
                break;
        }
    }

    onSort(event: string): void {
        this.filterCriteria.sortColumnDirection =
            this.filterCriteria.sortColumnDirection === 'asc' ? 'desc' : 'asc';
        this.filterCriteria.sortColumn = event;
        this.getAllCompaniesList();
    }

    onDeleteCompany(id: any): void {
        this._basicService
            .delete(ENDPOINT.COMPANY, id)
            .subscribe((res: any) => {
                this.deletedCompany();
            });
    }
}
