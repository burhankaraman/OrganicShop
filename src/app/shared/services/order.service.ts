import { ShoppingCardService } from './shopping-card.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable()
export class OrderService {

  constructor(
    private shoppingCardService: ShoppingCardService,
    private db: AngularFireDatabase) { }

  async placeOrder(order) {
    let result = await this.db.list('/orders').push(order);
    this.shoppingCardService.clearCard();
    return result;
  }
}
