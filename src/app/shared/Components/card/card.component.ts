import { Component, Input, SimpleChanges } from '@angular/core';
import { IProduct } from '../../Interface/products';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  @Input({ required: true }) cardProduct!: IProduct;
}
