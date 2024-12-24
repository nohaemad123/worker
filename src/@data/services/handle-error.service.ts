import { Injectable, inject } from '@angular/core';

import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HandleErrorService {

  // _toastrService=inject(ToastrService);
  constructor() { }

  handleError(error: any): Observable<never>{
    // this._toastrService.error("error",error.error.ResponseMessage,
    // { toastClass: 'toast ngx-toastr', closeButton: true });
    // console.error('An error occurred:', error);



  // Customize error handling

  const errorMessage = error.error ? error.error.ResponseMessage : 'Something went wrong.';
  return throwError(errorMessage);
  }
}
