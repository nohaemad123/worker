import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { PaginationData } from '@shared/models';
import { ENDPOINT } from 'app/core/enums/endPoints.enum';
import { BasicServicesService } from 'app/core/services/Basic-services/basic-services.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DynamicDialogComponent } from '@shared/components/dynamic-dialog/dynamic-dialog.component';
import { PermissionsService } from 'app/core/services/permissions/permissions.service';

@Component({
    selector: 'app-view-company-branches',
    templateUrl: './view-company-branches.component.html',
    styleUrl: './view-company-branches.component.scss',
})
export class ViewCompanyBranchesComponent implements OnInit {
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
            branchName: null,
        },
        selectColumns: [
            'id',
            'branchName',
            'companyName',
            'cityName',
            'street',
            'address',
            'isActive'
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
                header: this._transloco.translate('companyBranches.view.table.companyName'),
                field: 'companyName',
                type: 'text',
                sortable: false,
                style: 'text-center',
                rowStyle: 'text-center font-regular text-black text-md',
            },
            {
                header: this._transloco.translate(
                    'companyBranches.view.table.name'
                ),
                field: 'branchName',
                type: 'text',
                sortable: false,
                style: 'text-center',
                rowStyle: 'text-center text-black text-md',
            },
            {
                header: this._transloco.translate(
                    'companyBranches.view.table.city'
                ),
                field: 'cityName',
                type: 'text',
                sortable: false,
                style: 'text-center',
                rowStyle: 'text-center',
            },
            {
                header: this._transloco.translate(
                    'companyBranches.view.table.district'
                ),
                field: 'street',
                type: 'text',
                sortable: false,
                style: 'text-center',
                rowStyle: 'text-center',
            },
            {
                header: this._transloco.translate(
                    'companyBranches.view.table.address'
                ),
                field: 'address',
                type: 'text',
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

    // Permissions
    addPermission = false;
    editPermission = false;
    deletePermission = false;

    ngOnInit(): void {
        this.getPermissions();
        this.initSearchForm();
        this.getAllCompanyBranchesList();
    }

    getPermissions(): void {
        const allowedPermissions = this._permissionsService.getPermissions('CompanyBranches');
        this.addPermission = allowedPermissions.addPermission;
        this.editPermission = allowedPermissions.editPermission;
        if (!this.editPermission) this.tableConfig.actions = this.tableConfig.actions.filter(action => action.key !== 'EDIT' && action.key !== 'LOCK');
        this.deletePermission = allowedPermissions.deletePermission;
        if (!this.deletePermission) this.tableConfig.actions = this.tableConfig.actions.filter(action => action.key !== 'DELETE');
    }

    getAllCompanyBranchesList(): void {
        this.tableConfig.loading = true;
        this._basicService
            .getAll(ENDPOINT.COMPANY_BRANCHES, this.filterCriteria)
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

    navigateToAddNewCompanyBranches(): void {
        this._router.navigate([`Company-Branches/add-edit`]);
    }

    navigateToDeletedCompanyBranches(): void {
        this._router.navigate([`Company-Branches/deleted`]);
    }

    onPaginationChange(event: any): void {
        this.filterCriteria.page = event.first / event.rows + 1;
        this.filterCriteria.pageSize = event.rows;
        this.tableConfig.rows = event.rows;
        this.getAllCompanyBranchesList();
    }

    search(): void {
        // this.filterCriteria.readDto.code =
        //     this.searchForm.controls['code'].value;
        this.filterCriteria.readDto.branchName =
            this.searchForm.controls['branchName'].value;
        this.filterCriteria.page = 1;
        this.getAllCompanyBranchesList();
    }

    initSearchForm(): void {
        this.searchForm = this._formBuilder.group({ branchName: [null] });
    }

    askDeleteCompanyBranches(id: any): void {
        this.ref = this._dialogService.open(DynamicDialogComponent, {
            width: '30vw',
            height: 'auto',
            data: {
                title: 'dynamicDialog.ask_delete_company_branch',
                description: 'dynamicDialog.delete_company_branch_description',
                actionText: 'dynamicDialog.delete',
                cancelText: 'dynamicDialog.back',
                image: 'assets/images/ui/Inbox_cleanup.gif',
            },
        });

        if (this.ref) {
            this.ref.onClose.subscribe((data) => {
                if (data) {
                    if (data.action === 'action') {
                        this.onDeleteCompanyBranches(id);
                        // this.clearForm();
                    } else if (data.action === 'cancel') {
                        this.getAllCompanyBranchesList();
                        // this._router.navigate([`Company-Branches/view`]);
                    }
                }
            });
        } else {
            console.error('Dialog could not be opened.');
        }
    }

    deletedCompanyBranches(): void {
        this.ref = this._dialogService.open(DynamicDialogComponent, {
            width: '30vw',
            height: 'auto',
            data: {
                title: 'dynamicDialog.Congratulations',
                description: 'dynamicDialog.delete_company_branch',
                cancelText: 'dynamicDialog.back',
                image: 'assets/images/ui/Inbox_cleanup.gif',
            },
        });

        if (this.ref) {
            this.ref.onClose.subscribe((data) => {
                if (data) {
                    this.getAllCompanyBranchesList();
                    // this._router.navigate([`Company-Branches/view`]);
                }
            });
        } else {
            console.error('Dialog could not be opened.');
        }
    }

    lock(item): void {
        this._basicService
            .lock(ENDPOINT.COMPANY_BRANCHES, item.id)
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe((response: any) => {
                console.log(response.data.isActive);
                this.getAllCompanyBranchesList();
            });
    }

    onActionClick(ev: { key: string; item: any }): void {
        switch (ev.key) {
            case 'LOCK':
                this.lock(ev.item);
                break;
            case 'EDIT':
                this._router.navigate([
                    `/Company-Branches/add-edit/${ev.item.id}`,
                ]);
                break;
            case 'DELETE':
                this.askDeleteCompanyBranches(ev.item.id);
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
        this.getAllCompanyBranchesList();
    }

    onDeleteCompanyBranches(id: any): void {
        this._basicService
            .delete(ENDPOINT.COMPANY_BRANCHES, id)
            .subscribe((res: any) => {
                this.deletedCompanyBranches();
            });
    }
}
