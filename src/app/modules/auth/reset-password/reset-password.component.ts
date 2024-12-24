import { NgIf } from '@angular/common';
import { Component, inject, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterLink } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertComponent, FuseAlertType } from '@fuse/components/alert';
import { FuseValidators } from '@fuse/validators';
import { TranslocoModule } from '@ngneat/transloco';
import { ButtonModule } from 'primeng/button';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CongratulationsLoginComponent } from '../congratulations-login/congratulations-login.component';
import { AuthService } from 'app/core/services/auth/auth.service';
import { finalize } from 'rxjs';

@Component({
    selector: 'auth-reset-password',
    templateUrl: './reset-password.component.html',
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
export class AuthResetPasswordComponent implements OnInit {

    private _formBuilder = inject(FormBuilder);
    private _dialogService = inject(DialogService);
    private _ref = inject(DynamicDialogRef);
    private _authService = inject(AuthService);
    private dialogConfig = inject(DynamicDialogConfig);
    email = this.dialogConfig.data.email

    @ViewChild('resetPasswordNgForm') resetPasswordNgForm: NgForm;

    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: '',
    };
    resetPasswordForm: FormGroup;
    showAlert: boolean = false;


    ngOnInit(): void {
        this.initForm();
    }

    initForm(): void {
        this.resetPasswordForm = this._formBuilder.group({
            password: ['', Validators.required],
            confirmPassword: ['', Validators.required],
        },
            {
                validators: FuseValidators.mustMatch('password', 'confirmPassword'),
            },
        );
    }

    resetPassword(): void {
        if (this.resetPasswordForm.invalid) {
            return;
        }

        this.resetPasswordForm.disable();
        this.showAlert = false;

        this._authService.resetPassword({
            email: this.email,
            ...this.resetPasswordForm.value
        })
            .pipe(
                finalize(() => {
                    this.resetPasswordForm.enable();
                    this.resetPasswordNgForm.resetForm();
                    this.showAlert = true;
                }),
            )
            .subscribe(
              {
                  next: (response) => {
                      if (response) {
                          this._ref.close();
                          this.openSuccessModal();
                      }
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

    openSuccessModal(): void {
        this._dialogService.open(
            CongratulationsLoginComponent,
            {
                header: '',
                width: '28vw',
                height: '38vw',
                modal: true,
                breakpoints: {
                    '960px': '75vw',
                    '640px': '90vw'
                },
                closeOnEscape: true
            }
        )
    }

}
