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
    selector: 'app-add-edit-workers',
    templateUrl: './add-edit-workers.component.html',
    styleUrl: './add-edit-workers.component.scss',
})
export class AddEditWorkersComponent {
    private _formBuilder = inject(FormBuilder);
    private _activatedRoute = inject(ActivatedRoute);
    private _destroyRef = inject(DestroyRef);
    private _basicService = inject(BasicServicesService);
    private _router = inject(Router);
    private _dialogService = inject(DialogService);
    private _permissionsService = inject(PermissionsService);

    workerForm!: FormGroup;
    workerId: any;
    workerDetails: any;
    isEdit: boolean = false;
    ENDPOINT;
    ref: DynamicDialogRef;
    imageFile: any = {
        isUpload: false,
        img: '',
        bannerImg: '',
        id: '',
        progress: 0,
        imgfileData: '',
    };

    allJobs: any[] = [];
    allNationalities: any[] = [];
    allCompaniesBranches: any[] = [];
    path = 'https://worker.bnoop.net/';

    filterCriteria = {
        readDto: {
            isActive: true,
        },
    };

    // Permissions
    addPermission = false;
    editPermission = false;

    ngOnInit(): void {
        this.initWorkerForm();
        this.getAllJobs();
        this.getAllNationality();
        this.getAllBranches();
        this.checkWorkerId();
    }

    getPermissions(): void {
        const allowedPermissions = this._permissionsService.getPermissions('Workers');
        this.addPermission = allowedPermissions.addPermission;
        if(!this.addPermission && !this.workerId) this._router.navigate(['/Workers/view']); 
        this.editPermission = allowedPermissions.editPermission;
        if(!this.editPermission && this.workerId) this._router.navigate(['/Workers/view']); 
    }

    initWorkerForm(): void {
        this.workerForm = this._formBuilder.group({
            Name: ['', Validators.required],
            Age: [null, Validators.required],
            ResidenceNumber: ['', Validators.required],
            Phone: [
                '',
                [Validators.required, Validators.pattern(/^[0-9]{10}$/)],
            ],
            YearsOfExperience: [null, Validators.required],
            JobId: ['', Validators.required],
            NationalityId: ['', Validators.required],
            CompanyBranchId: ['', Validators.required],
            isActive: [
                this.workerDetails?.isActive
                    ? this.workerDetails?.isActive
                    : true,
                Validators.required,
            ],
            Image: [''],
            ImageFile: [''],
        });
    }

    checkWorkerId(): void {
        this._activatedRoute.params.subscribe((params) => {
            if (params['id']) {
                this.workerId = params['id'];
                this.isEdit = true;
                this.getWorkerDetails();
            } else {
            }
        });
        this.getPermissions();
    }

    getAllJobs() {
        this._basicService
            .getAll(ENDPOINT.JOB, this.filterCriteria)
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe((res) => {
                this.allJobs = res.data.listData;
            });
    }

    getAllNationality() {
        this._basicService
            .getAll(ENDPOINT.NATIONALITY, this.filterCriteria)
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe((res) => {
                this.allNationalities = res.data.listData;
            });
    }

    getAllBranches() {
        this._basicService
            .getAll(ENDPOINT.COMPANY_BRANCHES, this.filterCriteria)
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe((res) => {
                this.allCompaniesBranches = res.data.listData;
            });
    }

    clearForm(): void {
        this.workerForm.reset();
        this.workerForm.controls['isActive'].setValue(true);
    }

    triggerFileInput() {
        const fileInput = document.getElementById(
            'customFileImage'
        ) as HTMLElement;
        fileInput.click();
    }

    showAddworker() {
        this.ref = this._dialogService.open(DynamicDialogComponent, {
            width: '30vw',
            height: 'auto',
            data: {
                title: 'dynamicDialog.Congratulations',
                description: 'dynamicDialog.new_worker',
                actionText: 'dynamicDialog.Add_worker_btn',
                cancelText: 'dynamicDialog.show_worker_btn',
                image: 'assets/images/ui/Done.gif',
            },
        });

        if (this.ref) {
            this.ref.onClose.subscribe((data) => {
                if (data) {
                    if (data.action === 'action') {
                        this.clearForm();
                    } else if (data.action === 'cancel') {
                        this._router.navigate([`Workers/view`]);
                    }
                }
            });
        } else {
            console.error('Dialog could not be opened.');
        }
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

    showEditWorker(): void {
        this.ref = this._dialogService.open(DynamicDialogComponent, {
            width: '30vw',
            height: 'auto',
            data: {
                title: 'dynamicDialog.Congratulations',
                description: 'dynamicDialog.edit_worker',
                actionText: 'dynamicDialog.show_worker_btn',
                // cancelText: 'dynamicDialog.show_company_btn',
                image: 'assets/images/ui/Done.gif',
            },
        });

        if (this.ref) {
            this.ref.onClose.subscribe((data) => {
                if (data) {
                    if (data.action === 'action') {
                        this._router.navigate([`Workers/view`]);
                        // } else if (data.action === 'cancel') {
                        //     this._router.navigate([`Companies/view`]);
                    }
                }
            });
        } else {
            console.error('Dialog could not be opened.');
        }
    }

    cancelWorker(): void {
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
                        this._router.navigate([`Workers/view`]);
                    } else if (data.action === 'cancel') {
                    }
                }
            });
        } else {
            console.error('Dialog could not be opened.');
        }
    }

    getWorkerDetails(): void {
        this._basicService
            .getById(ENDPOINT.WORKER, this.workerId)
            .subscribe((response: any) => {
                this.workerDetails = response.data;
                this.workerForm.patchValue({
                    Name: response.data.name,
                    Age: response.data.age,
                    ResidenceNumber: response.data.residenceNumber,
                    Phone: response.data.phone,
                    YearsOfExperience: response.data.yearsOfExperience,
                    JobId: response.data.jobId,
                    NationalityId: response.data.nationalityId,
                    CompanyBranchId: response.data.companyBranchId,
                    Image: response.data.image,
                    isActive: response.data.isActive,
                });
                this.imageFile.img =
                    this.path + response.data.image.replace(/\\/g, '/');
                this.imageFile.imgfileData = this.path + response.data.image;
                console.log('this.workerForm', this.workerForm);
                // console.log(this.imageFile.imgfileData);
            });
    }

    addEditWorkerSubmit(): void {
        console.log(this.workerForm.value);
        let body = {
            Name: this.workerForm.value.Name,
            Age: this.workerForm.value.Age,
            ResidenceNumber: this.workerForm.value.ResidenceNumber,
            Phone: this.workerForm.value.Phone,
            YearsOfExperience: this.workerForm.value.YearsOfExperience,
            JobId: this.workerForm.value.JobId,
            NationalityId: this.workerForm.value.NationalityId,
            CompanyBranchId: this.workerForm.value.CompanyBranchId,
            Image: this.workerForm.value.Image,
            ImageFile: this.imageFile.imgfileData,
            isActive: this.workerForm.value.isActive,
        };

        console.log(body);
        const formData = new FormData();
        Object.keys(body).forEach((key) => {
            body[key] ? formData.append(key, body[key]) : '';
        });

        if (!this.isEdit) {
            this.addWorker(formData);
        } else {
            console.log(formData);
            this.updateWorker(formData);
        }
    }

    addWorker(formData: any): void {
        this._basicService
            .add(ENDPOINT.WORKER, formData)
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe((response: any) => {
                //   this._toasterService.showMassage(
                //       'success',
                //       'Success',
                //       'تم حفظ الشركة بنجاح'
                //   );
                this.showAddworker();
            });
    }

    updateWorker(formData: any): void {
        console.log(formData);
        this._basicService
            .update(ENDPOINT.WORKER, this.workerId, formData)
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe((response: any) => {
                //   this._toasterService.showMassage(
                //       'success',
                //       'Success',
                //       'تم تعديل الشركة بنجاح'
                //   );
                //   this._router.navigate([`Companies/view`]);
                this.showEditWorker();
            });
    }
}
