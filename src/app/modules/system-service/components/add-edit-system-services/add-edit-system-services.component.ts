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
  selector: 'app-add-edit-system-services',
  templateUrl: './add-edit-system-services.component.html',
  styleUrl: './add-edit-system-services.component.scss'
})
export class AddEditSystemServicesComponent implements OnInit{
    
  private _formBuilder = inject(FormBuilder);
  private _activatedRoute = inject(ActivatedRoute);
  private _destroyRef = inject(DestroyRef);
  private _basicService = inject(BasicServicesService);
  private _router = inject(Router);
  private _dialogService = inject(DialogService);
  private _permissionsService = inject(PermissionsService);

  systemServiceForm!: FormGroup;
  systemServiceId: any;
  systemDetails: any;
  isEdit: boolean = false;
  ENDPOINT;
  ref: DynamicDialogRef;
  updateData: any;

   // Permissions
   addPermission = false;
   editPermission = false;

  ngOnInit(): void {
      this.initSystemServiceForm();
      this.checkSystemServiceId();
  }

  getPermissions(): void {
    const allowedPermissions = this._permissionsService.getPermissions('ServicesSystems');
    this.addPermission = allowedPermissions.addPermission;
    if(!this.addPermission && !this.systemServiceId) this._router.navigate(['/Services-Systems/view']); 
    this.editPermission = allowedPermissions.editPermission;
    if(!this.editPermission && this.systemServiceId) this._router.navigate(['/Services-Systems/view']); 
}


  initSystemServiceForm(): void {
      this.systemServiceForm = this._formBuilder.group({
          nameAr: ['', Validators.required],
          nameEn: [''],
          isActive: [this.systemDetails?.isActive ? this.systemDetails?.isActive : true, Validators.required],
      });
  }

  checkSystemServiceId(): void {
      this._activatedRoute.params.subscribe((params) => {
          if (params['id']) {
              this.systemServiceId = params['id'];
              this.isEdit = true;
              this.getSystemServiceDetails();
          }
      });
      this.getPermissions();
  }

  clearForm(): void {
      this.systemServiceForm.reset();
      this.systemServiceForm.controls['isActive'].setValue(true);
  }

  showAddSystemService(): void {
      this.ref = this._dialogService.open(DynamicDialogComponent, {
          width: '30vw',
          height: 'auto',
          data: {
              title: 'dynamicDialog.Congratulations',
              description: 'dynamicDialog.new_system_service',
              actionText: 'dynamicDialog.Add_system_service_btn',
              cancelText: 'dynamicDialog.show_system_service_btn',
              image: 'assets/images/ui/Done.gif',
          },
      });

      if (this.ref) {
          this.ref.onClose.subscribe((data) => {
              if (data) {
                  if (data.action === 'action') {
                      this.clearForm();

                  } else if (data.action === 'cancel') {
                      this._router.navigate([`Services-Systems/view`]);
                  }
              }
          });
      } else {
          console.error('Dialog could not be opened.');
      }
  }

  showEditSystemService(): void {
      this.ref = this._dialogService.open(DynamicDialogComponent, {
          width: '30vw',
          height: 'auto',
          data: {
              title: 'dynamicDialog.Congratulations',
              description: 'dynamicDialog.edit_system_service',
              actionText: 'dynamicDialog.show_system_service_btn',
              // cancelText: 'dynamicDialog.show_city_btn',
              image: 'assets/images/ui/Done.gif',
          },
      });

      if (this.ref) {
          this.ref.onClose.subscribe((data) => {
              if (data) {
                  if (data.action === 'action') {
                      this._router.navigate([`Services-Systems/view`]);
                      // } else if (data.action === 'cancel') {
                      //     this._router.navigate([`Cities/view`]);
                  }
              }
          });
      } else {
          console.error('Dialog could not be opened.');
      }
  }

  cancelSystemService(): void {
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
                    this._router.navigate([`Services-Systems/view`]);
                  } else if (data.action === 'cancel') {
                  }
              }
          });
      } else {
          console.error('Dialog could not be opened.');
      }
  }

  getSystemServiceDetails(): void {
      this._basicService
          .getById(ENDPOINT.SERVICES_SYSTEMS, this.systemServiceId)
          .subscribe((response: any) => {
              this.systemDetails = response.data;
              this.systemServiceForm.patchValue(
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

  addEditSystemServiceSubmit(cityForm): void {

      let body = {
          ...this.systemServiceForm.value
      };

      if (!body.names) {
          body.names = [];
      }

      // Check if the English name exists and add it to the array
      if (this.systemServiceForm.value.nameEn) {
          body.names.push({
              id: null,
              language: 'en',
              value: cityForm.value.nameEn,
              localizationSetsId: null,
          });
      }

      // Check if the Arabic name exists and add it to the array
      if (this.systemServiceForm.value.nameAr) {
          body.names.push({
              id: null,
              language: 'ar',
              value: cityForm.value.nameAr,
              localizationSetsId: null,
          });
      }


      if (!this.isEdit) {
          this.addSystemService(body);
      } else {
          this.updateSystemService(body);
      }
  }

  addSystemService(body): void {
      this._basicService
          .add(ENDPOINT.SERVICES_SYSTEMS, body)
          .pipe(takeUntilDestroyed(this._destroyRef))
          .subscribe((response: any) => {
              //   this._toasterService.showMassage(
              //       'success',
              //       'Success',
              //       'تم حفظ الشركة بنجاح'
              //   );
              this.showAddSystemService();
          });
  }

  updateSystemService(body): void {
      this._basicService
          .update(ENDPOINT.SERVICES_SYSTEMS, this.systemServiceId, body)
          .pipe(takeUntilDestroyed(this._destroyRef))
          .subscribe((response: any) => {
              //   this._toasterService.showMassage(
              //       'success',
              //       'Success',
              //       'تم تعديل الشركة بنجاح'
              //   );
              //   this._router.navigate([`Cities/view`]);
              this.showEditSystemService();
          });
  }

}
