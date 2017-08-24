import { Component, OnInit } from '@angular/core';
import {Http} from '@angular/http';
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
    public pageinitation;
    public campaignname;
    orderbyquery: any;
    orderbytype: any;

    constructor(private _http: Http, private router: Router, private route: ActivatedRoute, addcookie: CookieService) {
        this.addcookie = addcookie ;
        this.cookiedetails = this.addcookie.getObject('cookiedetails');
        this.campaignname = 'Edit Campaign';
        this.showrows = 5;
        this.pageno = 1;
        this.pagestart = 0;
        this.pageinitation = 5;
        this.orderbyquery = 'id';
        this.orderbytype = 1;
    }

    ngOnInit() {
        this.getAdminList();
    }

    getAdminList() {
        let link = 'http://simplyfi.influxiq.com/getcampaignlist.php';
        let data = {};
        this._http.get(link)
            .subscribe(res => {
                let result = res.json();
                console.log(result);
                console.log(result.campaigns);
                this.datalist = result.campaigns;
                this.campaignlist_length = result.campaigns.length;
                this.totalpage = this.campaignlist_length / this.showrows ;
            }, error => {
                console.log('Oooops!');
            });
    }
    chagevalues() {
        //   setTimeout(() => {
        this.totalpage = this.campaignlist_length / this.showrows ;
        if (this.campaignlist_length % this.showrows != 0) {
            this.totalpage = this.totalpage + 1;
        }
        this.pageno = 1;
        this.pagestart = 0;
        this.pageinitation = parseInt(this.pagestart) + parseInt(this.showrows);

        //  }, 700);
    }

    pageval(type) {

        if (type == 1 ) {       // for prev page
            if ((this.pagestart - this.showrows) >= 0) {
                this.pageno--;
                this.pagestart = (this.pageno - 1) * this.showrows;
            }
        }

        if ( type == 2 ) {      // for next page
            if (this.campaignlist_length - this.showrows - 1 >= this.pagestart) {
                this.pagestart = this.pageno * this.showrows;
                this.pageno++;
            }
        }

        if ( type == 3 ) {    // for goto input type
            if ( (this.pageno >0) && (this.pageno <= this.totalpage) ) {
                this.pagestart = (this.pageno - 1) * this.showrows;
            } else {
                this.pageno = 1;
                this.pagestart = 0;
            }
        }

        this.pageinitation = parseInt(this.pagestart) + parseInt(this.showrows);
    }

    calledit(id) {
        this.addcookie.putObject('cookiedetails', id);
        this.cookiedetails = this.addcookie.getObject('cookiedetails');
        console.log('after putobject ' + this.cookiedetails);
        this.router.navigate(['/campaignsettings']);
    }
    getSortClass(value: any) {
        if (this.orderbyquery == value && this.orderbytype == -1) {
            return 'caret-up';
        }

        if (this.orderbyquery == value && this.orderbytype == 1) {
            // console.log('caret-up');
            return 'caret-down';
        }
        return 'caret-up-down';
    }

    manageSorting(value: any) {
        if (this.orderbyquery == value && this.orderbytype == -1) {
            this.orderbytype = 1;
            return;
        }
        if (this.orderbyquery == value && this.orderbytype == 1) {
            this.orderbytype = -1;
            return;
        }
        this.orderbyquery = value;
        this.orderbytype = 1;
    }
}
