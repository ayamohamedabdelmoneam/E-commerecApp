import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Env } from '../../../Environment/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WhishlistServiceService {
  private httpClient = inject(HttpClient);
  constructor() {}
  heartNumber: BehaviorSubject<number> = new BehaviorSubject(0);

  addToWhishList(prodId: string | undefined): Observable<any> {
    return this.httpClient.post(`${Env.baseURL}/api/v1/wishlist`, {
      productId: prodId,
    });
  }

  getWhishList(): Observable<any> {
    return this.httpClient.get(`${Env.baseURL}/api/v1/wishlist`);
  }

  removeToWhishList(prodId: string | undefined): Observable<any> {
    return this.httpClient.delete(`${Env.baseURL}/api/v1/wishlist/${prodId}`);
  }
}
