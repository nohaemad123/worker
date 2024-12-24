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
    selector: 'app-add-edit-shifts',
    templateUrl: './add-edit-shifts.component.html',
    styleUrl: './add-edit-shifts.component.scss'
})
export class AddEditShiftsComponent implements OnInit {

    private _formBuilder = inject(FormBuilder);
    private _activatedRoute = inject(ActivatedRoute);
    private _destroyRef = inject(DestroyRef);
    private _basicService = inject(BasicServicesService);
    private _router = inject(Router);
    private _dialogService = inject(DialogService);
    private _permissionsService = inject(PermissionsService);

    shiftForm!: FormGroup;
    shiftId: any;
    shiftDetails: any;
    isEdit: boolean = false;
    ENDPOINT;
    ref: DynamicDialogRef;

    // Permissions
    addPermission = false;
    editPermission = false;

    ngOnInit(): void {
        this.initShiftsForm();
        this.checkShiftId();
    }

    getPermissions(): void {
        const allowedPermissions = this._permissionsService.getPermissions('Shifts');
        this.addPermission = allowedPermissions.addPermission;
        if(!this.addPermission && !this.shiftId) this._router.navigate(['/Shifts/view']); 
        this.editPermission = allowedPermissions.editPermission;
        if(!this.editPermission && this.shiftId) this._router.navigate(['/Shifts/view']); 
    }


    initShiftsForm(): void {
        this.shiftForm = this._formBuilder.group({
            // code: [null],
            name: ['', Validators.required],
            time: ['', Validators.required],
            isActive: [this.shiftDetails?.isActive ? this.shiftDetails?.isActive : true, Validators.required],
            // toDate: ['', Validators.required],
        });
    }

    checkShiftId(): void {
        this._activatedRoute.params.subscribe((params) => {
            if (params['id']) {
                this.shiftId = params['id'];
                this.isEdit = true;
                this.getShiftDetails();
            } 
        });
        this.getPermissions();
    }

    clearForm(): void {
        this.shiftForm.reset();
        this.shiftForm.controls['isActive'].setValue(true);
    }

    showAddShift(): void {
        this.ref = this._dialogService.open(DynamicDialogComponent, {
            width: '30vw',
            height: 'auto',
            data: {
                title: 'dynamicDialog.Congratulations',
                description: 'dynamicDialog.new_shift',
                actionText: 'dynamicDialog.Add_shift_btn',
                cancelText: 'dynamicDialog.show_shift_btn',
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
                        this._router.navigate([`Shifts/view`]);
                    }
                }
            });
        } else {
            console.error('Dialog could not be opened.');
        }
    }

    showEditShift(): void {
        this.ref = this._dialogService.open(DynamicDialogComponent, {
            width: '30vw',
            height: 'auto',
            data: {
                title: 'dynamicDialog.Congratulations',
                description: 'dynamicDialog.edit_shift',
                actionText: 'dynamicDialog.show_shift_btn',
                // cancelText: 'dynamicDialog.show_shift_btn',
                image: 'assets/images/ui/Done.gif',
            },
        });

        if (this.ref) {
            this.ref.onClose.subscribe((data) => {
                if (data) {
                    if (data.action === 'action') {
                        this._router.navigate([`Shifts/view`]);
                        // } else if (data.action === 'cancel') {
                        //     this._router.navigate([`Shifts/view`]);
                    }
                }
            });
        } else {
            console.error('Dialog could not be opened.');
        }
    }

    cancelShift(): void {
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
                        this._router.navigate([`Shifts/view`]);
                    } else if (data.action === 'cancel') {
                    }
                }
            });
        } else {
            console.error('Dialog could not be opened.');
        }
    }

    getShiftDetails(): void {
        this._basicService
            .getById(ENDPOINT.SHIFTS, this.shiftId)
            .subscribe((response: any) => {
                this.shiftDetails = response.data;
                this.shiftForm.patchValue(response.data);
            });
    }

    addEditShiftSubmit(): void {
        if (!this.isEdit) {
            this.addShift();
        } else {
            this.updateShift();
        }
    }

    addShift(): void {
        this._basicService
            .add(ENDPOINT.SHIFTS, this.shiftForm.value)
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe((response: any) => {
                //   this._toasterService.showMassage(
                //       'success',
                //       'Success',
                //       'تم حفظ الشركة بنجاح'
                //   );
                this.showAddShift();
            });
    }

    updateShift(): void {
        this._basicService
            .update(ENDPOINT.SHIFTS, this.shiftId, this.shiftForm.value)
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe((response: any) => {
                //   this._toasterService.showMassage(
                //       'success',
                //       'Success',
                //       'تم تعديل الشركة بنجاح'
                //   );
                //   this._router.navigate([`Jobs/view`]);
                this.showEditShift();
            });
    }

}
