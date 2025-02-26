import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../core/services/ecomm/product/product.service';
import { Category } from '../../../shared/Interface/Category';

@Component({
  selector: 'app-categorydetails',
  imports: [],
  templateUrl: './categorydetails.component.html',
  styleUrl: './categorydetails.component.css',
})
export class CategorydetailsComponent implements OnInit {
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _ProductService: ProductService
  ) {}

  categoryId: string | null = '';
  categoryDetails: Category = {} as Category;

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.categoryId = params.get('id');
      },
    });

    this._ProductService.getCategoryDetails(this.categoryId).subscribe({
      next: (response) => {
        this.categoryDetails = response.data;
      },
    });
  }
}
