import { Component, OnInit } from '@angular/core';
import {Http} from "@angular/http";
import { Router, ActivatedRoute, Params } from '@angular/router';
import {CookieService} from 'angular2-cookie/core';

@Component({
  selector: 'app-campaignlist',
  templateUrl: './campaignlist.component.html',
  styleUrls: ['./campaignlist.component.css']
})
export class CampaignlistComponent implements OnInit {
public datalist;
    private addcookie: CookieService;
    private cookiedetails;

  constructor(private _http: Http, private router: Router, private route: ActivatedRoute, addcookie: CookieService) {
      this.addcookie = addcookie ;
      this.cookiedetails = this.addcookie.getObject('cookiedetails');
  }

  ngOnInit() {
    this.getAdminList();
  }
  getAdminList() {
    var link =' http://simplyfi.influxiq.com/getcampaignlist.php ';
    var data = {};
    this._http.get(link)
        .subscribe(res => {
          var result = res.json();
          console.log(result);
          console.log('hey');
          console.log(result.campaigns);
          this.datalist = result.campaigns;
          // console.log(this.datalist);
        }, error => {
          console.log("Oooops!");
        });
  }

    calledit(id) {
      console.log(id);
        this.addcookie.putObject('cookiedetails', id);
        this.cookiedetails = this.addcookie.getObject('cookiedetails');
        console.log('after putobject ' + this.cookiedetails);
        this.router.navigate(['/campaignsettings']);
    }
}
