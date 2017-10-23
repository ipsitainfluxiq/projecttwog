import { Component, OnInit } from '@angular/core';
import {Http} from '@angular/http';
import {Commonservices} from '../app.commonservices' ;
import {CookieService} from 'angular2-cookie/core';

@Component({
    selector: 'app-pacing',
    templateUrl: './pacing.component.html',
    styleUrls: ['./pacing.component.css'],
    providers: [Commonservices]
})
export class PacingComponent implements OnInit {
    public paceerror: any;
    public pacingval: any;
    public showpace: any;
    public result: any;
    public pacing: any;
    public paceenable: boolean= true;
    public divshowpace = false;
    public serverurl: any;
    private addcookie: CookieService;
    private cookiedetails;
    private emailcookie: CookieService;
    private mailcookiedetails;

    constructor(addcookie: CookieService, emailcookie: CookieService,private _http: Http, private _commonservices: Commonservices) {
        this.addcookie = addcookie ;
        this.cookiedetails = this.addcookie.getObject('cookiedetails');
        console.log('cookiedetails');
        console.log('get id from saved cookie ->  ' + this.cookiedetails);
        this.emailcookie = emailcookie ;
        this.mailcookiedetails = this.emailcookie.getObject('mailcookiedetails');
        this.serverurl = _commonservices.url;
        this.pacingval = 100.00;
        this.paceerror = '';
        this.showpace = 'Automated Pacing Enabled - 100.0%';
        this.getpacing();
    }

    ngOnInit() {
    }

    getpacing() {
        let link = this.serverurl + 'gettotallist';
        let data = {
            emailid: this.mailcookiedetails,
        }
        this._http.post(link, data)
            .subscribe(res => {
                this.pacing = res.json();
                if (this.pacing[0].pacing.length > 0) {
                    this.pacingval = this.pacing[0].pacing;
                    this.paceenable = false;
                    this.divshowpace = true;
                    this.showpace = '';
                }
                else {
                    this.pacingval = 100;
                    this.paceenable = true;
                    this.divshowpace = false;
                    this.showpace = 'Automated Pacing Enabled -' + this.pacingval + '.0%';
                }
            }, error => {
                console.log('Oooops!');
            });
    }


    onChange() {
        setTimeout(() => {
            console.log('hi');
            console.log(this.paceenable) ;
            if (this.paceenable == true) {   // on
                this.pacingval = 100;
                this.divshowpace = false;
                this.showpace = 'Automated Pacing Enabled- ' + this.pacingval + '.0%';
            }
            else {
                this.divshowpace = true;
                this.showpace = '';
            }
        }, 300);
    }

    updatepacing(pacingval) {
        if (pacingval > 100) {
            this.paceerror = 'Pacing must be less than or equal to 100';
        }
        else {
            this.paceerror = '';
            this.showpace = pacingval + '.00%';
            let data = {
                emailid: this.mailcookiedetails,
               // createaudienceid: this.cookiedetails,
                createaudienceid: 703030,
                pacing: pacingval
            }
            console.log(data);
            this. doupdate(data);
        }
    }
    doupdate(data: any) {
        let link = this.serverurl + 'pacing';
        console.log(link);
        this._http.post(link, data)
            .subscribe(res => {
                this.result = res.json();
            }, error => {
                console.log('Oooops!');
            });
    }
}
