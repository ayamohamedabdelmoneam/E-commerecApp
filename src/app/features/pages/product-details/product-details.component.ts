import { IProduct } from './../../../shared/Interface/products';
import { ProductService } from './../../../core/services/ecomm/product/product.service';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartserviceService } from '../../../shared/Interface/cartservice.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-product-details',
  imports: [CurrencyPipe],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent implements OnInit {
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _ProductService: ProductService,
    private _Renderer2: Renderer2,
    private _CartService: CartserviceService,
    private _ToastrService: ToastrService
  ) {}

  productId: string | null = '';
  pInfo!: IProduct;

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe((p) => {
      this.productId = p.get('id');
      console.log(this.productId);

      this._ProductService.getSpecProducts(this.productId).subscribe({
        next: (res) => {
          console.log(res);
          this.pInfo = res.data;
        },
        error: (err) => {
          console.log(err);
        },
      });
    });
  }

  addProduct(id: any, element: HTMLButtonElement): void {
    this._Renderer2.setAttribute(element, 'disabled', 'true');

    this._CartService.addToCart(id).subscribe({
      next: (response) => {
        console.log(response);
        this._ToastrService.success(response.message);
        this._Renderer2.removeAttribute(element, 'disabled');

        this._CartService.cartNumber.next(response.numOfCartItems);
      },
      error: (err) => {
        console.log(err);
        this._Renderer2.removeAttribute(element, 'disabled');
      },
    });
  }
}
