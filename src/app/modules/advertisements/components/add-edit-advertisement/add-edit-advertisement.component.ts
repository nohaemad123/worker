import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DynamicDialogComponent } from '@shared/components/dynamic-dialog/dynamic-dialog.component';
import { ENDPOINT } from 'app/core/enums/endPoints.enum';
import { BasicServicesService } from 'app/core/services/Basic-services/basic-services.service';
import { PermissionsService } from 'app/core/services/permissions/permissions.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-add-edit-advertisement',
  templateUrl: './add-edit-advertisement.component.html',
  styleUrl: './add-edit-advertisement.component.scss'
})
export class AddEditAdvertisementComponent implements OnInit {

  private _formBuilder = inject(FormBuilder);
  private _activatedRoute = inject(ActivatedRoute);
  private _destroyRef = inject(DestroyRef);
  private _basicService = inject(BasicServicesService);
  private _router = inject(Router);
  private _dialogService = inject(DialogService);
  private _permissionsService = inject(PermissionsService);

  advForm!: FormGroup;
  advId: any;
  ref: DynamicDialogRef;

  imageFile: any = {
    isUpload: false,
    img: '',
    bannerImg: '',
    id: '',
    progress: 0,
    imgfileData: null,
  };
  imagePath: string;
  imgPath: any;
  path = 'https://worker.bnoop.net/';
  addEditLoading: boolean = false;
  today: any = new Date();

  // Permissions
  addPermission = false;
  editPermission = false;

  ngOnInit(): void {
    this.initAdvForm();
    this.checkAdvId();
  }

  getPermissions(): void {
    const allowedPermissions = this._permissionsService.getPermissions('Advertisements');
    this.addPermission = allowedPermissions.addPermission;
    if (!this.addPermission && !this.advId) this._router.navigate(['/Advertisements/view']);
    this.editPermission = allowedPermissions.editPermission;
    if (!this.editPermission && this.advId) this._router.navigate(['/Advertisements/view']);
  }

  initAdvForm(): void {
    this.advForm = this._formBuilder.group({
      Date: ['', Validators.required],
      Image: [''],
      ImageFile: [''],
    });
  }

  checkAdvId(): void {
    this._activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.advId = params['id'];
        this.getAdvDetails();
      }
    });
    this.getPermissions();
  }

  getAdvDetails(): void {
    this._basicService
      .getById(ENDPOINT.ADVERTISEMENT, this.advId)
      .subscribe((response: any) => {
        this.advForm.patchValue({
          Date: response.data.date
        });

        this.imageFile.img =
          this.path + response.data.image.replace(/\\/g, '/');

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

  showAddAdv() {
    this.ref = this._dialogService.open(DynamicDialogComponent, {
      width: '30vw',
      height: 'auto',
      data: {
        title: 'dynamicDialog.Congratulations',
        description: 'dynamicDialog.new_adv',
        actionText: 'dynamicDialog.Add_adv_btn',
        cancelText: 'dynamicDialog.show_adv_btn',
        image: 'assets/images/ui/Done.gif',
      },
    });

    if (this.ref) {
      this.ref.onClose.subscribe((data) => {
        if (data) {
          if (data.action === 'action') {
            this.clearForm();
          } else if (data.action === 'cancel') {
            this._router.navigate([`Advertisements/view`]);
          }
        }
      });
    } else {
      console.error('Dialog could not be opened.');
    }
  }

  showEditAdv(): void {
    this.ref = this._dialogService.open(DynamicDialogComponent, {
      width: '30vw',
      height: 'auto',
      data: {
        title: 'dynamicDialog.Congratulations',
        description: 'dynamicDialog.edit_adv',
        actionText: 'dynamicDialog.show_adv_btn',
        // cancelText: 'dynamicDialog.show_adv_btn',
        image: 'assets/images/ui/Done.gif',
      },
    });

    if (this.ref) {
      this.ref.onClose.subscribe((data) => {
        if (data) {
          if (data.action === 'action') {
            this._router.navigate([`Advertisements/view`]);
            // } else if (data.action === 'cancel') {
            //     this._router.navigate([`Advertisements/view`]);
          }
        }
      });
    } else {
      console.error('Dialog could not be opened.');
    }
  }

  cancelAdv(): void {
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
            this._router.navigate([`Advertisements/view`]);
          } else if (data.action === 'cancel') {
          }
        }
      });
    } else {
      console.error('Dialog could not be opened.');
    }
  }

  addEditAdvSubmit(): void {
    let body = {
      Date: this.advForm.value.Date.toISOString(),
      Image: this.advForm.value.Image,
      ImageFile: this.imageFile.imgfileData,
    };
    const formData = new FormData();
    Object.keys(body).forEach((key) => {
      body[key] ? formData.append(key, body[key]) : '';
    });

    if (!this.advId) {
      this.addAdv(formData);
    } else {
      this.updateAdv(formData);
    }
  }

  addAdv(formData): void {
    this.addEditLoading = true;
    this._basicService
      .add(ENDPOINT.ADVERTISEMENT, formData)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe((response: any) => {
        this.addEditLoading = false;
        this.showAddAdv();
      }, (error: any) => {
        this.addEditLoading = false;
      });
  }

  updateAdv(formData): void {
    this.addEditLoading = true;
    this._basicService
      .update(ENDPOINT.ADVERTISEMENT, this.advId, formData)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe((response: any) => {
        this.addEditLoading = false;
        this.showEditAdv();
      }, (error: any) => {
        this.addEditLoading = false;
      });
  }

  triggerFileInput() {
    const fileInput = document.getElementById(
      'customFileImage'
    ) as HTMLElement;
    fileInput.click();
  }

  clearForm(): void {
    this.advForm.reset();
    this.imageFile = {
      isUpload: false,
      img: '',
      bannerImg: '',
      id: '',
      progress: 0,
      imgfileData: null,
    };
  }

}
