import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UtilityService } from './utility.service';

@Injectable({
  providedIn: 'root',
})
export class RouteGuard implements CanActivate {
  isLoggedIn!: number;
  constructor(private router: Router, private utilityService: UtilityService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    this.isLoggedIn = Number(localStorage.getItem('isLoggedIn'));
    if (!this.isLoggedIn) {
      this.router.navigate(['/issues/home']);
    }
    return true;
  }
}
