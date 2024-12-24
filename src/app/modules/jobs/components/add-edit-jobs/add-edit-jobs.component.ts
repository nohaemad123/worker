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
    selector: 'app-add-edit-jobs',
    templateUrl: './add-edit-jobs.component.html',
    styleUrl: './add-edit-jobs.component.scss'
})
export class AddEditJobsComponent implements OnInit {

    private _formBuilder = inject(FormBuilder);
    private _activatedRoute = inject(ActivatedRoute);
    private _destroyRef = inject(DestroyRef);
    private _basicService = inject(BasicServicesService);
    private _router = inject(Router);
    private _dialogService = inject(DialogService);
    private _permissionsService = inject(PermissionsService);

    jobForm!: FormGroup;
    jobId: any;
    jobDetails: any;
    isEdit: boolean = false;
    ENDPOINT;
    ref: DynamicDialogRef;

    // Permissions
    addPermission = false;
    editPermission = false;

    ngOnInit(): void {
        this.initJobForm();
        this.checkJobId();
    }

    getPermissions(): void {
        const allowedPermissions = this._permissionsService.getPermissions('Jobs');
        this.addPermission = allowedPermissions.addPermission;
        if(!this.addPermission && !this.jobId) this._router.navigate(['/Jobs/view']); 
        this.editPermission = allowedPermissions.editPermission;
        if(!this.editPermission && this.jobId) this._router.navigate(['/Jobs/view']); 
    }

    initJobForm(): void {
        this.jobForm = this._formBuilder.group({
            nameAr: ['', Validators.required],
            nameEn: [''],
            isActive: [this.jobDetails?.isActive ? this.jobDetails?.isActive : true, Validators.required],
        });
    }

    checkJobId(): void {
        this._activatedRoute.params.subscribe((params) => {
            if (params['id']) {
                this.jobId = params['id'];
                this.isEdit = true;
                this.getJobDetails();
            }
        });
        this.getPermissions();
    }

    clearForm(): void {
        this.jobForm.reset();
        this.jobForm.controls['isActive'].setValue(true);
    }

    showAddJob(): void {
        this.ref = this._dialogService.open(DynamicDialogComponent, {
            width: '30vw',
            height: 'auto',
            data: {
                title: 'dynamicDialog.Congratulations',
                description: 'dynamicDialog.new_job',
                actionText: 'dynamicDialog.Add_job_btn',
                cancelText: 'dynamicDialog.show_job_btn',
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
                        this._router.navigate([`Jobs/view`]);
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
                description: 'dynamicDialog.edit_job',
                actionText: 'dynamicDialog.show_job_btn',
                // cancelText: 'dynamicDialog.show_job_btn',
                image: 'assets/images/ui/Done.gif',
            },
        });

        if (this.ref) {
            this.ref.onClose.subscribe((data) => {
                if (data) {
                    if (data.action === 'action') {
                        this._router.navigate([`Jobs/view`]);
                        // } else if (data.action === 'cancel') {
                        //     this._router.navigate([`Jobs/view`]);
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
                        this._router.navigate([`Jobs/view`]);
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
            .getById(ENDPOINT.JOB, this.jobId)
            .subscribe((res: any) => {
                this.jobDetails = res.data;
                this.jobForm.patchValue(
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

    addEditJobSubmit(jobForm): void {

        let body = {
            ...this.jobForm.value
        };

        if (!body.names) {
            body.names = [];
        }

        // Check if the English name exists and add it to the array
        if (this.jobForm.value.nameEn) {
            body.names.push({
                id: null,
                language: 'en',
                value: jobForm.value.nameEn,
                localizationSetsId: null,
            });
        }

        // Check if the Arabic name exists and add it to the array
        if (this.jobForm.value.nameAr) {
            body.names.push({
                id: null,
                language: 'ar',
                value: jobForm.value.nameAr,
                localizationSetsId: null,
            });
        }

        if (!this.isEdit) {
            this.addJob(body);
        } else {
            this.updateJob(body);
        }
    }

    addJob(body): void {
        this._basicService
            .add(ENDPOINT.JOB, body)
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe((response: any) => {
                //   this._toasterService.showMassage(
                //       'success',
                //       'Success',
                //       'تم حفظ الشركة بنجاح'
                //   );
                this.showAddJob();
            });
    }

    updateJob(body): void {
        this._basicService
            .update(ENDPOINT.JOB, this.jobId, body)
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe((response: any) => {
                //   this._toasterService.showMassage(
                //       'success',
                //       'Success',
                //       'تم تعديل الشركة بنجاح'
                //   );
                //   this._router.navigate([`Jobs/view`]);
                this.showEditJob();
            });
    }

}
