import { Component, OnInit } from '@angular/core';
import {CookieService} from "angular2-cookie/core";
import {Http} from "@angular/http";
import {ActivatedRoute, Router} from "@angular/router";
import {Commonservices} from "../app.commonservices";

@Component({
  selector: 'app-headernew',
  templateUrl: './headernew.component.html',
  styleUrls: ['./headernew.component.css'],
    providers: [Commonservices],
})
export class HeadernewComponent implements OnInit {
    public serverurl;
    private emailcookie: CookieService;
    private mailcookiedetails;
    private alldetailcookie: CookieService;
    private cookiedetailsforalldetails;

  constructor(alldetailcookie: CookieService, emailcookie: CookieService, private _http: Http, private router: Router, private route: ActivatedRoute, private _commonservices: Commonservices) {
      this.serverurl = _commonservices.url;
      this.emailcookie = emailcookie;
      this.mailcookiedetails = this.emailcookie.getObject('mailcookiedetails');
      this.alldetailcookie = alldetailcookie ;
      this.cookiedetailsforalldetails = this.alldetailcookie.getObject('cookiedetailsforalldetails');
      console.log(this.cookiedetailsforalldetails);
      if (this.mailcookiedetails == null) {
          this.router.navigateByUrl('/');
      }
  }

  ngOnInit() {
  }
    logout() {
        this.mailcookiedetails = this.emailcookie.getObject('mailcookiedetails');
        this.emailcookie.removeAll();
        this.router.navigateByUrl('');
    }
}
