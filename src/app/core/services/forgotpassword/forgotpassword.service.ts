import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Env } from '../../../core/Environment/environment';
@Injectable({
  providedIn: 'root',
})
export class ForgotpasswordService {
  private httpClient = inject(HttpClient);
  constructor() {}

  forgotPassword(userEmail: object): Observable<any> {
    return this.httpClient.post(
      `${Env.baseURL}/api/v1/auth/forgotPasswords`,
      userEmail
    );
  }

  resetCode(resetCode: object): Observable<any> {
    return this.httpClient.post(
      `${Env.baseURL}/api/v1/auth/verifyResetCode`,
      resetCode
    );
  }

  resetPassword(resetPassword: object): Observable<any> {
    return this.httpClient.put(
      `${Env.baseURL}/api/v1/users/changeMyPassword`,
      resetPassword
    );
  }
}
