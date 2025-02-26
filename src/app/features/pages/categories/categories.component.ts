import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Category } from '../../../shared/Interface/Category';
import { ProductService } from '../../../core/services/ecomm/product/product.service';
@Component({
  selector: 'app-categories',
  imports: [RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent implements OnInit {
  constructor() {}
  private productService = inject(ProductService);
  categoryData: Category[] = [];

  ngOnInit(): void {
    this.productService.getCategories().subscribe({
      next: (response) => {
        console.log(response);
        this.categoryData = response.data;
        console.log(this.categoryData);
      },
    });
  }
}
