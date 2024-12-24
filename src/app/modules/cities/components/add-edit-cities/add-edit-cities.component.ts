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
    selector: 'app-add-edit-cities',
    templateUrl: './add-edit-cities.component.html',
    styleUrl: './add-edit-cities.component.scss'
})
export class AddEditCitiesComponent implements OnInit {

    private _formBuilder = inject(FormBuilder);
    private _activatedRoute = inject(ActivatedRoute);
    private _destroyRef = inject(DestroyRef);
    private _basicService = inject(BasicServicesService);
    private _router = inject(Router);
    private _dialogService = inject(DialogService);
    private _permissionsService = inject(PermissionsService);

    cityForm!: FormGroup;
    cityId: any;
    cityDetails: any;
    isEdit: boolean = false;
    ENDPOINT;
    ref: DynamicDialogRef;
    updateData: any;

    // Permissions
    addPermission = false;
    editPermission = false;

    ngOnInit(): void {
        this.initCityForm();
        this.checkCityId();
    }

    getPermissions(): void {
        const allowedPermissions = this._permissionsService.getPermissions('Cities');
        this.addPermission = allowedPermissions.addPermission;
        if(!this.addPermission && !this.cityId) this._router.navigate(['/Cities/view']); 
        this.editPermission = allowedPermissions.editPermission;
        if(!this.editPermission && this.cityId) this._router.navigate(['/Cities/view']); 
    }

    initCityForm(): void {
        this.cityForm = this._formBuilder.group({
            nameAr: ['', Validators.required],
            nameEn: [''],
            isActive: [this.cityDetails?.isActive ? this.cityDetails?.isActive : true, Validators.required]
        });
    }

    checkCityId(): void {
        this._activatedRoute.params.subscribe((params) => {
            if (params['id']) {
                this.cityId = params['id'];
                this.isEdit = true;
                this.getCityDetails();
            }
        });
        this.getPermissions();
    }

    clearForm(): void {
        this.cityForm.reset();
        this.cityForm.controls['isActive'].setValue(true);
    }

    showAddCity(): void {
        this.ref = this._dialogService.open(DynamicDialogComponent, {
            width: '30vw',
            height: 'auto',
            data: {
                title: 'dynamicDialog.Congratulations',
                description: 'dynamicDialog.new_city',
                actionText: 'dynamicDialog.Add_city_btn',
                cancelText: 'dynamicDialog.show_city_btn',
                image: 'assets/images/ui/Done.gif',
            },
        });

        if (this.ref) {
            this.ref.onClose.subscribe((data) => {
                if (data) {
                    if (data.action === 'action') {
                        this.clearForm();
                    } else if (data.action === 'cancel') {
                        this._router.navigate([`Cities/view`]);
                    }
                }
            });
        } else {
            console.error('Dialog could not be opened.');
        }
    }

    showEditCity(): void {
        this.ref = this._dialogService.open(DynamicDialogComponent, {
            width: '30vw',
            height: 'auto',
            data: {
                title: 'dynamicDialog.Congratulations',
                description: 'dynamicDialog.edit_city',
                actionText: 'dynamicDialog.show_city_btn',
                // cancelText: 'dynamicDialog.show_city_btn',
                image: 'assets/images/ui/Done.gif',
            },
        });

        if (this.ref) {
            this.ref.onClose.subscribe((data) => {
                if (data) {
                    if (data.action === 'action') {
                        this._router.navigate([`Cities/view`]);
                        // } else if (data.action === 'cancel') {
                        //     this._router.navigate([`Cities/view`]);
                    }
                }
            });
        } else {
            console.error('Dialog could not be opened.');
        }
    }

    cancelCity(): void {
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
                        this._router.navigate([`Cities/view`]);
                    } else if (data.action === 'cancel') {
                    }
                }
            });
        } else {
            console.error('Dialog could not be opened.');
        }
    }

    getCityDetails(): void {
        this._basicService
            .getById(ENDPOINT.CITY, this.cityId)
            .subscribe((response: any) => {
                this.cityDetails = response.data;
                this.cityForm.patchValue(
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

    addEditCitySubmit(cityForm): void {

        let body = {
            ...this.cityForm.value
        };

        if (!body.names) {
            body.names = [];
        }

        // Check if the English name exists and add it to the array
        if (this.cityForm.value.nameEn) {
            body.names.push({
                id: null,
                language: 'en',
                value: cityForm.value.nameEn,
                localizationSetsId: null,
            });
        }

        // Check if the Arabic name exists and add it to the array
        if (this.cityForm.value.nameAr) {
            body.names.push({
                id: null,
                language: 'ar',
                value: cityForm.value.nameAr,
                localizationSetsId: null,
            });
        }


        if (!this.isEdit) {
            this.addCity(body);
        } else {
            this.updateCity(body);
        }
    }

    addCity(body): void {
        this._basicService
            .add(ENDPOINT.CITY, body)
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe((response: any) => {
                //   this._toasterService.showMassage(
                //       'success',
                //       'Success',
                //       'تم حفظ الشركة بنجاح'
                //   );
                this.showAddCity();
            });
    }

    updateCity(body): void {
        this._basicService
            .update(ENDPOINT.CITY, this.cityId, body)
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe((response: any) => {
                //   this._toasterService.showMassage(
                //       'success',
                //       'Success',
                //       'تم تعديل الشركة بنجاح'
                //   );
                //   this._router.navigate([`Cities/view`]);
                this.showEditCity();
            });
    }

}
