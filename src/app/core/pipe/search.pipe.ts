import { Pipe, PipeTransform } from '@angular/core';
import { IProduct } from './../../shared/Interface/products';

@Pipe({
  name: 'search',
  standalone: true,
})
export class SearchPipe implements PipeTransform {
  transform(products: IProduct[], term: string): IProduct[] {
    return products.filter((item) =>
      item.title.toLowerCase().includes(term.toLowerCase())
    );
  }
}
