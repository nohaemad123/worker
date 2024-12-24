import { AsyncPipe, JsonPipe, NgIf } from '@angular/common';
import { Component, DestroyRef, ViewEncapsulation, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, UntypedFormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router, RouterLink } from '@angular/router';
import { FuseAlertComponent, FuseAlertType } from '@fuse/components/alert';
import { TranslocoModule, TranslocoService } from '@ngneat/transloco';
import { Patterns } from '@shared/services/pattern';
import { Validators as passwordMatch } from '@shared/services/validators/validators';
import { finalize } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
    selector     : 'landing-home',
    templateUrl  : './home.component.html',
    encapsulation: ViewEncapsulation.None,
    standalone   : true,
    imports: [MatButtonModule,FuseAlertComponent, AsyncPipe,JsonPipe , NgIf, RouterLink, MatIconModule, FormsModule, ReactiveFormsModule,MatInputModule, MatFormFieldModule,MatProgressSpinnerModule,TranslocoModule],
})
export class LandingHomeComponent
{
    // injection
    _formBuilder = inject(FormBuilder);
    _translocoService = inject(TranslocoService);
    // _authServices = inject(AuthService);
    _router = inject(Router)

    // props
    passwordPattern = Patterns.passwordPattern;
    alert: { type: FuseAlertType; message: string } = {
        type   : 'success',
        message: '',
    };
    signUpForm: UntypedFormGroup;
    showAlert: boolean = false;
    _currentLang = this._translocoService.langChanges$;
    destroyRef = inject(DestroyRef);

    constructor()
    {

    }

     /**
     * On init
     */
     ngOnInit(): void
     {
         // Create the form
         this.signUpForm = this._formBuilder.group({
                name      : ['', Validators.required],
                username  : ['', Validators.required],
                email    : ['', [Validators.required, Validators.email]],
                phone : ['',Validators.required],
                password   : ['', [Validators.required,Validators.minLength(6)]],
                confirmPassword: ['', Validators.required],
            },
            {
                validator: passwordMatch.mustMatch('password', 'confirmPassword')
            }
        );
    }


    signUp(){
        // this.signUpForm.disable();
        // this.showAlert = false;
        // this._authServices.register(this.signUpForm.value)
        // .pipe(takeUntilDestroyed(this.destroyRef), finalize(() => this.signUpForm.enable()))
        // .subscribe({
        //     next: (response) => {
        //         if (response) {
        //             localStorage.setItem('user',JSON.stringify(response))
        //               this._router.navigate(['/asd/example']);
        //         }
        //       },
        //       error: (error) => {
        //         this.alert = {
        //             type:'error',
        //             message: error?.error?.message
        //             };
        //         this.showAlert = true
        //         }
        //     })
    }
}
