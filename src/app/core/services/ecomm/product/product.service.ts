import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Env } from '../../../Environment/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private httpClient: HttpClient) {}
  // 2 Method => getAll
  getAllProducts(): Observable<any> {
    return this.httpClient.get(`${Env.baseURL}/api/v1/products`);
  }
  getSpecProducts(pId: string | null): Observable<any> {
    return this.httpClient.get(`${Env.baseURL}/api/v1/products/ ${pId}`);
  }
  getCategories(): Observable<any> {
    return this.httpClient.get(`${Env.baseURL}/api/v1/categories`);
  }

  getCategoryDetails(id: string | null): Observable<any> {
    return this.httpClient.get(`${Env.baseURL}/api/v1/categories/${id}`);
  }

  getBrands(): Observable<any> {
    return this.httpClient.get(`${Env.baseURL}/api/v1/brands`);
  }

  getBrandsDetails(id: string | null): Observable<any> {
    return this.httpClient.get(`${Env.baseURL}/api/v1/brands/${id}`);
  }
}
