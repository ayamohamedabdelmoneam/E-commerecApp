import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CartserviceService } from '../../../shared/Interface/cartservice.service';
@Component({
  selector: 'app-payment',
  imports: [ReactiveFormsModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css',
})
export class PaymentComponent implements OnInit {
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _CartService: CartserviceService
  ) {}
  cartId: string | null = '';

  orderForm: FormGroup = new FormGroup({
    details: new FormControl(''),
    phone: new FormControl(''),
    city: new FormControl(''),
  });

  handleForm(): void {
    this._CartService.checkOut(this.cartId, this.orderForm.value).subscribe({
      next: (response) => {
        if (response.status == 'success') {
          window.open(response.session.url, '_self');
        }
      },
    });
  }

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.cartId = params.get('id');
        console.log(this.cartId);
      },
    });
  }
}
