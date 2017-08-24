import { Component, OnInit } from '@angular/core';
import {CookieService, cookieServiceFactory} from 'angular2-cookie/core';
import {Http} from '@angular/http';
import { Router, ActivatedRoute, Params, NavigationEnd } from '@angular/router';

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

        /* this subscription will fire always when the url changes */
        this.router.events.subscribe(val=> {

            /* the router will fire multiple events */
            /* we only want to react if it's the final active route */
            if (val instanceof NavigationEnd) {

                /* the variable curUrlTree holds all params, queryParams, segments and fragments from the current (active) route */
                let curUrlTree = this.router.parseUrl(this.router.url);
                console.log(this.router.url);

                if ((typeof (this.mailcookiedetails) == 'undefined') && this.router.url!='/' && this.router.url!='/basicinformation' && this.router.url!='/confirmation') {
                    this.router.navigateByUrl('/login');
                }
            }
        });



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
