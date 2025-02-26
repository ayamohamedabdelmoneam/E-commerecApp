import { WhishlistServiceService } from './../../../core/services/ecomm/whishListService/whishlist-service.service';
import { Component, OnInit, Renderer2, inject } from '@angular/core';
import { Category } from '../../../shared/Interface/Category';
import { IProduct } from '../../../shared/Interface/products';
import { ProductService } from './../../../core/services/ecomm/product/product.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { CartserviceService } from '../../../shared/Interface/cartservice.service';
import { RouterLink } from '@angular/router';
import { CuttextPipe } from '../../../core/pipe/cuttext.pipe';
import { CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../../core/pipe/search.pipe';

@Component({
  selector: 'app-home',

  imports: [
    CarouselModule,
    RouterLink,
    CuttextPipe,
    CurrencyPipe,
    SearchPipe,
    FormsModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  allProducts: IProduct[] = [];
  catgories: Category[] = [];
  term: string = '';
  wishListData: string[] = [];

  private productService = inject(ProductService);
  private whishlistService = inject(WhishlistServiceService);
  private toastrService = inject(ToastrService);
  private cartService = inject(CartserviceService);

  customeMainSlider: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    items: 1,
    nav: true,
  };
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    autoplay: true,
    autoplayTimeout: 3000,

    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 6,
      },
    },
    nav: false,
  };
  constructor(private renderer: Renderer2) {}
  ngOnInit(): void {
    this.getAllProductsHome();
    this.getCategory();
    this.getWishList();
  }
  getAllProductsHome() {
    this.productService.getAllProducts().subscribe({
      next: (res) => {
        this.allProducts = res.data;
        console.log(res.data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  getCategory() {
    this.productService.getCategories().subscribe({
      next: (res) => {
        console.log(res);
        this.catgories = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  getWishList() {
    this.whishlistService.getWhishList().subscribe({
      next: (res) => {
        const newData = res.data.map((item: any) => item._id);
        this.wishListData = newData;
      },
    });
  }
  addProduct(id: any, element: HTMLButtonElement): void {
    this.renderer.setAttribute(element, 'disabled', 'true');

    this.cartService.addToCart(id).subscribe({
      next: (response) => {
        console.log(response);
        this.toastrService.success(response.message);
        this.renderer.removeAttribute(element, 'disabled');

        this.cartService.cartNumber.next(response.numOfCartItems);
      },
      error: (err) => {
        console.log(err);
        this.renderer.removeAttribute(element, 'disabled');
      },
    });
  }

  addHeart(prodId: string | undefined): void {
    this.whishlistService.addToWhishList(prodId).subscribe({
      next: (response) => {
        console.log(response);
        this.toastrService.success(response.message);
        this.wishListData = response.data;
        this.whishlistService.heartNumber.next(response.data.length);
      },
    });
  }
  removeHeart(prodId: string | undefined): void {
    this.whishlistService.removeToWhishList(prodId).subscribe({
      next: (response) => {
        console.log(response);
        this.toastrService.success(response.message);
        this.wishListData = response.data;
        this.whishlistService.heartNumber.next(response.data.length);
      },
    });
  }
}
