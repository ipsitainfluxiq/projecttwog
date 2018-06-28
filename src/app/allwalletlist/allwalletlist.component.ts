import { Component, OnInit } from '@angular/core';
import {Http} from "@angular/http";
import {ActivatedRoute, Router} from "@angular/router";
import {Commonservices} from "../app.commonservices";
import {CookieService} from "angular2-cookie/core";
declare var moment: any;

@Component({
  selector: 'app-allwalletlist',
  templateUrl: './allwalletlist.component.html',
  styleUrls: ['./allwalletlist.component.css'],
    providers: [Commonservices],
})
export class AllwalletlistComponent implements OnInit {
    public datalist;
    public serverurl;
    private emailcookie: CookieService;
    private mailcookiedetails;
    public userdetails;
    public typeis;
    public filterval;
    public filterval1;
    public filterval2;
    public filterval3;
    public filterval4='';
    public filterval5;

    constructor(private _http: Http, private router: Router, private route: ActivatedRoute, private _commonservices: Commonservices,  emailcookie: CookieService) {
        this.serverurl = _commonservices.url;
        this.getwalletlist();
        this.emailcookie = emailcookie ;
        this.mailcookiedetails = this.emailcookie.getObject('mailcookiedetails');
        console.log(this.mailcookiedetails);
        if(this.mailcookiedetails != null){
            this.getuserdetails();
        }
    }
    searchbyval() {
        console.log(this.filterval5);
        console.log('searchbyval');
        this.filterval = '';
        if (this.filterval1 != '' && this.filterval1 != null) {
            this.filterval = this.filterval1 + '|';
        }
        if (this.filterval2 != '' && this.filterval2 != null) {
            this.filterval2 = moment(this.filterval2).unix();
            this.filterval += this.filterval2 + '|';
        }
        if (this.filterval3 != '' && this.filterval3 != null) {
            this.filterval3 = moment(this.filterval3).unix();
            this.filterval += this.filterval3 + '|';
        }
        if (this.filterval4 != '' && this.filterval4 != null) {
            this.filterval += this.filterval4 + '|';
        }
        if (this.filterval5 != '' && this.filterval5 != null) {
            this.filterval += this.filterval5+ '|';
        }
    }
    autocompleListFormatter = (data: any) => {
        return data.name;
    }
    valueChanged(data: any): string {
        console.log(data);
        return data;
    }
    ngOnInit() {
    }

    getuserdetails() {
        let link = this.serverurl + 'userdetails';
        let data={
            email: this.mailcookiedetails
        }
        this._http.post(link, data)
            .subscribe(res => {
                let result = res.json();
                this.userdetails = result.res;
                this.typeis=this.userdetails[0].type;
            }, error => {
                console.log('Oooops!');
            });
    }
    getwalletlist() {
        let link = this.serverurl + 'walletlistjoiningsignup1';
        this._http.get(link)
            .subscribe(res => {
                let result = res.json();
                this.datalist = result.res;
                console.log('this.datalist--walletlist');
               /* for(let i in this.datalist){
                    let j=i+1;
                    for(let j in this.datalist){
                    if(this.datalist[i].added_by==this.datalist[j].added_by){
                        this.totalamount =
                        this.newarr.push(this.datalist[j]);
                    }
                }
                }*/
            }, error => {
                console.log('Oooops!');
            });
    }

    showdate(dt){
        return moment(dt).format('Do MMM , YYYY');
    }
}
