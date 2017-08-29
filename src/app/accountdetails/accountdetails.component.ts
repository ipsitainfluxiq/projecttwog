import { Component, OnInit } from '@angular/core';
import {Commonservices} from '../app.commonservices' ;
import { Http } from '@angular/http';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {CookieService} from 'angular2-cookie/core';

@Component({
  selector: 'app-accountdetails',
  templateUrl: './accountdetails.component.html',
  styleUrls: ['./accountdetails.component.css'],
  providers: [Commonservices],
})
export class AccountdetailsComponent implements OnInit {
  public serverurl;
  private emailcookie: CookieService;
  private mailcookiedetails;
  private userdetails;

  constructor( emailcookie: CookieService, private _http: Http, private router: Router, private route: ActivatedRoute, private _commonservices: Commonservices) {
    this.serverurl = _commonservices.url;
    this.emailcookie = emailcookie ;
    this.mailcookiedetails = this.emailcookie.getObject('mailcookiedetails');
    console.log('mailcookiedetails');
    console.log('get mail from login page saved cookie ->  ' + this.mailcookiedetails);
  }

  ngOnInit() {
    this.getdetails();
  }
  getdetails() {
    let link = this.serverurl + 'accountdetails';
    let data = {emailid : this.mailcookiedetails};
    this._http.post(link, data)
        .subscribe(res => {
          let result = res.json();
            if (result.status == 'success' && typeof(result.item) != 'undefined') {
                this.userdetails = result.item;
                console.log(this.userdetails);
            }else {
                this.router.navigate(['/adminlist']);
            }
        }, error => {
          console.log('Ooops');
        });
  }
}
