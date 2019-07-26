import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { ShoppingCard } from '../shared/models/shopping-card';

@Component({
  selector: 'shopping-cart-summary',
  templateUrl: './shopping-cart-summary.component.html',
  styleUrls: ['./shopping-cart-summary.component.css']
})
export class ShoppingCartSummaryComponent {
  @Input('card') card: {items};

  constructor() { }

}
