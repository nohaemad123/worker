import { NgIf } from '@angular/common';
import { Component, inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule, UntypedFormBuilder, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterLink } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertComponent, FuseAlertType } from '@fuse/components/alert';
import { TranslocoModule, TranslocoService } from '@ngneat/transloco';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ButtonModule } from 'primeng/button';
import { OtpComponent } from '../otp/otp.component';
import { AuthService } from 'app/core/services/auth/auth.service';
import { finalize } from 'rxjs';

@Component({
    selector: 'auth-forgot-password',
    templateUrl: './forgot-password.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
    standalone: true,
    imports: [
        NgIf,
        FuseAlertComponent,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatProgressSpinnerModule,
        RouterLink,
        ButtonModule,
        TranslocoModule
    ],
})
export class AuthForgotPasswordComponent implements OnInit {

    private _formBuilder = inject(FormBuilder);
    private _dialogService = inject(DialogService);
    private _ref = inject(DynamicDialogRef);
    private _authService = inject(AuthService);
    private _translocoService = inject(TranslocoService);

    @ViewChild('forgotPasswordNgForm') forgotPasswordNgForm: NgForm;

    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: '',
    };
    forgotPasswordForm: FormGroup;
    showAlert: boolean = false;

    ngOnInit(): void {
        this.initForm();
    }

    initForm(): void {
        this.forgotPasswordForm = this._formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
        });
    }


    onSubmit(): void {
        if (this.forgotPasswordForm.invalid) {
            return;
        }
        this.forgotPasswordForm.disable();

        this.showAlert = false;

        this._authService.forgetPassword(this.forgotPasswordForm.get('email').value)
            .pipe(
                finalize(() => {
                    this.forgotPasswordForm.enable();
                    this.forgotPasswordNgForm.resetForm();
                    this.showAlert = true;
                }),
            )
            .subscribe(
               {
                   next: (response) => {
                       this.alert = {
                           type: 'success',
                           message: this._translocoService.translate('auth.form.messages.code_sent_success'),
                       };
                       this._ref.close();
                       this.openOTP();
                   },
                   error: (error) => {
                       this.alert = {
                           type: 'error',
                           message: error?.error?.message
                       };
                   }
               }
            );

    }

    openOTP(): void {
        this._dialogService.open(
            OtpComponent,
            {
                header: '',
                width: '28vw',
                modal: true,
                breakpoints: {
                    '960px': '75vw',
                    '640px': '90vw'
                },
                data: { email: this.forgotPasswordForm.get('email').value },
                closeOnEscape: true
            }
        )
    }

    goToSignIn(): void {
        this._ref.close();
    }

}
