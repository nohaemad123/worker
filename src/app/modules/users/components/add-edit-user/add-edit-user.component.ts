import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ENDPOINT } from 'app/core/enums/endPoints.enum';
import { BasicServicesService } from 'app/core/services/Basic-services/basic-services.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DynamicDialogComponent } from '@shared/components/dynamic-dialog/dynamic-dialog.component';
import { FuseValidators } from '@fuse/validators';
import { PermissionsService } from 'app/core/services/permissions/permissions.service';


@Component({
    selector: 'app-add-edit-user',
    templateUrl: './add-edit-user.component.html',
    styleUrl: './add-edit-user.component.scss'
})
export class AddEditUserComponent implements OnInit {

    private _formBuilder = inject(FormBuilder);
    private _activatedRoute = inject(ActivatedRoute);
    private _destroyRef = inject(DestroyRef);
    private _basicService = inject(BasicServicesService);
    private _router = inject(Router);
    private _dialogService = inject(DialogService);
    private _permissionsService = inject(PermissionsService);

    userForm!: FormGroup;
    userId: any;
    isEdit: boolean = false;
    ENDPOINT;
    ref: DynamicDialogRef;
    mode = '';
    numberOfItemsFromEnd = 5;
    companyFilterCriteria = {
        page: 1,
        pageSize: 1000,
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

    companyBranchesFilterCriteria = {
        page: 1,
        pageSize: 1000,
        search: null,
        searchType: 1,
        readDto: {
            branchName: null,
            isActive: true,
            companyId: null
        },
        selectColumns: [
            'id',
            'branchName',
            'companyName'
        ],
        sortColumn: '',
        sortColumnDirection: 'asc',
    };
    companyBranchesList: any[] = [];
    companyBranchesLoading = false;

    permissionsFilterCriteria = {
        page: 1,
        pageSize: 100,
        search: null,
        readDto: {
            name: null,
            id: null,
            isActive: true
        },
        selectColumns: [
            'id',
            'name',
        ],
        sortColumn: '',
        sortColumnDirection: 'asc',
    };
    permissionsList: any[] = [];
    permissionsLoading = false;

    userDetails: any;

    // Permissions
    addPermission = false;
    editPermission = false;

    ngOnInit(): void {
        this.initUserForm();
        this.getPermissions();
        this.checkUserId();
        // this.getAllCompaniesList();
        // this.getAllPermissionsList();
    }

    getPermissions(): void {
        const allowedPermissions = this._permissionsService.getPermissions('Users');
        this.addPermission = allowedPermissions.addPermission;
        if (!this.addPermission && !this.userId) this._router.navigate(['/Users/view']);
        this.editPermission = allowedPermissions.editPermission;
        if (!this.editPermission && this.userId) this._router.navigate(['/Users/view']);
    }

    initUserForm(): void {
        this.userForm = this._formBuilder.group({
            name: ['', Validators.required],
            email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
            phoneNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
            address: [''],
            companyId: [[], Validators.required],
            companyBranches: [[], Validators.required],
            roles: ['', Validators.required],
            password: ['', Validators.required],
            confirmPassword: ['', Validators.required]
        });

        // if (!this.userId) {
        //     this.userForm.setValidators(FuseValidators.mustMatch('password', 'confirmPassword'));
        // }
    }

    getAllCompaniesList(): void {
        this._basicService
            .getAll(ENDPOINT.COMPANY, this.companyFilterCriteria)
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe(
                (res) => {
                    this.companiesList = [...this.companiesList, ...res.data.listData];
                    if (this.userId) {
                        this.userForm.controls['companyId'].patchValue(this.userDetails?.companyId);
                    }
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

    onSelectCompany(companyId: any): void {
        this.companyBranchesList = [];
        this.companyBranchesFilterCriteria.page = 1;
        this.companyBranchesFilterCriteria.readDto.companyId = companyId;
        this.userForm.controls['companyBranches'].patchValue([]);
        this.getAllBranchesList();
    }

    getAllBranchesList(): void {
        this._basicService
            .getAll(ENDPOINT.COMPANY_BRANCHES, this.companyBranchesFilterCriteria)
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe(
                (res) => {
                    this.companyBranchesList = [...this.companyBranchesList, ...res.data.listData];
                    if (this.userId) {
                        this.userForm.controls['companyBranches'].patchValue(this.userDetails?.companyBranches);
                    }
                },
                (err) => {
                }
            );
    }

    onBranchesSearch(searchTerm: any): void {
        if (searchTerm?.term?.trim().length > 2) {
            this.companyBranchesList = [];
            this.companyBranchesFilterCriteria.page = 1;
            this.companyBranchesFilterCriteria.search = searchTerm?.term?.trim();
            this.getAllBranchesList();
        }
    }

    onClearBranches(ev: any): void {
        this.companyBranchesList = [];
        this.companyBranchesFilterCriteria.page = 1;
        this.companyBranchesFilterCriteria.search = '';
        this.getAllBranchesList();
    }

    onBranchesScroll({ end }): void {
        if (end + this.numberOfItemsFromEnd >= this.companyBranchesList?.length) {
            this.getAllBranchesList();
        }
    }

    onBranchesScrollToEnd(): void {
        this.companyBranchesFilterCriteria.page++;
        this.getAllBranchesList();
    }

    getAllPermissionsList(): void {
        this.permissionsLoading = true;
        this._basicService
            .getAll(ENDPOINT.ROLES, this.permissionsFilterCriteria)
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe(
                (res) => {
                    this.permissionsList = res.data.listData;
                    this.permissionsLoading = false;
                    if (this.userId) {
                        this.userForm.controls['roles'].patchValue(this.userDetails?.roles[0]);
                    }

                },
                (err) => {
                    this.permissionsLoading = false;
                }
            );
    }

    checkUserId(): void {
        this._activatedRoute.params.subscribe((params) => {
            if (params['mode']) {
                this.mode = params['mode'];
            }
            if (params['id']) {
                this.userId = params['id'];
                this.isEdit = true;
                this.userForm.controls['password'].clearValidators();
                this.userForm.controls['confirmPassword'].clearValidators();
                this.getUserDetails();
            } else {
                this.userForm.controls['password'].setValidators([Validators.required]);
                this.userForm.controls['confirmPassword'].setValidators([Validators.required]);
                this.userForm.setValidators(FuseValidators.mustMatch('password', 'confirmPassword'));
            }
            this.userForm.updateValueAndValidity();
        });
        this.getAllPermissionsList();
        this.getAllCompaniesList();

    }

    clearForm(): void {
        this.userForm.reset();
    }

    showAddUser() {
        this.ref = this._dialogService.open(DynamicDialogComponent, {
            width: '30vw',
            height: 'auto',
            data: {
                title: 'dynamicDialog.Congratulations',
                description: 'dynamicDialog.new_user',
                actionText: 'dynamicDialog.Add_user_btn',
                cancelText: 'dynamicDialog.show_user_btn',
                image: 'assets/images/ui/Done.gif',
            },
        });

        if (this.ref) {
            this.ref.onClose.subscribe((data) => {
                if (data) {
                    if (data.action === 'action') {
                        this.clearForm();
                    } else if (data.action === 'cancel') {
                        this._router.navigate([`Users/view`]);
                    }
                }
            });
        } else {
            console.error('Dialog could not be opened.');
        }
    }

    showEditUser(): void {
        this.ref = this._dialogService.open(DynamicDialogComponent, {
            width: '30vw',
            height: 'auto',
            data: {
                title: 'dynamicDialog.Congratulations',
                description: 'dynamicDialog.edit_user',
                actionText: 'dynamicDialog.show_user_btn',
                // cancelText: 'dynamicDialog.show_company_btn',
                image: 'assets/images/ui/Done.gif',
            },
        });

        if (this.ref) {
            this.ref.onClose.subscribe((data) => {
                if (data) {
                    if (data.action === 'action') {
                        this._router.navigate([`Users/view`]);
                        // } else if (data.action === 'cancel') {
                        //     this._router.navigate([`Companies/view`]);
                    }
                }
            });
        } else {
            console.error('Dialog could not be opened.');
        }
    }

    cancelUser(): void {
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
                        this._router.navigate([`Users/view`]);
                    } else if (data.action === 'cancel') {
                    }
                }
            });
        } else {
            console.error('Dialog could not be opened.');
        }
    }

    getUserDetails(): void {
        this._basicService
            .getById(ENDPOINT.USER, this.userId)
            .subscribe((response: any) => {
                this.userDetails = response.data;
                this.companyBranchesFilterCriteria.readDto.companyId = response?.data?.companyId;
                this.getAllPermissionsList();
                this.getAllCompaniesList();
                this.getAllBranchesList();
                this.userForm.patchValue(response.data);

            });
    }

    addEditUserSubmit(): void {
        if (!this.isEdit) {
            this.addUser();
        } else {
            this.updateUser();
        }
    }

    addUser(): void {
        this._basicService
            .add(ENDPOINT.USER,
                {
                    ...this.userForm.value,
                    roles: [this.userForm.value.roles],
                    LastLogIn: new Date().toISOString(),
                    isActive: true,
                    sendDataToMail: true
                })
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe((response: any) => {
                this.showAddUser();
            });
    }

    updateUser(): void {
        this._basicService
            .update(ENDPOINT.USER, this.userId, {
                ...this.userForm.value,
                roles: [this.userForm.value.roles],
                LastLogIn: this.userDetails.LastLogIn,
                isActive: this.userDetails.isActive,
                sendDataToMail: this.userDetails.sendDataToMail
            })
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe((response: any) => {
                this.showEditUser();
            });
    }

    compareFn(c1: any, c2: any): boolean {
        return c1 && c2 ? c1.id === c2.id : c1 === c2;
    }
}
