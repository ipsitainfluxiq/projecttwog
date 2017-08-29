import { Component, OnInit } from '@angular/core';
import { CookieService } from 'angular2-cookie/core';
import {Http} from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Commonservices} from '../app.commonservices' ;

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css'],
  providers: [Commonservices],
})
export class ConfirmationComponent implements OnInit {
  private addcookie: CookieService;
  private cookiedetails;
  public serverurl;

  constructor(private _http: Http, private router: Router, addcookie: CookieService, private _commonservices: Commonservices) {
    this.addcookie = addcookie ;
    this.cookiedetails = this.addcookie.getObject('cookiedetails');
    console.log(this.cookiedetails);
    this.serverurl = _commonservices.url;
  }

  ngOnInit() {
    let data = {id: this.cookiedetails};
   // let link = 'http://localhost:3004/confirmation';
   // let link = 'http://influxiq.com:3014/confirmation';
    let link = this.serverurl + 'confirmation';
    this._http.post(link, data)
        .subscribe(res => {
          let result = res.json();
        //  console.log('confirm  ts');
        //  console.log(result);
        }, error => {
          console.log('Ooops');
        });
  }
}
