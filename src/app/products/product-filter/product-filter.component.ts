import { OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, Input } from '@angular/core';
import { CategoryService } from '../../shared/services/category.service';
import { trigger, state, style, transition, animate, keyframes, stagger, query } from '@angular/animations';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css'],
  animations: [

    trigger('categories', [
      transition('* => *', [

        query(':enter', style({ opacity: 0 }), {optional: true}),

        query(':enter', stagger('300ms', [
          animate('.6s ease-in', keyframes([
            style({opacity: 0, transform: 'translateX(-100%)', offset: 0}),
            style({opacity: .5, transform: 'translateX(70px)',  offset: 0.3}),
            style({opacity: 1, transform: 'translateX(0)',     offset: 1.0}),
          ]))]), {optional: true})
          ,
        query(':leave', stagger('300ms', [
          animate('.6s ease-out', keyframes([
            style({opacity: 1, transform: 'translateX(0)', offset: 0}),
            style({opacity: .5, transform: 'translateX(35px)',  offset: 0.3}),
            style({opacity: 0, transform: 'translateX(-75%)',     offset: 1.0}),
          ]))]), {optional: true})
      ])
    ])

  ]
})
export class ProductFilterComponent implements OnDestroy {
  categories$;
  categories;
  subscription: Subscription;
  @Input('category') category;

  constructor(private categoryService: CategoryService ) {
    this.categories$ = this.categoryService.getAll();
    this.subscription =  this.categoryService.getAll().subscribe( categories => this.categories = categories);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
