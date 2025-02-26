import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../../core/services/ecomm/product/product.service';
import { Brands } from '../../../shared/Interface/Brands';

@Component({
  selector: 'app-brands',
  imports: [RouterLink],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css',
})
export class BrandsComponent implements OnInit {
  private productService = inject(ProductService);

  constructor() {}

  brandsData: Brands[] = [];

  ngOnInit(): void {
    this.productService.getBrands().subscribe({
      next: (response) => {
        console.log(response);
        this.brandsData = response.data;
        console.log(this.brandsData);
      },
    });
  }
}
