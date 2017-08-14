import { Component, OnInit } from '@angular/core';
import {CookieService} from 'angular2-cookie/core';
import {Http} from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  private addcookie: CookieService;
  private cookiedetails;

  constructor(addcookie: CookieService, private _http: Http, private router: Router) {
    this.addcookie = addcookie ;
/*    this.cookiedetails = this.addcookie.getObject('cookiedetails');
    console.log(this.cookiedetails);*/
  }

  ngOnInit() {
  }
  resetcookie() {
console.log('create new campaign');
console.log('reset cookie');
    // this.addcookie.removeAll();
    this.cookiedetails = this.addcookie.getObject('cookiedetails');
    console.log(this.cookiedetails);
    this.addcookie.removeAll();
    this.cookiedetails = this.addcookie.getObject('cookiedetails');
    console.log(this.cookiedetails);
    this.router.navigateByUrl('/campaignsettings');
  }
}
