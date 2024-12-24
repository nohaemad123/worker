import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ENDPOINT } from 'app/core/enums/endPoints.enum';
import { BasicServicesService } from 'app/core/services/Basic-services/basic-services.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DynamicDialogComponent } from '@shared/components/dynamic-dialog/dynamic-dialog.component';
import { PermissionsService } from 'app/core/services/permissions/permissions.service';

@Component({
    selector: 'app-add-edit-branches',
    templateUrl: './add-edit-branches.component.html',
    styleUrl: './add-edit-branches.component.scss'
})
export class AddEditBranchesComponent implements OnInit {

    private _formBuilder = inject(FormBuilder);
    private _activatedRoute = inject(ActivatedRoute);
    private _destroyRef = inject(DestroyRef);
    private _basicService = inject(BasicServicesService);
    private _router = inject(Router);
    private _dialogService = inject(DialogService);
    private _permissionsService = inject(PermissionsService);

    branchForm!: FormGroup;
    branchId: any;
    branchDetails: any;
    isEdit: boolean = false;
    ENDPOINT;
    ref: DynamicDialogRef;

    // Permissions
    addPermission = false;
    editPermission = false;

    ngOnInit(): void {
        this.initBranchForm();
        this.checkBranchId();
    }

    getPermissions(): void {
        const allowedPermissions = this._permissionsService.getPermissions('Branches');
        this.addPermission = allowedPermissions.addPermission;
        if(!this.addPermission && !this.branchId) this._router.navigate(['/Branches/view']); 
        this.editPermission = allowedPermissions.editPermission;
        if(!this.editPermission && this.branchId) this._router.navigate(['/Branches/view']); 
    }

    initBranchForm(): void {
        this.branchForm = this._formBuilder.group({
            nameAr: ['', Validators.required],
            nameEn: [''],
            isActive: [this.branchDetails?.isActive ? this.branchDetails?.isActive : true, Validators.required],
        });
    }

    checkBranchId(): void {
        this._activatedRoute.params.subscribe((params) => {
            if (params['id']) {
                this.branchId = params['id'];
                this.isEdit = true;
                this.getBranchDetails();
            }
        });
        this.getPermissions();
    }

    clearForm(): void {
        this.branchForm.reset();
        this.branchForm.controls['isActive'].setValue(true);
    }

    showAddBranch(): void {
        this.ref = this._dialogService.open(DynamicDialogComponent, {
            width: '30vw',
            height: 'auto',
            data: {
                title: 'dynamicDialog.Congratulations',
                description: 'dynamicDialog.new_branch',
                actionText: 'dynamicDialog.Add_branch_btn',
                cancelText: 'dynamicDialog.show_branch_btn',
                image: 'assets/images/ui/Done.gif',
            },
        });

        if (this.ref) {
            this.ref.onClose.subscribe((data) => {
                if (data) {
                    if (data.action === 'action') {
                        this.clearForm();
                    } else if (data.action === 'cancel') {
                        this._router.navigate([`Branches/view`]);
                    }
                }
            });
        } else {
            console.error('Dialog could not be opened.');
        }
    }

    showEditBranch(): void {
        this.ref = this._dialogService.open(DynamicDialogComponent, {
            width: '30vw',
            height: 'auto',
            data: {
                title: 'dynamicDialog.Congratulations',
                description: 'dynamicDialog.edit_branch',
                actionText: 'dynamicDialog.show_branch_btn',
                // cancelText: 'dynamicDialog.show_branch_btn',
                image: 'assets/images/ui/Done.gif',
            },
        });

        if (this.ref) {
            this.ref.onClose.subscribe((data) => {
                if (data) {
                    if (data.action === 'action') {
                        this._router.navigate([`Branches/view`]);
                        // } else if (data.action === 'cancel') {
                        //     this._router.navigate([`Branches/view`]);
                    }
                }
            });
        } else {
            console.error('Dialog could not be opened.');
        }
    }

    cancelBranch(): void {
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
                        this._router.navigate([`Branches/view`]);
                    } else if (data.action === 'cancel') {
                    }
                }
            });
        } else {
            console.error('Dialog could not be opened.');
        }
    }

    getBranchDetails(): void {
        this._basicService
            .getById(ENDPOINT.BRANCHES, this.branchId)
            .subscribe((response: any) => {
                 this.branchDetails = response.data;
                this.branchForm.patchValue(
                    {
                        nameEn: response.data.names.find(
                            (x) => x.language === 'en'
                        )?.value,
                        nameAr: response.data.names.find(
                            (x) => x.language === 'ar'
                        )?.value,
                    }
                );
            });
    }

    addEditBranchSubmit(branchForm): void {

        let body = {
            ...this.branchForm.value
        };

        if (!body.names) {
            body.names = [];
        }

        // Check if the English name exists and add it to the array
        if (this.branchForm.value.nameEn) {
            body.names.push({
                id: null,
                language: 'en',
                value: branchForm.value.nameEn,
                localizationSetsId: null,
            });
        }

        // Check if the Arabic name exists and add it to the array
        if (this.branchForm.value.nameAr) {
            body.names.push({
                id: null,
                language: 'ar',
                value: branchForm.value.nameAr,
                localizationSetsId: null,
            });
        }
        
        if (!this.isEdit) {
            this.addBranch(body);
        } else {
            this.updateBranch(body);
        }
    }

    addBranch(body): void {
        console.log(this.branchForm)
        this._basicService
            .add(ENDPOINT.BRANCHES, body)
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe((response: any) => {
                //   this._toasterService.showMassage(
                //       'success',
                //       'Success',
                //       'تم حفظ الشركة بنجاح'
                //   );
                this.showAddBranch();
            });
    }

    updateBranch(body): void {
        this._basicService
            .update(ENDPOINT.BRANCHES, this.branchId, body)
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe((response: any) => {
                //   this._toasterService.showMassage(
                //       'success',
                //       'Success',
                //       'تم تعديل الشركة بنجاح'
                //   );
                //   this._router.navigate([`Branches/view`]);
                this.showEditBranch();
            });
    }

}
