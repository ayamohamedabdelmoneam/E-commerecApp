import { PlatformService } from './../PlatForm/platform.service';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { Env } from '../../Environment/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private platformService = inject(PlatformService);
  userData: BehaviorSubject<any> = new BehaviorSubject(null);
  constructor() {
    if (this.platformService.checkPlatForm()) {
      this.getUserData;
    }
  }
  getUserData() {
    throw new Error('Method not implemented.');
  }
  sendRegisterToApi(data: object): Observable<any> {
    return this.http.post(`${Env.baseURL}/api/v1/auth/signup`, data);
  }
  sendLoginToApi(data: object): Observable<any> {
    return this.http.post(`${Env.baseURL}/api/v1/auth/signin`, data);
  }
  saveData() {
    this.userData.next(
      jwtDecode(JSON.stringify(localStorage.getItem('userToken')))
    );
  }
}
