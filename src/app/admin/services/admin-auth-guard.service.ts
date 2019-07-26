import { Observable } from 'rxjs/Observable';
import { UserService } from '../../shared/services/user.service';
import { CanActivate } from '@angular/router/src/interfaces';
import { Injectable } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';

@Injectable()
export class AdminAuthGuard implements CanActivate {

  constructor(private auth: AuthService, private userService: UserService) { }

  canActivate(): Observable<boolean> {
    return this.auth.appUser$
    .map(appUser => appUser.isAdmin);
  }

}
