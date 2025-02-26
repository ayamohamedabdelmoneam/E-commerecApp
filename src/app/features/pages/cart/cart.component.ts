import { Component, inject, OnInit, Renderer2 } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartserviceService } from '../../../shared/Interface/cartservice.service';
import { ToastrService } from 'ngx-toastr';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-cart',
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  constructor(private renderer: Renderer2) {}
  private cartservice = inject(CartserviceService);
  private toastrService = inject(ToastrService);
  cartDetails: any = null;
  cartNumber: number = 0;

  ngOnInit(): void {
    this.cartservice.getCartUser().subscribe({
      next: (response) => {
        console.log('getCart' + response);
        this.cartDetails = response.data;
        console.log(this.cartDetails);
        this.cartNumber = response.numOfCartItems;
        console.log(this.cartNumber);
      },
      error: (err) => {
        console.log(err);
        this.toastrService.info(`No Product`);
      },
    });
  }

  removeItem(id: string, element: HTMLButtonElement): void {
    this.renderer.setAttribute(element, 'disabled', 'true');

    this.cartservice.removeCartItem(id).subscribe({
      next: (response) => {
        console.log('remoc' + response);
        this.cartDetails = response.data;
        console.log(this.cartDetails);
        this.cartNumber = response.numOfCartItems;
        console.log(this.cartNumber);
        this.renderer.removeAttribute(element, 'disabled');

        this.cartservice.cartNumber.next(response.numOfCartItems);
      },
      error: (err) => {
        this.renderer.removeAttribute(element, 'disabled');
      },
    });
  }

  changeCount(
    count: number,
    id: string,
    el1: HTMLButtonElement,
    el2: HTMLButtonElement
  ): void {
    if (count >= 1) {
      this.renderer.setAttribute(el1, 'disabled', 'true');
      this.renderer.setAttribute(el2, 'disabled', 'true');
      this.cartservice.updateCartCount(id, count).subscribe({
        next: (response) => {
          this.cartDetails = response.data;
          this.cartNumber = response.numOfCartItems;
          this.renderer.removeAttribute(el1, 'disabled');
          this.renderer.removeAttribute(el2, 'disabled');
        },
        error: (err) => {
          this.renderer.removeAttribute(el1, 'disabled');
          this.renderer.removeAttribute(el2, 'disabled');
        },
      });
    } else {
      this.toastrService.warning(
        `This type of product contains a quantity of 1`
      );
    }
  }

  clear(): void {
    this.cartservice.clearCart().subscribe({
      next: (response) => {
        if (response.message === 'success') {
          this.cartDetails = null;
          this.cartNumber = 0;
          this.cartservice.cartNumber.next(0);
          this.toastrService.success(`You have deleted all products`);
        }
      },
    });
  }
}
