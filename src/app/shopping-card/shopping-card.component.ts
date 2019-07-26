import { ShoppingCard } from '../shared/models/shopping-card';
import { Observable } from 'rxjs/Observable';
import { ShoppingCardService } from '../shared/services/shopping-card.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping-card',
  templateUrl: './shopping-card.component.html',
  styleUrls: ['./shopping-card.component.css']
})
export class ShoppingCardComponent implements OnInit {
  card$: Observable<ShoppingCard>;

  constructor(private shoppingCardService: ShoppingCardService) { }

  async ngOnInit() {
    this.card$ = await this.shoppingCardService.getCard();
  }

  clearCard() {
    this.shoppingCardService.clearCard();
  }
}
