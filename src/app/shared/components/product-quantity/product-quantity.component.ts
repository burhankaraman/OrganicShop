import { ShoppingCardService } from '../../services/shopping-card.service';
import { Product } from '../../models/product';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent {
  @Input('product') product: Product;
  @Input('shopping-card') shoppingCard;

  constructor(private cardService: ShoppingCardService) { }

  addToCart() {
    this.cardService.addToCard(this.product);
  }

  removeFromCart() {
    this.cardService.removeFromCard(this.product);
  }

  getQuantity() {
    if (!this.shoppingCard) { return 0; }

    let item = this.shoppingCard.items[this.product.$key];
    return item ? item.quantity : 0;
  }
}
