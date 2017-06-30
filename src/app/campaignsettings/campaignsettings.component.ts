import { Component, OnInit } from '@angular/core';
import {CookieService} from 'angular2-cookie/core';
import {Http} from '@angular/http';

@Component({
  selector: 'app-campaignsettings',
  templateUrl: './campaignsettings.component.html',
  styleUrls: ['./campaignsettings.component.css']
})
export class CampaignsettingsComponent implements OnInit {
  private addcookie: CookieService;
  private cookiedetails;
  public link;
  public data;
  public result;
  public newcreatedcampaignid;
  public newcreatedcampaignname;
  public cookieinfo: any = [];

  constructor(addcookie: CookieService, private _http: Http) {
    /*let cookiedetails: any;*/
    this.addcookie = addcookie ;
    this.cookiedetails = this.addcookie.getObject('cookiedetails');
  }

  ngOnInit() {
    if (this.cookiedetails == undefined) {
      // console.log("create it");
      this.createcampaign();
    }
    else {
      // console.log("do nothing");
    }
  }

  createcampaign() {
    this.link = 'http://simplyfi.influxiq.com/create_campaign.php' ;
    this.data = {} ;
    this._http.get(this.link)
        .subscribe(res => {
          this.result = res.json();
          console.log(this.result);
          this.addcookie.putObject('cookiedetails', this.result);
          this.newcreatedcampaignid = this.result.campaigns[0].id;
          this.newcreatedcampaignname = this.result.campaigns[0].name;
          console.log('cookiedetails');
          //console.log(this.cookiedetails);
          console.log('addcookie');
          //console.log(this.addcookie);
          /*console.log(this.newcreatedcampaignid);
          console.log(this.newcreatedcampaignname);*/
        }, error2 => {
          console.log('Ooops');
        } );
  }
  }
