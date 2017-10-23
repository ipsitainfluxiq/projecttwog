import { Component, OnInit } from '@angular/core';
import {Http} from '@angular/http';
import {Commonservices} from '../app.commonservices' ;
import {CookieService} from 'angular2-cookie/core';

@Component({
  selector: 'app-browser',
  templateUrl: './browser.component.html',
  styleUrls: ['./browser.component.css'],
    providers: [Commonservices]
})
export class BrowserComponent implements OnInit {
    public Firefox: any;
    public Microsoft: any;
    public Opera: any;
    public Chrome: any;
    public Konqueror: any;
    public Safari: any;
    public Others: any;
    public result: any;
    public selected_browsers: any = [];
    public serverurl: any;
    private addcookie: CookieService;
    private cookiedetails;
    private emailcookie: CookieService;
    private mailcookiedetails;
    public link: any;
    public datalist: any;
    public browserlists: any = [];
    private allbrowserslist: any = [];
    public allbrowsers: any = [];

    constructor(addcookie: CookieService, emailcookie: CookieService, private _http: Http, private _commonservices: Commonservices) {
        this.addcookie = addcookie;
        this.cookiedetails = this.addcookie.getObject('cookiedetails');
        console.log('cookiedetails');
        console.log('get id from saved cookie ->  ' + this.cookiedetails);
        this.emailcookie = emailcookie;
        this.mailcookiedetails = this.emailcookie.getObject('mailcookiedetails');
        this.serverurl = _commonservices.url;
      //  this.allbrowserslist = ['Firefox', 'Microsoft', 'Opera'];
      //  console.log(this.allbrowserslist);
        /*this.allbrowser();*/
        this.getselectedbrowser();
    }

    ngOnInit() {
    }
   /* allbrowser() {
        this.allbrowsers[0] = 'Firefox';
        this.allbrowsers[1] = 'Microsoft';
        this.allbrowsers[2] = 'Opera';
        this.allbrowsers[3] = 'Chrome';
        this.allbrowsers[4] = 'Konqueror';
        this.allbrowsers[5] = 'Safari';
        this.allbrowsers[6] = 'Others';
    }*/
    getselectedbrowser() {
      /*  let link = this.serverurl + 'browserlist';
        let data = {
            emailid: this.mailcookiedetails,
        }
        this._http.post(link, data)
            .subscribe(res => {
                this.browserlists = res.json();
                console.log('this.browserlists');
                console.log(this.browserlists);
              //  this.allbrowsers = [];
                for ( let f in this.browserlists[0].browser_ids) {
                    /!*this.allbrowsers[f] = this.browserlists[0].browser_ids[f];
                    this.allbrowserslist[this.browserlists[0].browser_ids[f]] = false;*!/
                    this.allbrowserslist[ this.browserlists[0].browser_ids] = true;
                }
                console.log('allbrowsers ids');
                console.log(this.allbrowsers);
            }, error => {
                console.log('Oooops!');
            });*/

          let link = this.serverurl + 'gettotallist';
        let data = {
            emailid: this.mailcookiedetails,
        }
        this._http.post(link, data)
            .subscribe(res => {
                let result = res.json();
                  this.datalist = result;
                   console.log('this.datalist');
                   console.log(this.datalist);
                   console.log(this.datalist[0].browser_ids[0]);
                for (let x in this.datalist[0].browser_ids) {
                    if (this.datalist[0].browser_ids[x] == 'Firefox') {
                        this.Firefox = true;
                    }if (this.datalist[0].browser_ids[x] == 'Microsoft') {
                        this.Microsoft = true;
                    }if (this.datalist[0].browser_ids[x] == 'Opera') {
                        this.Opera = true;
                    }if (this.datalist[0].browser_ids[x] == 'Chrome') {
                        this.Chrome = true;
                    }if (this.datalist[0].browser_ids[x] == 'Konqueror') {
                        this.Konqueror = true;
                    }if (this.datalist[0].browser_ids[x] == 'Safari') {
                        this.Safari = true;
                    }if (this.datalist[0].browser_ids[x] == 'Others') {
                        this.Others = true;
                    }
                   // this.allbrowserslist[ this.datalist[0].browser_ids[x]] = true;
                }
            }, error => {
                console.log('Oooops!');
            });
    }

    updatebrowsers() {
      /*  console.log(this.allbrowserslist);
        for (let x in this.allbrowserslist) {
            if (this.allbrowserslist[x] == true) {
                this.selected_browsers.push(x);
            }
        }
        let data = {
            emailid: this.mailcookiedetails,
            createaudienceid: 703030,
                browser_ids: selected_browsers,
        }
        console.log('updatebrowsers');
        console.log(data);
        this.doupdate(data);*/
    if (this.Firefox == true) {
        this.selected_browsers.push('Firefox');
    }
    if (this.Microsoft == true) {
        this.selected_browsers.push('Microsoft');
    }
    if (this.Opera == true) {
        this.selected_browsers.push('Opera');
    }
    if (this.Chrome == true) {
        this.selected_browsers.push('Chrome');
    }
    if (this.Konqueror == true) {
        this.selected_browsers.push('Konqueror');
    }
    if (this.Safari == true) {
        this.selected_browsers.push('Safari');
    }
    if (this.Others == true) {
        this.selected_browsers.push('Others');
    }

    let data = {
        emailid: this.mailcookiedetails,
        // createaudienceid: this.cookiedetails,
        createaudienceid: 703030,
       // browser_ids: JSON.stringify(this.selected_browsers),
        browser_ids: this.selected_browsers,
    }

    console.log('updatebrowsers');
    console.log(data);
    this.doupdate(data);

}

doupdate(data: any) {
    this.selected_browsers = [];
    let link = this.serverurl + 'browser';
    console.log(link);
    this._http.post(link, data)
        .subscribe(res => {
            this.result = res.json();
        }, error => {
            console.log('Oooops!');
        });
}
}
