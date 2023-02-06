/*
============================================
 Title: auth.guard.ts
 Author: Andres Macias
 Date:   01/15/23
 Description: contains cookie for session
===========================================
*/


import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})

/**
 * Description: This is the auth guard, it checks the cookies for the session user and if no session user is detected it will redirect to the login page.
 */
export class AuthGuard implements CanActivate {


/**
 * Description: This is the constructor for the auth guard class and it will inject the router and cookie service.
 */
  constructor(private router: Router, private cookieService: CookieService){}

/**
 * Description: This is the can activate function that will check the cookies for the session user and if no session user is detected it will redirect to the login page.
 */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      const sessionUser = this.cookieService.get('session_user');

      if(sessionUser) {
        return true;
      }
      else {
        this.router.navigate(['/session/login']);
        return false;
      }
  }

}
