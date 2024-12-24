import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ENDPOINT } from 'app/core/enums/endPoints.enum';
import { BasicServicesService } from 'app/core/services/Basic-services/basic-services.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DynamicDialogComponent } from '@shared/components/dynamic-dialog/dynamic-dialog.component';
import { PermissionsService } from 'app/core/services/permissions/permissions.service';

@Component({
    selector: 'app-add-edit-nationalities',
    templateUrl: './add-edit-nationalities.component.html',
    styleUrl: './add-edit-nationalities.component.scss'
})
export class AddEditNationalitiesComponent implements OnInit {

    private _formBuilder = inject(FormBuilder);
    private _activatedRoute = inject(ActivatedRoute);
    private _destroyRef = inject(DestroyRef);
    private _basicService = inject(BasicServicesService);
    private _router = inject(Router);
    private _dialogService = inject(DialogService);
    private _permissionsService = inject(PermissionsService);

    nationalityForm!: FormGroup;
    nationalityId: any;
    nationalityDetails: any;
    isEdit: boolean = false;
    ENDPOINT;
    ref: DynamicDialogRef;

    // Permissions
    addPermission = false;
    editPermission = false;


    ngOnInit(): void {
        this.initNationalityForm();
        this.checkNationalityId();
    }

    getPermissions(): void {
        const allowedPermissions = this._permissionsService.getPermissions('Nationalities');
        this.addPermission = allowedPermissions.addPermission;
        if(!this.addPermission && !this.nationalityId) this._router.navigate(['/Nationalities/view']); 
        this.editPermission = allowedPermissions.editPermission;
        if(!this.editPermission && this.nationalityId) this._router.navigate(['/Nationalities/view']); 
    }


    initNationalityForm(): void {
        this.nationalityForm = this._formBuilder.group({
            //   code: [null],
            nameAr: ['', Validators.required],
            nameEn: [''],
            isActive: [this.nationalityDetails?.isActive ? this.nationalityDetails?.isActive : true, Validators.required],
        });
    }

    checkNationalityId(): void {
        this._activatedRoute.params.subscribe((params) => {
            if (params['id']) {
                this.nationalityId = params['id'];
                this.isEdit = true;
                this.getNationalityDetails();
            } 
        });
        this.getPermissions();
    }


    clearForm(): void {
        this.nationalityForm.reset();
        this.nationalityForm.controls['isActive'].setValue(true);
    }

    showAddNationality(): void {
        this.ref = this._dialogService.open(DynamicDialogComponent, {
            width: '30vw',
            height: 'auto',
            data: {
                title: 'dynamicDialog.Congratulations',
                description: 'dynamicDialog.new_nationality',
                actionText: 'dynamicDialog.Add_nationality_btn',
                cancelText: 'dynamicDialog.show_nationality_btn',
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
                        this._router.navigate([`Nationalities/view`]);
                    }
                }
            });
        } else {
            console.error('Dialog could not be opened.');
        }
    }

    showEditNationality(): void {
        this.ref = this._dialogService.open(DynamicDialogComponent, {
            width: '30vw',
            height: 'auto',
            data: {
                title: 'dynamicDialog.Congratulations',
                description: 'dynamicDialog.edit_nationality',
                actionText: 'dynamicDialog.show_nationality_btn',
                // cancelText: 'dynamicDialog.show_company_btn',
                image: 'assets/images/ui/Done.gif',
            },
        });

        if (this.ref) {
            this.ref.onClose.subscribe((data) => {
                if (data) {
                    if (data.action === 'action') {
                        this._router.navigate([`Nationalities/view`]);
                        // } else if (data.action === 'cancel') {
                        //     this._router.navigate([`Nationalities/view`]);
                    }
                }
            });
        } else {
            console.error('Dialog could not be opened.');
        }
    }

    cancelNationality(): void {
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
                        this._router.navigate([`Nationalities/view`]);
                    } else if (data.action === 'cancel') {
                    }
                }
            });
        } else {
            console.error('Dialog could not be opened.');
        }
    }

    getNationalityDetails(): void {
        this._basicService
            .getById(ENDPOINT.NATIONALITY, this.nationalityId)
            .subscribe((response: any) => {
                this.nationalityDetails = response.data;
                this.nationalityForm.patchValue(
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

    addEditNationalitySubmit(nationalityForm): void {
        let body = {
            ...this.nationalityForm.value
        };

        if (!body.names) {
            body.names = [];
        }

        // Check if the English name exists and add it to the array
        if (this.nationalityForm.value.nameEn) {
            body.names.push({
                id: null,
                language: 'en',
                value: nationalityForm.value.nameEn,
                localizationSetsId: null,
            });
        }

        // Check if the Arabic name exists and add it to the array
        if (this.nationalityForm.value.nameAr) {
            body.names.push({
                id: null,
                language: 'ar',
                value: nationalityForm.value.nameAr,
                localizationSetsId: null,
            });
        }

        if (!this.isEdit) {
            this.addNationality(body);
        } else {
            this.updateNationality(body);
        }
    }

    addNationality(body): void {
        this._basicService
            .add(ENDPOINT.NATIONALITY, body)
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe((response: any) => {
                //   this._toasterService.showMassage(
                //       'success',
                //       'Success',
                //       'تم حفظ الشركة بنجاح'
                //   );
                this.showAddNationality();
            });
    }

    updateNationality(body): void {
        this._basicService
            .update(ENDPOINT.NATIONALITY, this.nationalityId, body)
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe((response: any) => {
                //   this._toasterService.showMassage(
                //       'success',
                //       'Success',
                //       'تم تعديل الشركة بنجاح'
                //   );
                //   this._router.navigate([`Companies/view`]);
                this.showEditNationality();
            });
    }

}
