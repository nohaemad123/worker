import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BasicServicesService } from 'app/core/services/Basic-services/basic-services.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ENDPOINT } from 'app/core/enums/endPoints.enum';
import { DynamicDialogComponent } from '@shared/components/dynamic-dialog/dynamic-dialog.component';
import { PermissionsService } from 'app/core/services/permissions/permissions.service';
import { ToastService } from '@shared/services/error/toaster.service';

@Component({
  selector: 'app-add-edit-services-pricing',
  templateUrl: './add-edit-services-pricing.component.html',
  styleUrl: './add-edit-services-pricing.component.scss'
})
export class AddEditServicesPricingComponent implements OnInit {

  private _formBuilder = inject(FormBuilder);
  private _activatedRoute = inject(ActivatedRoute);
  private _destroyRef = inject(DestroyRef);
  private _basicService = inject(BasicServicesService);
  private _router = inject(Router);
  private _dialogService = inject(DialogService);
  private _permissionsService = inject(PermissionsService);
  private toastr = inject(ToastService);

  servicePricingForm!: FormGroup;
  serviceId: any;
  ENDPOINT;
  ref: DynamicDialogRef;
  serviceDetails: any;
  numberOfItemsFromEnd = 5;

  servicesTypesFilterCriteria = {
    page: 1,
    pageSize: 1000,
    search: null,
    readDto: {
      name: null,
      isActive: true,
    },
    selectColumns: [
      'id',
      'name'
    ],
    sortColumn: '',
    sortColumnDirection: 'asc',
  };
  servicesTypesList: any[] = [];
  servicesTypesLoading = false;

  branchesFilterCriteria = {
    page: 1,
    pageSize: 1000,
    search: null,
    readDto: {
      isActive: true,
      name: null,
    },
    selectColumns: ['id', 'branchName'],
    sortColumn: '',
    sortColumnDirection: 'asc',
  };
  branchesList: any[] = [];
  branchesLoading = false;

  nationalitiesFilterCriteria = {
    page: 1,
    pageSize: 1000,
    search: null,
    readDto: {
      name: null,
      isActive: true
    },
    selectColumns: [
      'id',
      'name'
    ],
    sortColumn: '',
    sortColumnDirection: 'asc',
  };
  nationalitiesList: any[] = [];
  nationalitiesLoading = false;

  // jobsFilterCriteria = {
  //   page: 1,
  //   pageSize: 1000,
  //   search: null,
  //   readDto: {
  //     name: null,
  //     isActive: true
  //   },
  //   selectColumns: [
  //     'id',
  //     'name'
  //   ],
  //   sortColumn: '',
  //   sortColumnDirection: 'asc',
  // };
  // jobsList: any[] = [];
  // jobsLoading = false;

  durationsList: any[] = [];
  durationLoading = false;

  // Permissions
  addPermission = false;
  editPermission = false;

  ngOnInit(): void {
    this.initServicePricingForm();
    this.checkServiceId();
    this.getAllBranchesList();
    this.getAllDurationsList();
    this.getAllServicesTypesList();
    this.getAllNationalitiesList();
    // this.getAllJobsList();
  }

  getPermissions(): void {
    const allowedPermissions = this._permissionsService.getPermissions('ServicesPricing');
    this.addPermission = allowedPermissions.addPermission;
    if (!this.addPermission && !this.serviceId) this._router.navigate(['/Services-Pricing/view']);
    this.editPermission = allowedPermissions.editPermission;
    if (!this.editPermission && this.serviceId) this._router.navigate(['/Services-Pricing/view']);
  }

  initServicePricingForm(): void {
    this.servicePricingForm = this._formBuilder.group({
      typeOfServiceId: [null, Validators.required],
      isActive: [this.serviceDetails?.isActive ? this.serviceDetails?.isActive : true, Validators.required],
      details: this._formBuilder.array([], Validators.required),
    });

  }

  get details(): FormArray {
    return this.servicePricingForm.get('details') as FormArray;
  }

  detailFormGroup(): FormGroup {
    return this._formBuilder.group({
      id: [null],
      companyBranchId: [null, Validators.required],
      durationOfServiceId: [null, Validators.required],
      nationalityId: [null, Validators.required],
      price: [null, Validators.required],
      workerCount: [null],
      tax: [null],
      discount: [null],
      total: [null, Validators.required],
    })
  }

  addDetail(): void {
    this.details.push(this.detailFormGroup());
  }

  removeDetail(i: number): void {
    this.details.removeAt(i);
  }

  checkServiceId(): void {
    this._activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.serviceId = params['id'];
        this.getServiceDetails();
      }
      if (!this.serviceId) {
        this.addDetail();
      }
    });
    this.getPermissions();
  }

  getServiceDetails(): void {
    this._basicService
      .getById(ENDPOINT.SERVICES_PRICING, this.serviceId)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(
        (res) => {
          this.serviceDetails = res.data;
          this.patchFormValues();
        }
      );
  }

  patchFormValues(): void {
    this.serviceDetails?.details?.forEach((detail) => {
      detail.durationOfServiceId = Number(detail.durationOfServiceId);
      detail.discount = detail.descount;
      this.addDetail();
    });
    this.servicePricingForm.patchValue(this.serviceDetails);
  }

  getAllDurationsList(): void {
    this.durationLoading = true;
    this._basicService
      .getlist(ENDPOINT.SERVICES_DURATION, {})
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(
        (res) => {
          this.durationsList = res;
          this.durationLoading = false;
        },
        (err) => {
          this.durationLoading = false;
        }
      );
  }

  getAllServicesTypesList(): void {
    this.servicesTypesLoading = true;
    this._basicService
      .getAll(ENDPOINT.SERVICES, this.servicesTypesFilterCriteria)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(
        (res) => {
          this.servicesTypesList = [... this.servicesTypesList, ...res.data.listData];
          this.servicesTypesLoading = false;
          if(this.serviceId) {
            this.servicePricingForm.controls['typeOfServiceId'].patchValue(this.serviceDetails?.typeOfServiceId);
          }
        },
        (err) => {
          this.servicesTypesLoading = false;
        }
      );
  }

  onServiceTypesSearch(searchTerm: any): void {
    if (searchTerm?.term?.trim().length > 2) {
      this.servicesTypesList = [];
      this.servicesTypesFilterCriteria.page = 1;
      this.servicesTypesFilterCriteria.search = searchTerm?.term?.trim();
      this.getAllServicesTypesList();
    }
  }

  onClearServicesTypes(ev: any): void {
    this.servicesTypesList = [];
    this.servicesTypesFilterCriteria.page = 1;
    this.servicesTypesFilterCriteria.search = '';
    this.getAllServicesTypesList();
  }

  onServiceTypesScroll({ end }): void {
    if (end + this.numberOfItemsFromEnd >= this.servicesTypesList?.length) {
      this.getAllServicesTypesList();
    }
  }

  onServiceTypesScrollToEnd(): void {
    this.servicesTypesFilterCriteria.page++;
    this.getAllServicesTypesList();
  }

  getAllBranchesList(): void {
    this.branchesLoading = true;
    this._basicService
      .getAll(ENDPOINT.COMPANY_BRANCHES, this.branchesFilterCriteria)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(
        (res) => {
          this.branchesList = [...this.branchesList, ...res.data.listData];
          this.branchesLoading = false;
        },
        (err) => {
          this.branchesLoading = false;
        }
      );
  }

  onBranchesSearch(searchTerm: any): void {
    if (searchTerm?.term?.trim().length > 2) {
      this.branchesList = [];
      this.branchesFilterCriteria.page = 1;
      this.branchesFilterCriteria.search = searchTerm?.term?.trim();
      this.getAllBranchesList();
    }
  }

  onClearBranches(ev: any): void {
    this.branchesList = [];
    this.branchesFilterCriteria.page = 1;
    this.branchesFilterCriteria.search = '';
    this.getAllBranchesList();
  }

  onBranchesScroll({ end }): void {
    if (end + this.numberOfItemsFromEnd >= this.branchesList?.length) {
      this.getAllBranchesList();
    }
  }

  onBranchesScrollToEnd(): void {
    this.branchesFilterCriteria.page++;
    this.getAllBranchesList();
  }

  getAllNationalitiesList(): void {
    this.nationalitiesLoading = true;
    this._basicService
      .getAll(ENDPOINT.NATIONALITY, this.nationalitiesFilterCriteria)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(
        (res) => {
          this.nationalitiesList = [...this.nationalitiesList, ...res.data.listData];
          this.nationalitiesLoading = false;
        },
        (err) => {
          this.nationalitiesLoading = false;
        }
      );
  }

  onNationalitiesSearch(searchTerm: any): void {
    if (searchTerm?.term?.trim().length > 2) {
      this.nationalitiesList = [];
      this.nationalitiesFilterCriteria.page = 1;
      this.nationalitiesFilterCriteria.search = searchTerm?.term?.trim();
      this.getAllNationalitiesList();
    }
  }

  onClearNationalities(ev: any): void {
    this.nationalitiesList = [];
    this.nationalitiesFilterCriteria.page = 1;
    this.nationalitiesFilterCriteria.search = '';
    this.getAllNationalitiesList();
  }

  onNationalitiesScroll({ end }): void {
    if (end + this.numberOfItemsFromEnd >= this.nationalitiesList?.length) {
      this.getAllNationalitiesList();
    }
  }

  onNationalitiesScrollToEnd(): void {
    this.nationalitiesFilterCriteria.page++;
    this.getAllNationalitiesList();
  }
  
  // getAllJobsList(): void {
  //   this.jobsLoading = true;
  //   this._basicService
  //     .getAll(ENDPOINT.JOB, this.jobsFilterCriteria)
  //     .pipe(takeUntilDestroyed(this._destroyRef))
  //     .subscribe(
  //       (res) => {
  //         this.jobsList = [...this.jobsList, ...res.data.listData];
  //         this.jobsLoading = false;
  //       },
  //       (err) => {
  //         this.jobsLoading = false;
  //       }
  //     );
  // }

  // onJobsSearch(searchTerm: any): void {
  //   if (searchTerm?.term?.trim().length > 2) {
  //     this.jobsList = [];
  //     this.jobsFilterCriteria.page = 1;
  //     this.jobsFilterCriteria.search = searchTerm?.term?.trim();
  //     this.getAllJobsList();
  //   }
  // }

  // onClearJobs(ev: any): void {
  //   this.jobsList = [];
  //   this.jobsFilterCriteria.page = 1;
  //   this.jobsFilterCriteria.search = '';
  //   this.getAllJobsList();
  // }

  // onJobsScroll({ end }): void {
  //   if (end + this.numberOfItemsFromEnd >= this.jobsList?.length) {
  //     this.getAllJobsList();
  //   }
  // }

  // onJobsScrollToEnd(): void {
  //   this.jobsFilterCriteria.page++;
  //   this.getAllJobsList();
  // }

  addEditServicePricingSubmit(): void {
    let body = {
      ...this.servicePricingForm.value,
      details: this.servicePricingForm.value.details.map((detail) => {
        return {
          id: detail.id,
          companyBranchId: detail.companyBranchId,
          durationOfServiceId: detail.durationOfServiceId.toString(),
          nationalityId: detail.nationalityId,
          price: detail.price,
          tax: detail.tax,
          descount: detail.discount,
          workerCount: detail.workerCount
        };
      }),
    }

    if (!this.serviceId) {
      this.addServicePricing(body);
    } else {
      this.updateServicePricing(body);
    }

  }

  addServicePricing(body): void {
    this._basicService
      .add(ENDPOINT.SERVICES_PRICING, body)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe((response: any) => {
        this.showAddServicePricing();
      });
  }

  updateServicePricing(body): void {
    this._basicService
      .update(ENDPOINT.SERVICES_PRICING, this.serviceId, body)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe((response: any) => {
        this.showEditServicePricing();
      });
  }

  showAddServicePricing(): void {
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
            this.clearForm();
          } else if (data.action === 'cancel') {
            this._router.navigate([`Services-Pricing/view`]);
          }
        }
      });
    } else {
      console.error('Dialog could not be opened.');
    }
  }

  showEditServicePricing(): void {
    this.ref = this._dialogService.open(DynamicDialogComponent, {
      width: '30vw',
      height: 'auto',
      data: {
        title: 'dynamicDialog.Congratulations',
        description: 'dynamicDialog.edit_service',
        actionText: 'dynamicDialog.show_service_btn',
        image: 'assets/images/ui/Done.gif',
      },
    });

    if (this.ref) {
      this.ref.onClose.subscribe((data) => {
        if (data) {
          if (data.action === 'action') {
            this._router.navigate([`Services-Pricing/view`]);
          }
        }
      });
    } else {
      console.error('Dialog could not be opened.');
    }
  }

  clearForm(): void {
    // this.servicePricingForm.reset();
    this.initServicePricingForm();
    this.addDetail();
  }

  cancelServicePricing(): void {
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
            this._router.navigate([`Services-Pricing/view`]);
          } else if (data.action === 'cancel') {
          }
        }
      });
    } else {
      console.error('Dialog could not be opened.');
    }
  }

  getTotalValue(i: number): number {
    let total = 0;
    let formVal = this.servicePricingForm.value.details[i];
    let price = formVal?.price;
    let tax = formVal?.tax;
    let discount = formVal?.discount;
    if (discount > price) {
      return;
    }
    if (price) {
      total = price;
    }
    if (tax) {
      total += tax;
    }
    if (discount) {
      total -= discount;
    }
    this.details.controls[i].get('total').patchValue(total);
    return total;
  }


}
