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
    selector: 'app-view-users',
    templateUrl: './view-users.component.html',
    styleUrl: './view-users.component.scss'
})
export class ViewUsersComponent implements OnInit {

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
            // code: null,
            // shiftCode: null,
            name: '',
        },
        selectColumns: [
            'id',
            'name',
            'phoneNumber',
            'address',
            // 'companyBranches',
            // 'roles',
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
                header: this._transloco.translate('users.view.table.user_name'),
                field: 'name',
                type: 'text',
                sortable: false,
                style: 'text-center',
                rowStyle: 'text-center w-full block text-lg',
            },
            {
                header: this._transloco.translate('users.view.table.phone'),
                field: 'phoneNumber',
                type: 'text',
                sortable: false,
                style: 'text-center',
                rowStyle: 'text-center',
            },
            {
                header: this._transloco.translate(
                    'users.view.table.address'
                ),

                field: 'address',
                type: 'text',
                sortable: false,
                style: 'text-center',
                rowStyle: 'text-center',
            },
            // {
            //     header: this._transloco.translate('users.view.table.company_name'),
            //     field: 'companyBranches',
            //     type: 'text-array',
            //     sortable: false,
            //     style: 'text-center',
            //     rowStyle: 'text-center',
            // },
            // {
            //     header: this._transloco.translate('users.view.table.roles'),
            //     field: 'roles',
            //     type: 'text-array',
            //     sortable: false,
            //     style: 'text-center',
            //     rowStyle: 'text-center',
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
            { label: 'LOCK', key: 'LOCK', icon: 'feather:lock', type: 'ACTION' },
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
    users: any[] = [];
    // Permissions
    addPermission = false;
    editPermission = false;
    deletePermission = false;

    ngOnInit(): void {
        this.getPermissions();
        this.initSearchForm();
        this.getAllUsersList();
    }

    getPermissions(): void {
        const allowedPermissions = this._permissionsService.getPermissions('Users');
        this.addPermission = allowedPermissions.addPermission;
        this.editPermission = allowedPermissions.editPermission;
        if (!this.editPermission) this.tableConfig.actions = this.tableConfig.actions.filter(action => action.key !== 'EDIT' && action.key !== 'LOCK');
        this.deletePermission = allowedPermissions.deletePermission;
        if (!this.deletePermission) this.tableConfig.actions = this.tableConfig.actions.filter(action => action.key !== 'DELETE');
    }

    getAllUsersList(): void {
        this.tableConfig.loading = true;
        this._basicService
            .getAll(ENDPOINT.USER, this.filterCriteria)
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

    navigateToAddNewUsers(): void {
        this._router.navigate([`Users/add-edit`]);
    }

    navigateToDeletedUsers(): void {
        this._router.navigate([`Users/deleted`]);
    }

    onPaginationChange(event: any): void {
        this.filterCriteria.page = event.first / event.rows + 1;
        this.filterCriteria.pageSize = event.rows;
        this.tableConfig.rows = event.rows;
        this.getAllUsersList();
    }

    search(): void {
        this.filterCriteria.readDto.name = this.searchForm.controls['name']
            .value
            ? this.searchForm.controls['name'].value
            : '';
        this.filterCriteria.page = 1;
        this.getAllUsersList();
    }

    initSearchForm(): void {
        this.searchForm = this._formBuilder.group({
            name: [''],
        });
    }

    askDeleteUsers(id: any): void {
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
                        this.onDeleteUsers(id);
                        // this.clearForm();
                    } else if (data.action === 'cancel') {
                        this.getAllUsersList();
                        // this._router.navigate([`Users/view`]);
                    }
                }
            });
        } else {
            console.error('Dialog could not be opened.');
        }
    }

    deletedUsers(): void {
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
                    this.getAllUsersList();
                    // this._router.navigate([`Users/view`]);
                }
            });
        } else {
            console.error('Dialog could not be opened.');
        }
    }

    lock(item): void {
        this._basicService
            .lock(ENDPOINT.USER, item.id)
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe((response: any) => {
                console.log(response.data.isActive);
                this.getAllUsersList();
            });
    }

    onActionClick(ev: { key: string; item: any }): void {
        switch (ev.key) {
            case 'LOCK':
                this.lock(ev.item);
                break;
            case 'EDIT':
                this._router.navigate([`/Users/add-edit/${ev.item.id}`]);
                break;
            case 'VIEW':
                this._router.navigate([`/Users/view-details/view/${ev.item.id}`]);
                break;
            case 'DELETE':
                this.askDeleteUsers(ev.item.id);
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
        this.getAllUsersList();
    }

    onDeleteUsers(id: any): void {
        this._basicService
            .delete(ENDPOINT.USER, id)
            .subscribe((res: any) => {
                this.deletedUsers();
            });
    }
}
