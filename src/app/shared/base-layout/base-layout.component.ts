/*
============================================
 Title: base-layout.component.ts
 Author: Andres Macias
 Date:   01/15/23
 Description: contains logout method
===========================================
*/

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.css']
})

/**
 * Description: This is the base layout component class that will be used to create the base layout component.
 * year: This is the year that will be used to create the year.
 * constructor: This is the constructor that will be used to create the base layout component.
 * cookieService: This is the cookie service that will be used to create the cookie service.
 * router: This is the router that will be used to create the router.
 * logout method purpose: This method will be used to delete the cookies and navigate to the login page.
 */
export class BaseLayoutComponent implements OnInit {

  year: number = Date.now();

  constructor(private cookieService: CookieService, private router: Router) { }

  ngOnInit(): void {
  }

  logout() {
    this.cookieService.deleteAll();
    this.router.navigate(['/session/login'])
  }
}
