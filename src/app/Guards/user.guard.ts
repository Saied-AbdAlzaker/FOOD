import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/services/Auth.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class UserGuard implements CanActivate {
  constructor(private _Router: Router, private _AuthService:AuthService) {
    _AuthService.getProfile();
   }
   
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (localStorage.getItem('userToken') !== null && localStorage.getItem('role') == 'SystemUser') {
      return true
    } else {
      this._Router.navigate(['/dashboard'])
      return false;
    }
  }
};

