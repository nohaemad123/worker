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
    selector: 'app-add-edit-companies',
    templateUrl: './add-edit-companies.component.html',
    styleUrl: './add-edit-companies.component.scss',
})
export class AddEditCompaniesComponent implements OnInit {

    private _formBuilder = inject(FormBuilder);
    private _activatedRoute = inject(ActivatedRoute);
    private _destroyRef = inject(DestroyRef);
    private _basicService = inject(BasicServicesService);
    private _router = inject(Router);
    private _dialogService = inject(DialogService);
    private _permissionsService = inject(PermissionsService);

    companyForm!: FormGroup;
    companyId: any;
    companyDetails: any = {};
    isEdit: boolean = false;
    ENDPOINT;
    ref: DynamicDialogRef;
    mode = '';
    imageFile: any = {
        isUpload: false,
        img: '',
        bannerImg: '',
        id: '',
        progress: 0,
        imgfileData: null,
    };
    imagePath: string;

    // Permissions
    addPermission = false;
    editPermission = false;

    ngOnInit(): void {
        this.initCompanyForm();
        this.checkCompanyId();
    }

    getPermissions(): void {
        const allowedPermissions = this._permissionsService.getPermissions('Companies');
        this.addPermission = allowedPermissions.addPermission;
        if(!this.addPermission && !this.companyId) this._router.navigate(['/Companies/view']); 
        this.editPermission = allowedPermissions.editPermission;
        if(!this.editPermission && this.companyId) this._router.navigate(['/Companies/view']); 
    }

    initCompanyForm(): void {
        this.companyForm = this._formBuilder.group({
            code: [null],
            companyName: ['', Validators.required],
            Email: ['', [Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
            commercialRegistrationNumber: ['', Validators.required],
            LaborRecruitmentLicense: ['',  [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
            CenterOfCommunication: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
            taxNumber: ['',  [Validators.required, Validators.pattern(/^[0-9]{15}$/)]],
            companyMobileNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
            yearsOfExperience: [null],
            headquarters: ['',  [Validators.required]],
            CommotionRate: [null, [Validators.required] ],
            Image: [''],
            ImageFile: [''],
            isActive: [this.companyDetails?.isActive ? this.companyDetails?.isActive : true, Validators.required],
        });
    }

    checkCompanyId(): void {
        this._activatedRoute.params.subscribe((params) => {
            if (params['mode']) {
                this.mode = params['mode'];
            }
            if (params['id']) {
                this.companyId = params['id'];
                this.isEdit = true;
                this.getCompanyDetails();
            } else {
                this.getCode();
            }
        });
        this.getPermissions();
    }

    getCode(): void {
        this._basicService.getCode(ENDPOINT.COMPANY).subscribe((res) => {
            this.companyForm.controls['code'].setValue(String(res.data));
        });
    }

    clearForm(): void {
        this.companyForm.reset();
        this.companyForm.controls['isActive'].setValue(true);
        this.getCode();
    }

    showAddCompany() {
        this.ref = this._dialogService.open(DynamicDialogComponent, {
            width: '30vw',
            height: 'auto',
            data: {
                title: 'dynamicDialog.Congratulations',
                description: 'dynamicDialog.new_company',
                actionText: 'dynamicDialog.Add_company_btn',
                cancelText: 'dynamicDialog.show_company_btn',
                image: 'assets/images/ui/Done.gif',
            },
        });

        if (this.ref) {
            this.ref.onClose.subscribe((data) => {
                if (data) {
                    if (data.action === 'action') {
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

    showEditCompany(): void {
        this.ref = this._dialogService.open(DynamicDialogComponent, {
            width: '30vw',
            height: 'auto',
            data: {
                title: 'dynamicDialog.Congratulations',
                description: 'dynamicDialog.edit_company',
                actionText: 'dynamicDialog.show_company_btn',
                // cancelText: 'dynamicDialog.show_company_btn',
                image: 'assets/images/ui/Done.gif',
            },
        });

        if (this.ref) {
            this.ref.onClose.subscribe((data) => {
                if (data) {
                    if (data.action === 'action') {
                        this._router.navigate([`Companies/view`]);
                        // } else if (data.action === 'cancel') {
                        //     this._router.navigate([`Companies/view`]);
                    }
                }
            });
        } else {
            console.error('Dialog could not be opened.');
        }
    }

    cancelCompany(): void {
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
                        this._router.navigate([`Companies/view`]);
                    } else if (data.action === 'cancel') {
                    }
                }
            });
        } else {
            console.error('Dialog could not be opened.');
        }
    }
    imgPath: any;
    path = 'https://worker.bnoop.net/';
    getCompanyDetails(): void {
        this._basicService
            .getById(ENDPOINT.COMPANY, this.companyId)
            .subscribe((response: any) => {
                this.companyDetails = response.data;
                this.companyForm.patchValue({
                    code: response?.data?.code,
                    companyName: response?.data?.companyName,
                    commercialRegistrationNumber:
                        response?.data?.commercialRegistrationNumber,
                    taxNumber: response?.data?.taxNumber,
                    companyMobileNumber: response?.data?.companyMobileNumber,
                    yearsOfExperience: response?.data?.yearsOfExperience,
                    headquarters: response?.data?.headquarters,
                    isActive: response?.data?.isActive,
                    CenterOfCommunication: response?.data?.centerOfCommunication,
                    Email: response?.data?.email,
                    LaborRecruitmentLicense: response?.data?.laborRecruitmentLicense,
                    CommotionRate: response?.data?.commotionRate
                });

                if (response?.data?.image) {
                    this.imageFile.img =
                        this.path + response?.data?.image?.replace(/\\/g, '/');
                }
            });
    }

    showPreviewFile(event: any) {
        const file: File = event?.target?.files[0];

        const reader = new FileReader();
        reader.onload = (e: any) => {
            this.imageFile.img = e.target.result;
            this.imageFile.imgfileData = file;
        };
        reader.readAsDataURL(file);
    }

    addEditCompanySubmit(): void {
        let body = {
            companyName: this.companyForm.value.companyName,
            commercialRegistrationNumber:
                this.companyForm.value.commercialRegistrationNumber,
            taxNumber: this.companyForm.value.taxNumber,
            companyMobileNumber: this.companyForm.value.companyMobileNumber,
            yearsOfExperience: this.companyForm.value.yearsOfExperience,
            headquarters: this.companyForm.value.headquarters,
            Image: this.companyForm.value.Image,
            ImageFile: this.imageFile.imgfileData,
            isActive: this.companyForm.value.isActive,
            CenterOfCommunication: this.companyForm.value.CenterOfCommunication,
            Email: this.companyForm.value.Email,
            LaborRecruitmentLicense: this.companyForm.value.LaborRecruitmentLicense,
            CommotionRate: this.companyForm.value.CommotionRate
        };

        const formData = new FormData();
        Object.keys(body).forEach((key) => {
            body[key] ? formData.append(key, body[key]) : '';
        });

        if (!this.isEdit) {
            this.addCompany(formData);
        } else {
            this.updateCompany(formData);
        }
    }

    addCompany(formData): void {
        this._basicService
            .add(ENDPOINT.COMPANY, formData)
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe((response: any) => {
                this.showAddCompany();
            });
    }

    updateCompany(formData): void {
        this._basicService
            .update(ENDPOINT.COMPANY, this.companyId, formData)
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe((response: any) => {
                //   this._toasterService.showMassage(
                //       'success',
                //       'Success',
                //       'تم تعديل الشركة بنجاح'
                //   );
                //   this._router.navigate([`Companies/view`]);
                this.showEditCompany();
            });
    }
    triggerFileInput() {
        const fileInput = document.getElementById(
            'customFileImage'
        ) as HTMLElement;
        fileInput.click();
    }
}
