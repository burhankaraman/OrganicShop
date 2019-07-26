import { Observable } from 'rxjs/Observable';
import { Product } from '../models/product';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import { ShoppingCard } from '../models/shopping-card';

@Injectable()
export class ShoppingCardService {

  constructor(private db: AngularFireDatabase) { }

  async getCard(): Promise<Observable<ShoppingCard>> {
    let cardId = await this.getOrCreateCardId();
    return this.db.object('/shopping-cards/' + cardId)
      .map(x => new ShoppingCard(x.items));
  }

  async addToCard(product: Product) {
    this.updateItem(product, +1);
  }

  async removeFromCard(product: Product) {
    this.updateItem(product, -1);
  }

  async clearCard() {
   let cardId = await this.getOrCreateCardId();
   this.db.object('/shopping-cards/' + cardId + '/items').remove();
  }

  private create() {
    return this.db.list('/shopping-cards').push({
      dateCreated: new Date().getTime()
    });
  }

  private getItem(cardId: string, productId: string) {
    return this.db.object('/shopping-cards/' + cardId + '/items/' + productId);
  }

  private async getOrCreateCardId(): Promise<string> {
    let cardId = localStorage.getItem('cardId');
    if (!cardId) {
      let result = await this.create();
      localStorage.setItem('cardId', result.key);
      return result.key;
    }

    return cardId;
  }

  private async updateItem(product: Product, change: number) {
    let cardId = await this.getOrCreateCardId();
    let item$ = this.getItem(cardId, product.$key);
    item$.take(1).subscribe(item => {
      let quantity = (item.quantity || 0) + change;
      if (quantity === 0) item$.remove();
      else item$.update({
        title: product.title,
        imageUrl: product.imageUrl,
        price: product.price,
        quantity: quantity
      });
    });
  }
}
