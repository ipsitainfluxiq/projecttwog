import { Component, OnInit } from '@angular/core';
import {CookieService, cookieServiceFactory} from 'angular2-cookie/core';
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
    private emailcookie: CookieService;
    private mailcookiedetails;


    constructor(addcookie: CookieService, private _http: Http, private router: Router, emailcookie: CookieService) {
        this.addcookie = addcookie ;
        this.cookiedetails = this.addcookie.getObject('cookiedetails');
        this.emailcookie = emailcookie;
        this.mailcookiedetails = this.emailcookie.getObject('mailcookiedetails');
        console.log('from header --------> ' + this.mailcookiedetails);
        if (typeof (this.mailcookiedetails) == 'undefined') {
            this.router.navigateByUrl('/login');
        }
    }

    ngOnInit() {
    }

    resetcookie() {
        console.log('create new campaign');
        console.log('reset cookie');

        this.cookiedetails = this.addcookie.getObject('cookiedetails');
        this.mailcookiedetails = this.emailcookie.getObject('mailcookiedetails');

        this.addcookie.remove('cookiedetails');
        this.cookiedetails = this.addcookie.getObject('cookiedetails'); // after remove you have to call the cookie again to update the value

        this.router.navigateByUrl('/campaignsettings');
    }


    logout() {
        this.mailcookiedetails = this.emailcookie.getObject('mailcookiedetails');
        this.emailcookie.removeAll();
        this.router.navigateByUrl('/login');
    }

}
