import { Component, OnInit } from '@angular/core';
import {Http} from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {CookieService} from 'angular2-cookie/core';
declare var $: any;
@Component({
  selector: 'app-trial',
  templateUrl: './trial.component.html',
  styleUrls: ['./trial.component.css']
})
export class TrialComponent implements OnInit {
  private addcookie: CookieService;
  private cookiedetails;
  constructor(private _http: Http, private router: Router, addcookie: CookieService) {
    this.addcookie = addcookie ;
    this.cookiedetails = this.addcookie.getObject('cookiedetails');
    console.log('get id from saved cookie ->  '+this.cookiedetails);
  }

  ngOnInit() {
  }
  show(){
/*    $('#calender').datepicker();*/
  }
}
