import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { OrderService } from '../shared/services/order.service';
import { ShoppingCard } from '../shared/models/shopping-card';
import { ShoppingCardService } from '../shared/services/shopping-card.service';
import { Component, OnInit } from '@angular/core';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Subscription } from 'rxjs/Subscription';
import { Order } from '../shared/models/order';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit, OnDestroy {
  userId: string;
  card: ShoppingCard;
  cardSubscription: Subscription;
  userSubscription: Subscription;

  shipping = {};

  constructor(
    private router: Router,
    private authService: AuthService,
    private orderService: OrderService,
    private shoppingCardService: ShoppingCardService) {}

  async ngOnInit() {
    let card$ = await this.shoppingCardService.getCard();
    this.cardSubscription = card$.subscribe(card => this.card = card);
    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);
  }

  ngOnDestroy() {
    this.cardSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

  async placeOrder() {
    let order = new Order(this.userId, this.shipping, this.card);
    let result = await this.orderService.placeOrder(order);
    this.router.navigate(['/order-success', result.key]);
  }
}
