// import { AuthService } from '@data/services/auth.service';
import { NgIf } from '@angular/common';
import { Component, DestroyRef, inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    FormsModule,
    NgForm,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router, RouterLink } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertComponent, FuseAlertType } from '@fuse/components/alert';
import { TranslocoModule } from '@ngneat/transloco';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { AuthForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { AuthService } from 'app/core/services/auth/auth.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';
import { BasicServicesService } from 'app/core/services/Basic-services/basic-services.service';
import { ENDPOINT } from 'app/core/enums/endPoints.enum';

@Component({
    selector: 'auth-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrl: './sign-in.component.scss',
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
    standalone: true,
    imports: [
        RouterLink,
        TranslocoModule,
        FuseAlertComponent,
        NgIf,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        CheckboxModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatCheckboxModule,
        MatProgressSpinnerModule,
        FormsModule,
        DynamicDialogModule,
        ButtonModule
    ],
    providers: [DialogService],
})
export class AuthSignInComponent implements OnInit {
    private _formBuilder = inject(FormBuilder);
    private _authService = inject(AuthService);
    private _basicService = inject(BasicServicesService);
    private _dialogService = inject(DialogService);
    private _router = inject(Router);
    private _destroyRef = inject(DestroyRef);

    @ViewChild('signInNgForm') signInNgForm: NgForm;
    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: '',
    };
    signInForm: FormGroup;
    showAlert: boolean = false;

    ngOnInit(): void {
        this.initForm();
    }

    initForm(): void {
        this.signInForm = this._formBuilder.group({
            email: ['emad.abdou@alnasyan.com', [Validators.required, Validators.email]],
            password: ['', Validators.required],
        });
    }

    signIn(): void {
        this.signInForm.disable();
        this.showAlert = false;
        this._authService
            .login(this.signInForm.value)
            .pipe(
                takeUntilDestroyed(this._destroyRef),
                finalize(() => this.signInForm.enable())
            )
            .subscribe({
                next: (response) => {
                    if (response) {
                        localStorage.setItem(
                            'user',
                            JSON.stringify({ ...response?.data })
                        );
                        localStorage.setItem('accessToken', response?.data?.token);
                        this.getUserPermissions();
                    }
                },
                error: (error) => {
                    this.alert = {
                        type: 'error',
                        message: error?.message,
                    };
                    this.showAlert = true;
                },
            });
    }

    getUserPermissions(): void {
        this._basicService.getWithParams(ENDPOINT.USER_PERMISSION + '/GetRolePermissions', {}).subscribe((response: any) => {
            localStorage.setItem('permissions', JSON.stringify(response?.data));
            this._router.navigateByUrl('/Home');
        })
    }

    forgetPassword(): void {
        this._dialogService.open(
            AuthForgotPasswordComponent,
            {
                header: '',
                width: '28vw',
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
