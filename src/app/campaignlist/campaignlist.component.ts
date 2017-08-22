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
    public showrows;
    public totalpage;
    public pageno;
    public campaignlist_length;
    public pagestart;

    constructor(private _http: Http, private router: Router, private route: ActivatedRoute, addcookie: CookieService) {
        this.addcookie = addcookie ;
        this.cookiedetails = this.addcookie.getObject('cookiedetails');
        this.showrows = 5;
        this.pageno = 1;
        this.pagestart=0;
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
                this.campaignlist_length = result.campaigns.length;
                this.totalpage = this.campaignlist_length / this.showrows ;
               //  console.log('campaignlist_length'+this.campaignlist_length);
            }, error => {
                console.log("Oooops!");
            });
    }
    chagevalues() {
        this.totalpage = this.campaignlist_length / this.showrows ;
        if (this.campaignlist_length % this.showrows != 0) {
            this.totalpage = this.totalpage + 1;
        }
       /* console.log("changevaluessssssssssss");
        console.log(this.totalpage);
        console.log(this.campaignlist_length);
        console.log(this.showrows);*/
    }

    pageval(type) {
        if (type == 1 ) {
            if ((this.pagestart - this.showrows) >= 0) {
            this.pageno--;
            this.pagestart = (this.pageno - 1) * this.showrows;
            console.log(this.pagestart);
            }
        }
        if ( type == 2 ) {
            // if(this.showrows==)
            if (this.campaignlist_length - this.showrows - 1 >= this.pagestart) {
                this.pageno++;
                this.pagestart = this.pageno * this.showrows;
                console.log(this.pagestart);
                // this.getAdminList();
            }
        }
    }

    calledit(id) {
        console.log(id);
        this.addcookie.putObject('cookiedetails', id);
        this.cookiedetails = this.addcookie.getObject('cookiedetails');
        console.log('after putobject ' + this.cookiedetails);
        this.router.navigate(['/campaignsettings']);
    }
}
