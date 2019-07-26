import { ShoppingCard } from '../../models/shopping-card';
import { Product } from '../../models/product';
import { Component, Input } from '@angular/core';
import { ShoppingCardService } from '../../services/shopping-card.service';


@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input('product') product: Product;
  @Input('show-actions') showActions = true;
  @Input('shopping-card') shoppingCard: ShoppingCard;

  constructor(private cardService: ShoppingCardService) { }

  addToCart() {
    this.cardService.addToCard(this.product);
  }
}
