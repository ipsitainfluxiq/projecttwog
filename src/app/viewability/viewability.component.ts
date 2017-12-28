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
    public errorforname: any;
    public viewability: any;
    public audiencename: any;
  //  public rand1: number;

    constructor(addcookie: CookieService, emailcookie: CookieService, private _http: Http, private _commonservices: Commonservices) {
        this.errorforname = '';
        console.log('constructir');
        this.addcookie = addcookie;
        this.cookiedetails = this.addcookie.getObject('cookiedetails');
        console.log('cookiedetails');
        console.log('get id from saved cookie ->  ' + this.cookiedetails);
        this.emailcookie = emailcookie;
        this.mailcookiedetails = this.emailcookie.getObject('mailcookiedetails');
        this.serverurl = _commonservices.url;

      /*  if (this.cookiedetails == null || this.cookiedetails == '' || typeof (this.cookiedetails) == 'undefined') {
            console.log('create it');
            this.createcampaign();
        } else {
            console.log('do nothing');
            this.getviewablity();
        }*/
        /*  setTimeout(() => {
        this.getviewablity();
        }, 1000);*/
        this.getviewablity();
    }

    ngOnInit() {
        this.viewabilitis = ['No minimum', 'Good', 'Better', 'Best'];
        this.view = 'No minimum';
    }

    getviewablity() {
        console.log('????');

        let link = this.serverurl + 'gettotallist';
        let data = {
            emailid: this.mailcookiedetails,
            createaudienceid: this.cookiedetails
        }
        this._http.post(link, data)
            .subscribe(res => {
                this.viewability = res.json();
                console.log('this.viewability');
                console.log(this.viewability);
                this.audiencename = this.viewability[0].audiencename;
                if (typeof (this.viewability[0].integral_viewability_threshold) != 'undefined') {
                    this.view = this.viewability[0].integral_viewability_threshold;
                }
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
            createaudienceid: this.cookiedetails,
            audiencename: this.audiencename,
            integral_viewability_threshold: this.view
        }
        console.log(data);
        this.doupdate(data);
    }

    doupdate(data: any) {
        console.log('doupdate');
        console.log('audiencename ' + this.audiencename);
        if (this.audiencename == null || this.audiencename == '' || (typeof (this.audiencename) == 'undefined')) {
            this.errorforname = 'Please give your name.';
        } else {
            this.errorforname = '';
            let link = this.serverurl + 'viewability';
            this._http.post(link, data)
                .subscribe(res => {
                    this.result = res.json();
                }, error => {
                    console.log('Oooops!');
                });
        }
    }
}
