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
    selector: 'app-add-edit-services',
    templateUrl: './add-edit-services.component.html',
    styleUrl: './add-edit-services.component.scss'
})
export class AddEditServicesComponent implements OnInit {

    private _formBuilder = inject(FormBuilder);
    private _activatedRoute = inject(ActivatedRoute);
    private _destroyRef = inject(DestroyRef);
    private _basicService = inject(BasicServicesService);
    private _router = inject(Router);
    private _dialogService = inject(DialogService);
    private _permissionsService = inject(PermissionsService);

    filterCriteria = {
        readDto: {
            isActive: true,
        },
    };

    ServicesForm!: FormGroup;
    serviceId: any;
    serviceDetails: any;
    isEdit: boolean = false;
    ENDPOINT;
    ref: DynamicDialogRef;
    serviceType: any[] = [];
    shiftList: any[] = [];

    // Permissions
    addPermission = false;
    editPermission = false;

    ngOnInit(): void {
        this.initServicesForm();
        this.checkServicesId();
        this.getAllShiftsList();
        this.getAllServiceType();
    }

    getPermissions(): void {
        const allowedPermissions = this._permissionsService.getPermissions('ServicesTypes');
        this.addPermission = allowedPermissions.addPermission;
        if(!this.addPermission && !this.serviceId) this._router.navigate(['/Services/view']); 
        this.editPermission = allowedPermissions.editPermission;
        if(!this.editPermission && this.serviceId) this._router.navigate(['/Services/view']); 
    }

    initServicesForm(): void {
        this.ServicesForm = this._formBuilder.group({
            nameAr: ['', Validators.required],
            nameEn: [''],
            shiftId: ['', Validators.required],
            systemOfServiceId: ['', Validators.required],
            womenIsRequired: [false, Validators.required],
            isActive: [this.serviceDetails?.isActive ? this.serviceDetails?.isActive : true, Validators.required],
        });
    }

    checkServicesId(): void {
        this._activatedRoute.params.subscribe((params) => {
            if (params['id']) {
                this.serviceId = params['id'];
                this.isEdit = true;
                this.getServiceDetails();
            }
        });
        this.getPermissions();
    }

    getAllShiftsList(): void {
        this._basicService
            .getAll(ENDPOINT.SHIFTS, this.filterCriteria)
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe(
                (res) => {
                    this.shiftList = res.data.listData;
                }
            );
    }

    getAllServiceType(): void {
        this._basicService
            .getAll(ENDPOINT.SERVICES_SYSTEMS, this.filterCriteria)
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe(
                (res) => {
                    this.serviceType = res.data.listData;
                }
            );
    }

    clearForm(): void {
        this.ServicesForm.reset();
        this.ServicesForm.controls['isActive'].setValue(true);
    }

    showAddService(): void {
        this.ref = this._dialogService.open(DynamicDialogComponent, {
            width: '30vw',
            height: 'auto',
            data: {
                title: 'dynamicDialog.Congratulations',
                description: 'dynamicDialog.new_service_type',
                actionText: 'dynamicDialog.Add_service_type_btn',
                cancelText: 'dynamicDialog.show_service_type_btn',
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
                        this._router.navigate([`Services/view`]);
                    }
                }
            });
        } else {
            console.error('Dialog could not be opened.');
        }
    }

    showEditService(): void {
        this.ref = this._dialogService.open(DynamicDialogComponent, {
            width: '30vw',
            height: 'auto',
            data: {
                title: 'dynamicDialog.Congratulations',
                description: 'dynamicDialog.edit_service_type',
                actionText: 'dynamicDialog.show_service_type_btn',
                // cancelText: 'dynamicDialog.show_company_btn',
                image: 'assets/images/ui/Done.gif',
            },
        });

        if (this.ref) {
            this.ref.onClose.subscribe((data) => {
                if (data) {
                    if (data.action === 'action') {
                        this._router.navigate([`Services/view`]);
                        // } else if (data.action === 'cancel') {
                        //     this._router.navigate([`Services/view`]);
                    }
                }
            });
        } else {
            console.error('Dialog could not be opened.');
        }
    }

    cancelService(): void {
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
                        this._router.navigate([`Services/view`]);
                    } else if (data.action === 'cancel') {
                    }
                }
            });
        } else {
            console.error('Dialog could not be opened.');
        }
    }

    getServiceDetails(): void {
        this._basicService
            .getById(ENDPOINT.SERVICES, this.serviceId)
            .subscribe((res: any) => {
                this.serviceDetails = res.data;
                this.ServicesForm.patchValue(
                    {
                        ...res.data,
                        nameEn: res.data.names.find((x) => x.language === 'en')
                            ?.value,
                        nameAr: res.data.names.find((x) => x.language === 'ar')
                            ?.value,
                    }
                );
            });
    }

    addEditServiceSubmit(): void {

        let body = {
            ...this.ServicesForm.value
        };
        if (!body.names) {
            body.names = [];
        }
        // Check if the English name exists and add it to the array
        if (this.ServicesForm.value.nameEn) {
            body.names.push({
                id: null,
                language: 'en',
                value: this.ServicesForm.value.nameEn,
                localizationSetsId: null,
            });
        }
        // Check if the Arabic name exists and add it to the array
        if (this.ServicesForm.value.nameAr) {
            body.names.push({
                id: null,
                language: 'ar',
                value: this.ServicesForm.value.nameAr,
                localizationSetsId: null,
            });
        }

        if (!this.isEdit) {
            this.addService(body);
        } else {
            this.updateService(body);
        }
    }

    addService(body): void {
        this._basicService
            .add(ENDPOINT.SERVICES, body)
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe((response: any) => {
                //   this._toasterService.showMassage(
                //       'success',
                //       'Success',
                //       'تم حفظ الشركة بنجاح'
                //   );
                this.showAddService();
            });
    }

    updateService(body): void {
        this._basicService
            .update(ENDPOINT.SERVICES, this.serviceId, body)
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe((response: any) => {
                //   this._toasterService.showMassage(
                //       'success',
                //       'Success',
                //       'تم تعديل الشركة بنجاح'
                //   );
                //   this._router.navigate([`Companies/view`]);
                this.showEditService();
            });
    }
}
