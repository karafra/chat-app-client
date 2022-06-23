import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private auth: AuthService,
  ) { }

  canActivate(route: ActivatedRouteSnapshot,
    ): Observable<boolean> | Promise<boolean|UrlTree> | boolean {
    return this.auth.isAuthenticated$.pipe(
      tap(loggedIn => {
        if (this.auth.isAuthenticated$ && !loggedIn) {
            this.auth.login(route.url.toString());
            return true;
        }
        if (!loggedIn) {
          alert("You have to log in first");
          this.auth.login(route.url.toString());
          return false;
        }
      return true;
    }));
  }
}
