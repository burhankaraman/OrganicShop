import { ShoppingCard } from '../shared/models/shopping-card';
import { ShoppingCardService } from '../shared/services/shopping-card.service';
import { AppUser } from '../shared/models/app-user';
import { AuthService } from '../shared/services/auth.service';
import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { trigger, state, style, transition, animate, keyframes, stagger, query } from '@angular/animations';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css'],
  animations: [

    trigger('badge', [
      state('active', style({ opacity: 0 })),
      transition('* => *', [
        animate(300, keyframes([
          style({ opacity: 0, transform: 'translateY(0)', offset: 0 }),
          style({ opacity: .5, transform: 'translateY(40px)', offset: 0.3 }),
          style({ opacity: 1, transform: 'translateY(-100%)', offset: 1.0 }),
        ]))
      ])
    ])
  ]
})
export class BsNavbarComponent implements OnInit {
  isCollapsed = true;
  appUser: AppUser;
  card$: Observable<ShoppingCard>;

  constructor(public auth: AuthService, private cardService: ShoppingCardService) {
  }

  async ngOnInit() {
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
    this.card$ = await this.cardService.getCard();
  }

  logout() {
    this.auth.logout();
  }

}
