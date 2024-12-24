import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ENDPOINT } from 'app/core/enums/endPoints.enum';
import { BasicServicesService } from 'app/core/services/Basic-services/basic-services.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DynamicDialogComponent } from '@shared/components/dynamic-dialog/dynamic-dialog.component';
import { MapPopupComponent } from '../map-popup/map-popup.component';
import { PermissionsService } from 'app/core/services/permissions/permissions.service';

@Component({
    selector: 'app-add-edit-company-branches',
    templateUrl: './add-edit-company-branches.component.html',
    styleUrl: './add-edit-company-branches.component.scss',
})
export class AddEditCompanyBranchesComponent implements OnInit {
    private _formBuilder = inject(FormBuilder);
    private _activatedRoute = inject(ActivatedRoute);
    private _destroyRef = inject(DestroyRef);
    private _basicService = inject(BasicServicesService);
    private _router = inject(Router);
    private _dialogService = inject(DialogService);
    private _permissionsService = inject(PermissionsService);

    CompanyBranchesForm!: FormGroup;
    companyBranchDetails: any;
    companyBranchId: any;
    isEdit: boolean = false;
    ENDPOINT;
    ref: DynamicDialogRef;
    companiesList: any[] = [];
    branchesList: any[] = [];
    citiesList: any[] = [];

    // Permissions
    addPermission = false;
    editPermission = false;

    ngOnInit(): void {
        this.initCompanyBranchesForm();
        this.checkCompanyBranchesId();
        this.getAllCompanies();
        this.getAllBranches();
        this.getAllCities();
    }

    getAllCompanies() {
        this._basicService
            .getAll(ENDPOINT.COMPANY, {
                readDto: {
                    isActive: true
                }
            })
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe((res) => {
                this.companiesList = res.data.listData;
            });
    }

    getAllBranches() {
        this._basicService
            .getAll(ENDPOINT.BRANCHES,
                {
                    readDto: {
                        isActive: true
                    }
                }
            )
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe((res) => {
                this.branchesList = res.data.listData;
            });
    }

    getAllCities() {
        this._basicService
            .getAll(ENDPOINT.CITY,
                {
                    readDto: {
                        isActive: true
                    }
                }
            )
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe((res) => {
                this.citiesList = res.data.listData;
            });
    }

    initCompanyBranchesForm(): void {
        this.CompanyBranchesForm = this._formBuilder.group({
            // code: [null],
            street: ['', [Validators.required]],
            address: ['', Validators.required],
            email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
            phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
            companyId: ['', Validators.required],
            branchId: ['', Validators.required],
            cityId: ['', Validators.required],
            Longitude: ['', Validators.required],
            Latitude: ['', Validators.required],
            locationTitle: ['', Validators.required],
            isActive: [this.companyBranchDetails?.isActive ? this.companyBranchDetails?.isActive : true, Validators.required],
        });
    }

    checkCompanyBranchesId(): void {
        this._activatedRoute.params.subscribe((params) => {
            if (params['id']) {
                this.companyBranchId = params['id'];
                this.isEdit = true;
                this.getCompanyBranchesDetails();
            }
        });
        this.getPermissions();
    }

    getPermissions(): void {
        const allowedPermissions = this._permissionsService.getPermissions('CompanyBranches');
        this.addPermission = allowedPermissions.addPermission;
        if(!this.addPermission && !this.companyBranchId) this._router.navigate(['/Company-Branches/view']); 
        this.editPermission = allowedPermissions.editPermission;
        if(!this.editPermission && this.companyBranchId) this._router.navigate(['/Company-Branches/view']); 
    }

    clearForm(): void {
        this.CompanyBranchesForm.reset();
        this.CompanyBranchesForm.controls['isActive'].setValue(true);
    }

    detectLocation(): void {
        const modal = this._dialogService.open(MapPopupComponent, {
            width: '40vw',
            height: 'auto',
            data: {
                lat: this.CompanyBranchesForm?.value?.Latitude ? this.CompanyBranchesForm?.value?.Latitude : 26.820553,
                lng: this.CompanyBranchesForm?.value?.Longitude ? this.CompanyBranchesForm?.value?.Longitude : 30.802498
            }
        })

        modal.onClose.subscribe((res) => {
            if (res?.action === 'confirm') {
                this.CompanyBranchesForm.patchValue({
                    Latitude: res?.data?.lat,
                    Longitude: res?.data?.lng,
                    locationTitle: res?.data?.address
                })
            }
        })
    }

    showAddCompanyBranches(): void {
        this.ref = this._dialogService.open(DynamicDialogComponent, {
            width: '30vw',
            height: 'auto',
            data: {
                title: 'dynamicDialog.Congratulations',
                description: 'dynamicDialog.new_company_branch',
                actionText: 'dynamicDialog.Add_company_branch_btn',
                cancelText: 'dynamicDialog.showcompany_branch_btn',
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
                        this._router.navigate([`Company-Branches/view`]);
                    }
                }
            });
        } else {
            console.error('Dialog could not be opened.');
        }
    }

    showEditCompanyBranches(): void {
        this.ref = this._dialogService.open(DynamicDialogComponent, {
            width: '30vw',
            height: 'auto',
            data: {
                title: 'dynamicDialog.Congratulations',
                description: 'dynamicDialog.edit_company_branch',
                actionText: 'dynamicDialog.showcompany_branch_btn',
                // cancelText: 'dynamicDialog.show_company_btn',
                image: 'assets/images/ui/Done.gif',
            },
        });

        if (this.ref) {
            this.ref.onClose.subscribe((data) => {
                if (data) {
                    if (data.action === 'action') {
                        this._router.navigate([`Company-Branches/view`]);
                        // } else if (data.action === 'cancel') {
                        //     this._router.navigate([`Company-Branches/view`]);
                    }
                }
            });
        } else {
            console.error('Dialog could not be opened.');
        }
    }

    cancelCompanyBranches(): void {
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
                        this._router.navigate([`Company-Branches/view`]);
                    } else if (data.action === 'cancel') {
                    }
                }
            });
        } else {
            console.error('Dialog could not be opened.');
        }
    }

    getCompanyBranchesDetails(): void {
        this._basicService
            .getById(ENDPOINT.COMPANY_BRANCHES, this.companyBranchId)
            .subscribe((response: any) => {
                this.companyBranchDetails = response.data;
                this.CompanyBranchesForm.patchValue(
                    {
                        ...response.data,
                        Latitude: this.companyBranchDetails.latitude,
                        Longitude: this.companyBranchDetails.longitude,
                        locationTitle: this.companyBranchDetails.locationTitle,
                    }
                );
            });
    }

    addEditCompanyBranchesSubmit(): void {
        if (!this.isEdit) {
            this.addCompanyBranches();
        } else {
            this.updateCompanyBranches();
        }
    }

    addCompanyBranches(): void {
        this._basicService
            .add(ENDPOINT.COMPANY_BRANCHES, this.CompanyBranchesForm.value)
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe((response: any) => {
                //   this._toasterService.showMassage(
                //       'success',
                //       'Success',
                //       'تم حفظ الشركة بنجاح'
                //   );
                this.showAddCompanyBranches();
            });
    }

    updateCompanyBranches(): void {
        this._basicService
            .update(
                ENDPOINT.COMPANY_BRANCHES,
                this.companyBranchId,
                this.CompanyBranchesForm.value
            )
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe((response: any) => {
                //   this._toasterService.showMassage(
                //       'success',
                //       'Success',
                //       'تم تعديل الشركة بنجاح'
                //   );
                //   this._router.navigate([`Companies/view`]);
                this.showEditCompanyBranches();
            });
    }
}
