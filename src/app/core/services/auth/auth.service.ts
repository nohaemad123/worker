import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ENDPOINT } from 'app/core/enums/endPoints.enum';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private ENDPOINT = ENDPOINT;
  private http = inject(HttpClient);

  login(userData: any): Observable<any> {
    return this.http.post(ENDPOINT.MAIN_HOST + this.ENDPOINT.AUTH.LOGIN, userData);
  }

  forgetPassword(email: string): Observable<any> {
    return this.http.post(ENDPOINT.MAIN_HOST + this.ENDPOINT.AUTH.FORGOT, { email });
  }

  checkOTP(otpData: any): Observable<any> {
    return this.http.post(ENDPOINT.MAIN_HOST + this.ENDPOINT.AUTH.CHECK_OTP, otpData);
  }

  resetPassword(passwordData: any): Observable<any> {
    return this.http.post(ENDPOINT.MAIN_HOST + this.ENDPOINT.AUTH.RESET, passwordData);
  }
  
}
