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
  public getval: any = [];

  constructor(addcookie: CookieService, private _http: Http) {
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
          //console.log(this.result.campaigns[0]);
          this.getval = this.result.campaigns[0];
            //console.log(this.cookieinfo);
          //this.addcookie.putObject('cookiedetails', this.result/*.campaigns[0].id*/);
          this.addcookie.putObject('cookiedetails', this.getval/*.campaigns[0].id*/);
          this.newcreatedcampaignid = this.getval.id;
          this.newcreatedcampaignname = this.getval.name;
        }, error2 => {
          console.log('Ooops');
        } );
  }
  }
