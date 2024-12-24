import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ENDPOINT } from 'app/core/enums/endPoints.enum';
import { BasicServicesService } from 'app/core/services/Basic-services/basic-services.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DynamicDialogComponent } from '@shared/components/dynamic-dialog/dynamic-dialog.component';

@Component({
    selector: 'app-add-edit-provided-services',
    templateUrl: './add-edit-provided-services.component.html',
    styleUrl: './add-edit-provided-services.component.scss'
})
export class AddEditProvidedServicesComponent implements OnInit {

    private _formBuilder = inject(FormBuilder);
    private _activatedRoute = inject(ActivatedRoute);
    private _destroyRef = inject(DestroyRef);
    private _basicService = inject(BasicServicesService);
    private _router = inject(Router);
    private _dialogService = inject(DialogService);

    ServicesForm!: FormGroup;
    serviceId: any;
    serviceDetails: any;
    isEdit: boolean = false;
    ENDPOINT;
    ref: DynamicDialogRef;
    list: any[] = [
        { id: 1, name: "شركه رقم 1" },
        { id: 2, name: "شركه رقم 2" },
        { id: 3, name: "شركه رقم 3" },
        { id: 4, name: "شركه رقم 4" },
    ]
    radioBtn: any[] = [
        { name: 'نعم', key: 'A' },
        { name: 'لا', key: 'M' },
    ];

    ngOnInit(): void {
        this.initServicesForm();
        this.checkServicesId();
    }

    initServicesForm(): void {
        this.ServicesForm = this._formBuilder.group({
            // code: [null],
            min: ['', Validators.required],
            max: ['', Validators.required],
            workersNumber: ['', Validators.required],
            servicePrice: ['', Validators.required],
            service: [''],
            shift: [''],
            nationality: [''],
            isActive: [this.serviceDetails?.isActive ? this.serviceDetails?.isActive : true, Validators.required],
        });
    }

    checkServicesId(): void {
        this._activatedRoute.params.subscribe((params) => {
            if (params['id']) {
                this.serviceId = params['id'];
                this.isEdit = true;
                this.getServiceDetails();
            } else {
                // this.getCode();
            }
        });
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
                description: 'dynamicDialog.new_service',
                actionText: 'dynamicDialog.Add_service_btn',
                cancelText: 'dynamicDialog.show_service_btn',
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
                        this._router.navigate([`Companies/view`]);
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
                description: 'dynamicDialog.edit_service',
                actionText: 'dynamicDialog.show_service_btn',
                // cancelText: 'dynamicDialog.show_company_btn',
                image: 'assets/images/ui/Done.gif',
            },
        });

        if (this.ref) {
            this.ref.onClose.subscribe((data) => {
                if (data) {
                    if (data.action === 'action') {
                        this._router.navigate([`Provided-Services/view`]);
                        // } else if (data.action === 'cancel') {
                        //     this._router.navigate([`Companies/view`]);
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
                        this._router.navigate([`Provided-Services/view`]);
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
            .getById(ENDPOINT.PROVIDED_SERVICES, this.serviceId)
            .subscribe((response: any) => {
                this.serviceDetails = response.data;
                this.ServicesForm.patchValue(response.data);
            });
    }

    addEditServiceSubmit(): void {
        if (!this.isEdit) {
            this.addService();
        } else {
            this.updateService();
        }
    }

    addService(): void {
        this._basicService
            .add(ENDPOINT.PROVIDED_SERVICES, this.ServicesForm.value)
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

    updateService(): void {
        this._basicService
            .update(ENDPOINT.PROVIDED_SERVICES, this.serviceId, this.ServicesForm.value)
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
