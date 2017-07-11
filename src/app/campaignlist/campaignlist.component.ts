import { Component, OnInit } from '@angular/core';
import {Http} from "@angular/http";
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-campaignlist',
  templateUrl: './campaignlist.component.html',
  styleUrls: ['./campaignlist.component.css']
})
export class CampaignlistComponent implements OnInit {
public datalist;

  constructor(private _http: Http) { }

  ngOnInit() {
    this.getAdminList();
  }
  getAdminList() {
    var link ='http://simplyfi.influxiq.com/getcampaignlist.php';
    var data = {};
    this._http.get(link)
        .subscribe(res => {
          var result = res.json();
          console.log('hey');
          console.log(result.campaigns);
          this.datalist = result.campaigns;
          //console.log(this.datalist);
        }, error => {
          console.log("Oooops!");
        });
  }
}
