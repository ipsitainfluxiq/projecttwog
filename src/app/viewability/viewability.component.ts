import { Component, OnInit } from '@angular/core';
import {Http} from '@angular/http';
import {Commonservices} from '../app.commonservices' ;
import {CookieService} from 'angular2-cookie/core';

@Component({
  selector: 'app-viewability',
  templateUrl: './viewability.component.html',
  styleUrls: ['./viewability.component.css'],
    providers: [Commonservices]
})
export class ViewabilityComponent implements OnInit {
    public result: any;
    public serverurl: any;
    private addcookie: CookieService;
    private cookiedetails;
    private emailcookie: CookieService;
    private mailcookiedetails;
    public viewabilitis: any = [];
    public view: any;
    public viewability: any;

    constructor(addcookie: CookieService, emailcookie: CookieService, private _http: Http, private _commonservices: Commonservices) {
        this.addcookie = addcookie;
        this.cookiedetails = this.addcookie.getObject('cookiedetails');
        console.log('cookiedetails');
        console.log('get id from saved cookie ->  ' + this.cookiedetails);
        this.emailcookie = emailcookie;
        this.mailcookiedetails = this.emailcookie.getObject('mailcookiedetails');
        this.serverurl = _commonservices.url;
        this.getviewablity();
    }

    ngOnInit() {
        this.viewabilitis = ['No minimum', 'Good', 'Better', 'Best'];
        this.view = 'No minimum';
    }
    getviewablity() {
        let link = this.serverurl + 'gettotallist';
        let data = {
            emailid: this.mailcookiedetails,
        }
        this._http.post(link, data)
            .subscribe(res => {
                this.viewability = res.json();
                this.view = this.viewability[0].integral_viewability_threshold;
            }, error => {
                console.log('Oooops!');
            });
    }

    selectview(view) {

        if (view == 'No minimum') {
            // this.view = 'None';
            this.view = 'No minimum';
        }
        if (view == 'Good') {
            this.view = 'Good';
        }
        if (view == 'Better') {
            this.view = 'Better';
        }
        if (view == 'Best') {
            this.view = 'Best';
        }
        let data = {
            emailid: this.mailcookiedetails,
           // createaudienceid: this.cookiedetails,
            createaudienceid: 703030,
            integral_viewability_threshold: this.view
        }
        console.log(data);
        this.doupdate(data);
    }

    doupdate(data: any) {
        let link = this.serverurl + 'viewability';
        this._http.post(link, data)
            .subscribe(res => {
                this.result = res.json();
            }, error => {
                console.log('Oooops!');
            });
    }
}
