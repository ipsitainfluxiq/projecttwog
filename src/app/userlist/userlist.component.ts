import { Component, OnInit } from '@angular/core';
import {Http} from "@angular/http";
import { Router, ActivatedRoute, Params } from '@angular/router';
import {CookieService} from 'angular2-cookie/core';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {
  public datalist;
  private addcookie: CookieService;
  private cookiedetails;

  constructor(private _http: Http, private router: Router, private route: ActivatedRoute, addcookie: CookieService) {
    this.addcookie = addcookie ;
    this.cookiedetails = this.addcookie.getObject('cookiedetails');
  }

  ngOnInit() {
    this.getUserList();
  }
  getUserList() {
    let link = 'http://localhost:3004/userlist';
    let data = {};
    this._http.get(link)
        .subscribe(res => {
          let result = res.json();
          console.log(result);
          this.datalist = result;
        }, error => {
          console.log("Oooops!");
        });
  }
}
