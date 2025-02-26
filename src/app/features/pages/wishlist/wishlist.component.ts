import { CuttextPipe } from './../../../core/pipe/cuttext.pipe';
import { WhishlistServiceService } from './../../../core/services/ecomm/whishListService/whishlist-service.service';
import { Component, Renderer2, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';
import { CartserviceService } from '../../../shared/Interface/cartservice.service';
import { IProduct } from '../../../shared/Interface/products';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-wishlist',
  imports: [RouterLink, CuttextPipe, CurrencyPipe],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css',
})
export class WishlistComponent implements OnInit {
  constructor(
    private _WhishlistService: WhishlistServiceService,
    private _ToastrService: ToastrService,
    private _Renderer2: Renderer2,
    private _CartService: CartserviceService
  ) {}

  products: IProduct[] = [];
  wishListData: string[] = [];

  ngOnInit(): void {
    this._WhishlistService.getWhishList().subscribe({
      next: (response) => {
        console.log(response);
        this.products = response.data;
        const newData = response.data.map((item: any) => item._id);
        this.wishListData = newData;
      },
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
        this._Renderer2.removeAttribute(element, 'disabled');
      },
    });
  }

  addHeart(prodId: string | undefined): void {
    this._WhishlistService.addToWhishList(prodId).subscribe({
      next: (response) => {
        console.log(response);
        this._ToastrService.success(response.message);
        this.wishListData = response.data;
      },
    });
  }

  removeHeart(prodId: string | undefined): void {
    this._WhishlistService.removeToWhishList(prodId).subscribe({
      next: (response) => {
        console.log(response);
        this._ToastrService.success(response.message);
        this.wishListData = response.data;
        this._WhishlistService.heartNumber.next(response.data.length);

        // this._WhishlistService.getWhishList().subscribe({
        //   next: (response) => {
        //     this.products = response.data;
        //   }
        // })

        const newProductsData = this.products.filter((item: any) =>
          this.wishListData.includes(item._id)
        );
        this.products = newProductsData;
      },
    });
  }
}
