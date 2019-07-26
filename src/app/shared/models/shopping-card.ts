import { Product } from './product';
import { ShoppingCardItem } from './shopping-card-item';

export class ShoppingCard {
    items: ShoppingCardItem[] = [];

    constructor(private itemsMap: { [productId: string]: ShoppingCardItem }) {
      this.itemsMap = itemsMap || {};

      for (let productId in itemsMap) {
        let item = itemsMap[productId];
        let x = new ShoppingCardItem();
        Object.assign(x, item);
        x.$key = productId;
        this.items.push(x);
      }
    }

    getQuantity(product: Product) {
      let item = this.itemsMap[product.$key];
      return item ? item.quantity : 0;
    }

    get totalItemsCount() {
      let count = 0;
      for (let productId in this.itemsMap) {
        count += this.itemsMap[productId].quantity;
      }
      return count;
    }

    get totalPrice() {
      let sum = 0;
      for (let productId in this.items)
        sum += this.items[productId].totalPrice;

      return sum;
    }
}
