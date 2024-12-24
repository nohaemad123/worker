import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ENDPOINT } from 'app/core/enums/endPoints.enum';
import { BasicServicesService } from 'app/core/services/Basic-services/basic-services.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DynamicDialogComponent } from '@shared/components/dynamic-dialog/dynamic-dialog.component';

@Component({
    selector: 'app-add-edit-offer',
    templateUrl: './add-edit-offer.component.html',
    styleUrl: './add-edit-offer.component.scss'
})
export class AddEditOfferComponent implements OnInit {

    private _formBuilder = inject(FormBuilder);
    private _activatedRoute = inject(ActivatedRoute);
    private _destroyRef = inject(DestroyRef);
    private _basicService = inject(BasicServicesService);
    private _router = inject(Router);
    private _dialogService = inject(DialogService);

    offerForm!: FormGroup;
    offerId: any;
    isEdit: boolean = false;
    ENDPOINT;
    ref: DynamicDialogRef;
    offerData: any;

    nationalitiesFilterCriteria = {
        page: 1,
        pageSize: 1000,
        search: null,
        readDto: {
            name: null,
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

    shiftsFilterCriteria = {
        page: 1,
        pageSize: 1000,
        search: null,
        readDto: {
            name: null,
        },
        selectColumns: [
            'id',
            'name'
        ],
        sortColumn: '',
        sortColumnDirection: 'asc',
    };
    shiftsList: any[] = [];
    shiftsLoading = false;
    numberOfItemsFromEnd = 5;


    ngOnInit(): void {
        this.initOfferForm();
        this.checkOfferId();
        this.getAllNationalitiesList();
        this.getAllShiftsList();
        this.offerForm.controls['from_date'].setValue(
            new Date().toISOString().split('T')[0]
        );
        this.offerForm.controls['to_date'].setValue(
            new Date().toISOString().split('T')[0]
        );
    }

    initOfferForm(): void {
        this.offerForm = this._formBuilder.group({
            nameAr: ['', Validators.required],
            nameEn: [''],
            discount: ['', Validators.required],
            cost: ['', Validators.required],
            from_date: [null, Validators.required],
            to_date: [null, Validators.required],
            nationality: [null, Validators.required],
            shift: ['', Validators.required],
        });
    }

    getAllNationalitiesList(): void {
        this.nationalitiesLoading = true;
        this._basicService
            .getAll(ENDPOINT.NATIONALITY, this.nationalitiesFilterCriteria)
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe(
                (res) => {
                    this.nationalitiesList = res.data.listData;
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

    getAllShiftsList(): void {
        this.shiftsLoading = true;
        this._basicService
            .getAll(ENDPOINT.SHIFTS, this.shiftsFilterCriteria)
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe(
                (res) => {
                    this.shiftsList = res.data.listData;
                    this.shiftsLoading = false;
                },
                (err) => {
                    this.shiftsLoading = false;
                }
            );
    }

    onShiftsSearch(searchTerm: any): void {
        if (searchTerm?.term?.trim().length > 2) {
            this.shiftsList = [];
            this.shiftsFilterCriteria.page = 1;
            this.shiftsFilterCriteria.search = searchTerm?.term?.trim();
            this.getAllShiftsList();
        }
    }

    onClearShifts(ev: any): void {
        this.shiftsList = [];
        this.shiftsFilterCriteria.page = 1;
        this.shiftsFilterCriteria.search = '';
        this.getAllShiftsList();
    }

    onShiftsScroll({ end }): void {
        if (end + this.numberOfItemsFromEnd >= this.shiftsList?.length) {
            this.getAllShiftsList();
        }
    }

    onShiftsScrollToEnd(): void {
        this.shiftsFilterCriteria.page++;
        this.getAllShiftsList();
    }


    checkOfferId(): void {
        this._activatedRoute.params.subscribe((params) => {
            if (params['id']) {
                this.offerId = params['id'];
                this.isEdit = true;
                this.getOfferDetails();
            }
        });
    }

    clearForm(): void {
        this.offerForm.reset();
    }

    showAddOffer() {
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
                        this._router.navigate([`Offers/view`]);
                    }
                }
            });
        } else {
            console.error('Dialog could not be opened.');
        }
    }

    showEditOffer(): void {
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
                        this._router.navigate([`Offers/view`]);
                        // } else if (data.action === 'cancel') {
                        //     this._router.navigate([`Companies/view`]);
                    }
                }
            });
        } else {
            console.error('Dialog could not be opened.');
        }
    }

    cancelOffer(): void {
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
                        this._router.navigate([`Offers/view`]);
                    } else if (data.action === 'cancel') {
                    }
                }
            });
        } else {
            console.error('Dialog could not be opened.');
        }
    }

    getOfferDetails(): void {
        this._basicService
            .getById(ENDPOINT.COMPANY, this.offerId)
            .subscribe((response: any) => {
                this.offerForm.patchValue(response.data);
            });
    }

    addEditOfferSubmit(): void {
        if (!this.isEdit) {
            this.addOffer();
        } else {
            this.updateOffer();
        }
    }

    addOffer(): void {
        this._basicService
            .add(ENDPOINT.COMPANY, this.offerForm.value)
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe((response: any) => {
                this.showAddOffer();
            });
    }

    updateOffer(): void {
        this._basicService
            .update(ENDPOINT.COMPANY, this.offerId, this.offerForm.value)
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe((response: any) => {
                this.showEditOffer();
            });
    }
}
