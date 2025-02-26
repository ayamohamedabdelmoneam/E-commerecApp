import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Env } from '../../core/Environment/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartserviceService {
  private httpClient = inject(HttpClient);
  constructor() {}
  cartNumber: BehaviorSubject<number> = new BehaviorSubject(0);

  addToCart(prodId: string): Observable<any> {
    return this.httpClient.post(`${Env.baseURL}/api/v1/cart`, {
      productId: prodId,
    });
  }

  getCartUser(): Observable<any> {
    return this.httpClient.get(`${Env.baseURL}/api/v1/cart`);
  }

  removeCartItem(prodId: string): Observable<any> {
    return this.httpClient.delete(`${Env.baseURL}/api/v1/cart/${prodId}`);
  }

  updateCartCount(prodId: string, countNum: number): Observable<any> {
    return this.httpClient.put(`${Env.baseURL}/api/v1/cart/${prodId}`, {
      count: countNum,
    });
  }

  clearCart(): Observable<any> {
    return this.httpClient.delete(`${Env.baseURL}/api/v1/cart`);
  }

  checkOut(cartId: string | null, orderInfo: object): Observable<any> {
    return this.httpClient.post(
      `${Env.baseURL}/orders/checkout-session/${cartId}?url=http://localhost:4200`,
      {
        shippingAddress: orderInfo,
      }
    );
  }
}
