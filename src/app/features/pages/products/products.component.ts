import { IProduct } from './../../../shared/Interface/products';

import { Component, OnInit, Renderer2, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProductService } from '../../../core/services/ecomm/product/product.service';
import { CuttextPipe } from '../../../core/pipe/cuttext.pipe';
import { CartserviceService } from '../../../shared/Interface/cartservice.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterLink, CuttextPipe, NgxPaginationModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  constructor(
    private _ProductService: ProductService,
    private _CartService: CartserviceService,
    private _Renderer2: Renderer2,
    private _ToastrService: ToastrService
  ) {}
  paginatedProducts: IProduct[] = [];
  products = signal<IProduct[]>([]);
  pageSize = 6;
  curentPage = 1;
  total = 0;

  updatePaginatedProducts(): void {
    const start = (this.curentPage - 1) * this.pageSize;
    this.paginatedProducts = this.products().slice(
      start,
      start + this.pageSize
    );
  }

  ngOnInit(): void {
    this._ProductService.getAllProducts().subscribe({
      next: (response) => {
        this.products.set(response.data);
        this.total = response.results;
        this.updatePaginatedProducts();
      },
    });
  }

  addProduct(id: string, element: HTMLButtonElement): void {
    this._Renderer2.setAttribute(element, 'disabled', 'true');

    this._CartService.addToCart(id).subscribe({
      next: (response) => {
        this._ToastrService.success(response.message);
        this._Renderer2.removeAttribute(element, 'disabled');
        this._CartService.cartNumber.next(response.numOfCartItems);
      },
      error: () => {
        this._Renderer2.removeAttribute(element, 'disabled');
      },
    });
  }

  pageChanged(event: number): void {
    this.curentPage = event;
  }
}
