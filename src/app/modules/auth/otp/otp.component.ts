import { NgIf } from '@angular/common';
import {
    Component,
    inject,
    Input,
    OnInit,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import {
    FormsModule,
    NgForm,
    ReactiveFormsModule,
    UntypedFormBuilder,
    FormGroup,
    Validators,
    FormBuilder,
    FormControl,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterLink } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertComponent, FuseAlertType } from '@fuse/components/alert';
import { TranslocoModule } from '@ngneat/transloco';
import {
    DialogService,
    DynamicDialogConfig,
    DynamicDialogRef,
} from 'primeng/dynamicdialog';
// import { AuthService } from 'app/core/auth/auth.service';
import { ButtonModule } from 'primeng/button';
import { NgOtpInputModule } from 'ng-otp-input';
import { AuthResetPasswordComponent } from '../reset-password/reset-password.component';
import { AuthService } from 'app/core/services/auth/auth.service';
import { finalize } from 'rxjs';

@Component({
    selector: 'app-otp',
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
        TranslocoModule,
        NgOtpInputModule,
    ],
    templateUrl: './otp.component.html',
})
export class OtpComponent  {
    private _formBuilder = inject(FormBuilder);
    private _dialogService = inject(DialogService);
    private _ref = inject(DynamicDialogRef);
    private _authService = inject(AuthService);
    private dialogConfig = inject(DynamicDialogConfig);
    email = this.dialogConfig.data.email
    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: '',
    };

    showAlert: boolean = false;
    code = new FormControl('', [Validators.required]);



    onSubmit(): void {
        if (this.code.invalid) {
            return;
        }
        this.code.disable();
        this.showAlert = false;
        this._authService
            .checkOTP({
                email: this.email,
                code: this.code.value,
            })
            .pipe(
                finalize(() => {
                    this.code.enable();
                    this.code.reset();
                    this.showAlert = true;
                })
            )
            .subscribe({
                next: (response) => {
                    if (response) {
                        this._ref.close();
                        this.openResetPassword();
                    }
                },
                error: (error) => {
                    this.alert = {
                        type: 'error',
                        message: error?.error?.message,
                    };
                },
            });
    }

    openResetPassword(): void {
        this._dialogService.open(AuthResetPasswordComponent, {
            header: '',
            width: '28vw',
            modal: true,
            breakpoints: {
                '960px': '75vw',
                '640px': '90vw',
            },
            data: { email:  this.email },
            closeOnEscape: true,
        });
    }

    goToSignIn(): void {
        this._ref.close();
    }
}
