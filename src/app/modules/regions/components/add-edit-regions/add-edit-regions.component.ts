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
    selector: 'app-add-edit-regions',
    templateUrl: './add-edit-regions.component.html',
    styleUrl: './add-edit-regions.component.scss'
})
export class AddEditRegionsComponent implements OnInit {

    private _formBuilder = inject(FormBuilder);
    private _activatedRoute = inject(ActivatedRoute);
    private _destroyRef = inject(DestroyRef);
    private _basicService = inject(BasicServicesService);
    private _router = inject(Router);
    private _dialogService = inject(DialogService);
    private _permissionsService = inject(PermissionsService);

    regionForm!: FormGroup;
    regionId: any;
    regionDetails: any;
    isEdit: boolean = false;
    ENDPOINT;
    ref: DynamicDialogRef;
    citiesList: any[] = [];
    // citiesFilterCriteria = {
    //     page: 1,
    //     pageSize: 1000,
    //     search: null,
    //     readDto: {
    //         name: null,
    //     },
    //     selectColumns: [
    //         'id',
    //         'name',
    //         'isActive'
    //     ],
    //     sortColumn: '',
    //     sortColumnDirection: 'asc',
    // };
    // Permissions
    addPermission = false;
    editPermission = false;

    ngOnInit(): void {
        this.initRegionForm();
        this.checkRegionId();
        this.getAllCitiesList();
    }

    getPermissions(): void {
        const allowedPermissions = this._permissionsService.getPermissions('Regions');
        this.addPermission = allowedPermissions.addPermission;
        if (!this.addPermission && !this.regionId) this._router.navigate(['/Regions/view']);
        this.editPermission = allowedPermissions.editPermission;
        if (!this.editPermission && this.regionId) this._router.navigate(['/Regions/view']);
    }


    initRegionForm(): void {
        this.regionForm = this._formBuilder.group({
            nameAr: ['', Validators.required],
            nameEn: [''],
            cityId: ['', Validators.required],
            isActive: [this.regionDetails?.isActive ? this.regionDetails?.isActive : true, Validators.required],
        });
    }

    checkRegionId(): void {
        this._activatedRoute.params.subscribe((params) => {
            if (params['id']) {
                this.regionId = params['id'];
                this.isEdit = true;
                this.getJobDetails();
            }
        });
        this.getPermissions();
    }

    getAllCitiesList(): void {
        this._basicService
            .getAll(ENDPOINT.CITY,
                {
                    readDto: {
                        isActive: true
                    }
                }
            )
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe(
                (res) => {
                    this.citiesList = res.data.listData;
                },
                (err) => {
                }
            );
    }


    clearForm(): void {
        this.regionForm.reset();
        this.regionForm.controls['isActive'].setValue(true);
    }

    showAddRegion(): void {
        this.ref = this._dialogService.open(DynamicDialogComponent, {
            width: '30vw',
            height: 'auto',
            data: {
                title: 'dynamicDialog.Congratulations',
                description: 'dynamicDialog.new_region',
                actionText: 'dynamicDialog.Add_region_btn',
                cancelText: 'dynamicDialog.show_region_btn',
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
                        this._router.navigate([`Regions/view`]);
                    }
                }
            });
        } else {
            console.error('Dialog could not be opened.');
        }
    }

    showEditJob(): void {
        this.ref = this._dialogService.open(DynamicDialogComponent, {
            width: '30vw',
            height: 'auto',
            data: {
                title: 'dynamicDialog.Congratulations',
                description: 'dynamicDialog.edit_region',
                actionText: 'dynamicDialog.show_region_btn',
                // cancelText: 'dynamicDialog.show_region_btn',
                image: 'assets/images/ui/Done.gif',
            },
        });

        if (this.ref) {
            this.ref.onClose.subscribe((data) => {
                if (data) {
                    if (data.action === 'action') {
                        this._router.navigate([`Regions/view`]);
                        // } else if (data.action === 'cancel') {
                        //     this._router.navigate([`Regions/view`]);
                    }
                }
            });
        } else {
            console.error('Dialog could not be opened.');
        }
    }

    cancelJob(): void {
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
                        this._router.navigate([`Regions/view`]);
                    } else if (data.action === 'cancel') {
                    }
                }
            });
        } else {
            console.error('Dialog could not be opened.');
        }
    }

    getJobDetails(): void {
        this._basicService
            .getById(ENDPOINT.REGION, this.regionId)
            .subscribe((res: any) => {
                this.regionDetails = res.data;
                this.regionForm.patchValue(
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

    addEditRegionSubmit(): void {
        let body = {
            ...this.regionForm.value
        };
        if (!body.names) {
            body.names = [];
        }
        // Check if the English name exists and add it to the array
        if (this.regionForm.value.nameEn) {
            body.names.push({
                id: null,
                language: 'en',
                value: this.regionForm.value.nameEn,
                localizationSetsId: null,
            });
        }
        // Check if the Arabic name exists and add it to the array
        if (this.regionForm.value.nameAr) {
            body.names.push({
                id: null,
                language: 'ar',
                value: this.regionForm.value.nameAr,
                localizationSetsId: null,
            });
        }

        if (!this.isEdit) {
            this.addRegion(body);
        } else {
            this.updateRegion(body);
        }
    }

    addRegion(body): void {
        this._basicService
            .add(ENDPOINT.REGION, body)
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe((response: any) => {
                //   this._toasterService.showMassage(
                //       'success',
                //       'Success',
                //       'تم حفظ الشركة بنجاح'
                //   );
                this.showAddRegion();
            });
    }

    updateRegion(body): void {
        this._basicService
            .update(ENDPOINT.REGION, this.regionId, body)
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe((response: any) => {
                //   this._toasterService.showMassage(
                //       'success',
                //       'Success',
                //       'تم تعديل الشركة بنجاح'
                //   );
                //   this._router.navigate([`Regions/view`]);
                this.showEditJob();
            });
    }

}
