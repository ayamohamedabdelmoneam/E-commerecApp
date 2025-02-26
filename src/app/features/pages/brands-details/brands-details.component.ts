import { Brands } from './../../../shared/Interface/Brands';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../core/services/ecomm/product/product.service';

@Component({
  selector: 'app-brands-details',
  imports: [],
  templateUrl: './brands-details.component.html',
  styleUrl: './brands-details.component.css',
})
export class BrandsDetailsComponent implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private productService = inject(ProductService);
  constructor() {}

  brandId: string | null = '';
  brandDetails: Brands = {} as Brands;

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (params) => {
        this.brandId = params.get('id');
      },
    });

    this.productService.getBrandsDetails(this.brandId).subscribe({
      next: (response) => {
        console.log(response);
        this.brandDetails = response.data;
      },
    });
  }
}
