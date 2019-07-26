import { ShoppingCardService } from '../shared/services/shopping-card.service';
import { Product } from '../shared/models/product';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../shared/services/product.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { OnDestroy } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes, stagger, query } from '@angular/animations';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  animations: [

    trigger('products', [
      transition('* => *', [

        query(':enter', style({ opacity: 0 }), {optional: true}),

        query(':enter', stagger('300ms', [
          animate('.6s ease-in', keyframes([
            style({opacity: 0, transform: 'translateY(-100%)', offset: 0}),
            style({opacity: .5, transform: 'translateY(70px)',  offset: 0.3}),
            style({opacity: 1, transform: 'translateY(0)',     offset: 1.0}),
          ]))]), {optional: true})
      ])
    ])

  ]
})
export class ProductsComponent implements OnInit, OnDestroy {
  card: any;
  category: string;
  products: Product[] = [];
  filteredProducts: Product[] = [];
  subscription: Subscription;

  constructor(
    private shoppingCardService: ShoppingCardService,
    private route: ActivatedRoute,
    private productService: ProductService) {
    this.productService.getAll()
      .subscribe(products => {
        this.products = products;

        this.route.queryParamMap.subscribe(params => {
          this.category = params.get('category');

          this.filteredProducts = (this.category) ?
          this.products.filter(p => p.category === this.category) :
          this.products;
        });
      });
  }

  async ngOnInit() {
    this.subscription = (await this.shoppingCardService.getCard()).subscribe(card => this.card = card);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
