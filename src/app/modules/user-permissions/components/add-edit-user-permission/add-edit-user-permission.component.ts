import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ENDPOINT } from 'app/core/enums/endPoints.enum';
import { BasicServicesService } from 'app/core/services/Basic-services/basic-services.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DynamicDialogComponent } from '@shared/components/dynamic-dialog/dynamic-dialog.component';
import { PermissionsService } from 'app/core/services/permissions/permissions.service';

@Component({
    selector: 'app-add-edit-user-permission',
    templateUrl: './add-edit-user-permission.component.html',
    styleUrl: './add-edit-user-permission.component.scss'
})
export class AddEditUserPermissionComponent implements OnInit {

    private _formBuilder = inject(FormBuilder);
    private _activatedRoute = inject(ActivatedRoute);
    private _destroyRef = inject(DestroyRef);
    private _basicService = inject(BasicServicesService);
    private _router = inject(Router);
    private _dialogService = inject(DialogService);
    private _permissionsService = inject(PermissionsService);

    filterCriteria = {
        page: 1,
        pageSize: 10,
        search: null,
        readDto: {
            name: null,
            id: null,
        },
        selectColumns: [
            'id',
            'name',
        ],
        sortColumn: '',
        sortColumnDirection: 'asc',
    };
    permissionForm!: FormGroup;
    permissionId: any;
    isEdit: boolean = false;
    ENDPOINT;
    ref: DynamicDialogRef;
    userPermissionsList = [];

    // Permissions
    addPermissionUserAction = false;
    editPermission = false;

    ngOnInit(): void {
        this.getAllUsersPermissionList();
        this.initPermissionForm();
        this.checkPermissionId();
    }

    getPermissions(): void {
        const allowedPermissions = this._permissionsService.getPermissions('UserPermissions');
        this.addPermissionUserAction = allowedPermissions.addPermission;
        if(!this.addPermissionUserAction && !this.permissionId) this._router.navigate(['/User-permissions/view']); 
        this.editPermission = allowedPermissions.editPermission;
        if(!this.editPermission && this.permissionId) this._router.navigate(['/User-permissions/view']); 
    }

    getAllUsersPermissionList(): void {
        this._basicService
            .getAll(ENDPOINT.ROLES, this.filterCriteria)
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe(
                (res) => {
                    this.userPermissionsList = res.data.listData;
                },
                (err) => {
                }
            );
    }

    initPermissionForm(): void {
        this.permissionForm = this._formBuilder.group({
            // user_permission: ["", Validators.required],
            permissions: this._formBuilder.array([]),
        });
    }

    get permissions(): FormArray {
        return this.permissionForm.get('permissions') as FormArray;
    }

    newPermission(permission: any): FormGroup {
        return this._formBuilder.group({
            id: [permission?.id],
            pageName: [permission?.pageName],
            roleId: [permission?.roleId],
            permissionActions: this._formBuilder.array([]),
        });
    }

    addPermissionItem(permission: any): void {
        this.permissions.push(this.newPermission(permission));
    }

    getPermissionActions(i: number): FormArray {
        return this.permissions.controls[i].get('permissionActions') as FormArray;
    }

    newPermissionAction(action: any): FormGroup {
        return this._formBuilder.group({
            permissionAction: [action.permissionAction],
            havePermission: [action.havePermission],
            permissionId: [action.permissionId]
        });
    }

    addPermissionAction(i: number, action: any): void {
        const permissionGroup = this.permissions.controls[i] as FormGroup;
        const permissionActionsArray = permissionGroup?.get('permissionActions') as FormArray;
        permissionActionsArray?.push(this.newPermissionAction(action));
    }


    checkPermissionId(): void {
        this._activatedRoute.params.subscribe((params) => {
            if (params['id']) {
                this.permissionId = params['id'];
                this.isEdit = true;
                this.getPermissionDetails();
            }
        });
        this.getPermissions();
    }

    clearForm(): void {
        this.permissionForm.reset();
    }

    showAddPermission() {
        this.ref = this._dialogService.open(DynamicDialogComponent, {
            width: '30vw',
            height: 'auto',
            data: {
                title: 'dynamicDialog.Congratulations',
                description: 'dynamicDialog.new_permission',
                actionText: 'dynamicDialog.Add_permission_btn',
                cancelText: 'dynamicDialog.show_permission_btn',
                image: 'assets/images/ui/Done.gif',
            },
        });

        if (this.ref) {
            this.ref.onClose.subscribe((data) => {
                if (data) {
                    if (data.action === 'action') {
                        console.log('action');
                        this.clearForm();
                    } else if (data.action === 'cancel') {
                        this._router.navigate([`userPermission/view`]);
                    }
                }
            });
        } else {
            console.error('Dialog could not be opened.');
        }
    }

    showEditPermission(): void {
        this.ref = this._dialogService.open(DynamicDialogComponent, {
            width: '30vw',
            height: 'auto',
            data: {
                title: 'dynamicDialog.Congratulations',
                description: 'dynamicDialog.edit_permission',
                actionText: 'dynamicDialog.show_permission_btn',
                // cancelText: 'dynamicDialog.show_company_btn',
                image: 'assets/images/ui/Done.gif',
            },
        });

        if (this.ref) {
            this.ref.onClose.subscribe((data) => {
                if (data) {
                    if (data.action === 'action') {
                        this._router.navigate([`User-permissions/view`]);
                        // } else if (data.action === 'cancel') {
                        //     this._router.navigate([`Companies/view`]);
                    }
                }
            });
        } else {
            console.error('Dialog could not be opened.');
        }
    }

    cancelPermission(): void {
        this.ref = this._dialogService.open(DynamicDialogComponent, {
            width: '30vw',
            height: 'auto',
            data: {
                title: 'dynamicDialog.ask_cancel',
                description: 'dynamicDialog.cancel_desc',
                actionText: 'dynamicDialog.cancel',
                cancelText: 'dynamicDialog.back',
                image: 'assets/images/ui/No_data.gif',
            },
        });

        if (this.ref) {
            this.ref.onClose.subscribe((data) => {
                if (data) {
                    if (data.action === 'action') {
                        this.clearForm();
                        this._router.navigate([`User-permissions/view`]);
                    } else if (data.action === 'cancel') {
                    }
                }
            });
        } else {
            console.error('Dialog could not be opened.');
        }
    }

    getPermissionDetails(): void {
        this._basicService
            .getWithParams(ENDPOINT.USER_PERMISSION + '/GetRolePermissions', {
                roleId: this.permissionId
            })
            .subscribe((response: any) => {
                this.handleFormPatch(response?.data);
            });
    }

    handleFormPatch(data): void {
        data?.forEach((permission: any, index: number) => {
            this.addPermissionItem(permission);
            // this.permissions?.controls[index]?.patchValue(permission);
            permission?.permissionActions?.forEach(action => {
                this.addPermissionAction(index, action);
                // this.getPermissionActions(index)?.push(this._formBuilder.group(action));
            })
        });
        console.log(this.permissionForm);
        this.permissionForm.patchValue(data);
        console.log(this.permissionForm.value);
    }

    addEditUserPermissionsSubmit(): void {
        if (!this.isEdit) {
            this.addPermission();
        } else {
            this.updatePermission();
        }
    }

    addPermission(): void {
        this._basicService
            .add(ENDPOINT.USER_PERMISSION, this.permissionForm.value)
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe((response: any) => {
                this.showAddPermission();
            });
    }

    updatePermission(): void {
        this._basicService
            .updateWithoutId(ENDPOINT.USER_PERMISSION + '/UpdateRolePermission', this.permissionForm.value.permissions)
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe((response: any) => {
                this.showEditPermission();
            });
    }
}
