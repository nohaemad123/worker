import {
    HttpErrorResponse,
    HttpEventType,
    HttpInterceptorFn,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastService } from '@shared/services/error/toaster.service';
import { catchError, tap, throwError } from 'rxjs';

export const errorInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
    const toastr = inject(ToastService);

    return next(req).pipe(
        catchError((error: HttpErrorResponse) => {
            let errorMessage = '';
            if (error.error instanceof ErrorEvent) {
                // client-side error
                errorMessage = error.error.message;
            } else {
                // server-side error
                errorMessage = error.error.message;
            }

            return throwError(
                toastr.showMassage('error', 'خطأ', errorMessage)
            );
        })
    );
};
