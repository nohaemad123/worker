import { NgIf } from '@angular/common';
import { Component, DestroyRef, OnInit, ViewChild, ViewEncapsulation, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormsModule, NgForm, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router, RouterLink } from '@angular/router';
// import { AuthService } from '@data/services/auth.service';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertComponent, FuseAlertType } from '@fuse/components/alert';
import { TranslocoModule } from '@ngneat/transloco';
import { ToastService } from '@shared/services/error/toaster.service';
import { CountryISO, NgxIntlTelInputModule, PhoneNumberFormat, SearchCountryField } from 'ngx-intl-tel-input';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';

@Component({
    selector: 'auth-sign-up',
    templateUrl: './sign-up.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
    standalone: true,
    imports: [RouterLink,
        TranslocoModule,
        FuseAlertComponent,
        NgIf,
        NgxIntlTelInputModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatCheckboxModule,
        MatButtonModule,
        MatIconModule,
        DropdownModule,
        InputTextModule,
        PasswordModule,
        ToastModule,
        MatProgressSpinnerModule],
    styleUrl: './sign-up.component.scss'
})
export class AuthSignUpComponent implements OnInit {

    private _toasterService = inject(ToastService);
    // private _authService = inject(AuthService);
    private _formBuilder = inject(FormBuilder);
    private _router = inject(Router);
    private _destroyRef = inject(DestroyRef);

    @ViewChild('signUpNgForm') signUpNgForm: NgForm;
    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: '',
    };
    signUpForm: UntypedFormGroup;
    showAlert: boolean = false;
    separateDialCode = false;
    SearchCountryField = SearchCountryField;
    CountryISO = CountryISO;
    PhoneNumberFormat = PhoneNumberFormat;
    preferredCountries: CountryISO[] = [
        CountryISO.UnitedStates,
        CountryISO.UnitedKingdom,
    ];
    hostname = window.location.host

    ngOnInit(): void {
        this.initRegisterForm();
    }

    initRegisterForm(): void {
        this.signUpForm = this._formBuilder.group({
            name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
            username: ['', Validators.required],
            phone: ['', Validators.required],
            confirmPassword: ['', Validators.required],
        },
        );
    }

    signUp(): void {
        // let body = {
        //     ...this.signUpForm.value,
        //     phone: this.signUpForm.value.phone?.number,
        //     phoneNumberCountryId: this.signUpForm.value.phone?.countryCode,

        // };
        // this.signUpForm.disable();
        // this.showAlert = false;
        // this._authService
        //     .register(body)
        //     .pipe(takeUntilDestroyed(this._destroyRef))
        //     .subscribe({
        //         next: (response) => {
        //             this._toasterService.showMassage(
        //                 'success',
        //                 'Success',
        //                 'تم تسجيل حساب جديد بنجاح'
        //             );
        //             this._router.navigate(['/Sign-In']);
        //         },
        //         error: (error) => {
        //             this.alert = {
        //                 type: 'error',
        //                 message: error?.error?.Message,
        //             };
        //             this.signUpForm.enable();
        //             this.showAlert = true;
        //         }
        //     });
    }

}
