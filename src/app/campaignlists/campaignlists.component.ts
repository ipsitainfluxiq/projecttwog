import { Component, OnInit } from '@angular/core';
import {Http} from "@angular/http";
import {ActivatedRoute, Router} from "@angular/router";
import {Commonservices} from "../app.commonservices";
import {CookieService} from "angular2-cookie/core";
import {Validators} from '@angular/forms';
declare var moment: any;

@Component({
  selector: 'app-campaignlists',
  templateUrl: './campaignlists.component.html',
  styleUrls: ['./campaignlists.component.css'],
    providers: [Commonservices],
})
export class CampaignlistsComponent implements OnInit {
    public campaignlist;
    public serverurl;
    public startdate;
    public showstartdate;
    public showenddate;
    public enddate;
    public statusid;
    public checkboxvalue = [];
    public checkboxarr = [];
    public campaignlistarr = [];
    private emailcookie: CookieService;
    private mailcookiedetails;
    public filterval1=2;
    public selectallcampaign = false;

    constructor(private _http: Http, private router: Router, private route: ActivatedRoute, private _commonservices: Commonservices,  emailcookie: CookieService) {
        this.serverurl = _commonservices.url;
        this.emailcookie = emailcookie ;
        this.mailcookiedetails = this.emailcookie.getObject('mailcookiedetails');
        console.log(this.mailcookiedetails);
        this.enddate = moment().format('MM-DD-YYYY');
        this.startdate = moment().subtract(1, 'months').format('MM-DD-YYYY');
        this.getcampaignlist();
    }

    ngOnInit() {
    }

    getcampaignlist() {
        this.campaignlistarr=[];
/*        this.startdate = parseInt((new Date(this.startdate).getTime() / 1000).toFixed(0));
        this.enddate = parseInt((new Date(this.enddate).getTime() / 1000).toFixed(0)); */
        this.showstartdate = parseInt((new Date(this.startdate).getTime() / 1000).toFixed(0));
        this.showenddate = parseInt((new Date(this.enddate).getTime() / 1000).toFixed(0));
        let link = this.serverurl + 'campaignlists';
        this._http.get(link)
            .subscribe(res => {
                let result = res.json();
                this.campaignlist = result.res;
                for(let i in this.campaignlist)
                {
                    if (this.campaignlist[i].startdate>=this.showstartdate && this.campaignlist[i].enddate<=this.showenddate ){
                        this.campaignlistarr.push(this.campaignlist[i]);
                    }
                }
                /*this.enddate = moment().format('MM-DD-YYYY');
                this.startdate = moment().subtract(1, 'months').format('MM-DD-YYYY');*/
            }, error => {
                console.log('Oooops!');
            });
    }

    showresult() {
       /* this.startdate = moment(this.startdate).format('MM-DD-YYYY');
        this.enddate = moment(this.enddate).format('MM-DD-YYYY');
        this.showstartdate=this.startdate;
        this.showenddate=this.enddate;
        this.startdate = parseInt((new Date(this.startdate).getTime() / 1000).toFixed(0));
        this.enddate = parseInt((new Date(this.enddate).getTime() / 1000).toFixed(0));*/
        this.showstartdate = parseInt((new Date(this.startdate).getTime() / 1000).toFixed(0));
        this.showenddate = parseInt((new Date(this.enddate).getTime() / 1000).toFixed(0));
        this.campaignlistarr = [];
        if(this.filterval1==2) {
            for (let i in this.campaignlist) {
                //  console.log('from db '+this.campaignlist[i].enddate);
                //  console.log('search end date '+this.enddate);
                //  console.log('==============');
                if (this.campaignlist[i].startdate >= this.showstartdate && this.campaignlist[i].enddate <= this.showenddate) {
                    //  console.log('?');
                    // console.log(this.campaignlist[i]);
                    this.campaignlistarr.push(this.campaignlist[i]);
                }
            }
        }
        if(this.filterval1==1){
        for(let i in this.campaignlist)
        {
            if (this.campaignlist[i].startdate>=this.showstartdate && this.campaignlist[i].enddate<=this.showenddate && this.campaignlist[i].status==1){
                this.campaignlistarr.push(this.campaignlist[i]);
            }
        }
        }
        if(this.filterval1==0){
        for(let i in this.campaignlist)
        {
            if (this.campaignlist[i].startdate>=this.showstartdate && this.campaignlist[i].enddate<=this.showenddate && this.campaignlist[i].status==0){
                this.campaignlistarr.push(this.campaignlist[i]);
            }
        }
        }
       /* this.startdate = this.showstartdate;
        this.enddate = this.showenddate;*/
}
    showproperdateformat(dt){
        return  moment(new Date(dt*1000)).format('MM-DD-YYYY');
    }

    showcampaignlists(type) {
        console.log('this.campaignlist');
        console.log(this.campaignlist);
      /*  this.startdate = parseInt((new Date(this.startdate).getTime() / 1000).toFixed(0));
        this.enddate = parseInt((new Date(this.enddate).getTime() / 1000).toFixed(0));*/
        this.showstartdate = parseInt((new Date(this.startdate).getTime() / 1000).toFixed(0));
        this.showenddate = parseInt((new Date(this.enddate).getTime() / 1000).toFixed(0));
        this.campaignlistarr = [];
        if(type==1){
            console.log('type 1');
            for(let i in this.campaignlist) {
                if(this.campaignlist[i].status==1 && this.campaignlist[i].startdate>=this.showstartdate && this.campaignlist[i].enddate<=this.showenddate) {
                    console.log('active');
                    this.campaignlistarr.push(this.campaignlist[i]);
                }
            }
        }
         if(type==0){
            console.log('type 0');
            for(let i in this.campaignlist) {
                if (this.campaignlist[i].status == 0 && this.campaignlist[i].startdate>=this.showstartdate && this.campaignlist[i].enddate<=this.showenddate) {
                    console.log('inactive');
                    this.campaignlistarr.push(this.campaignlist[i]);
                }
            }
        }
        if(type==2){
            console.log('type 2');
            for(let i in this.campaignlist) {
                if ( this.campaignlist[i].startdate>=this.showstartdate && this.campaignlist[i].enddate<=this.showenddate) {
                    this.campaignlistarr.push(this.campaignlist[i]);
                }
            }
        }
       /* this.enddate = moment().format('MM-DD-YYYY');
        this.startdate = moment().subtract(1, 'months').format('MM-DD-YYYY');*/
    }
    checkboxid(i,itemid,checkboxvalue){
        console.log('===========');
        console.log(i);
        console.log(itemid);
        console.log(checkboxvalue);
        console.log(this.checkboxvalue);
        if(checkboxvalue==true){
            this.checkboxarr.push(itemid);
        }
        if(checkboxvalue==false){
            let indexval: any = this.checkboxarr.indexOf(itemid);
            console.log('-----------------');
            console.log(indexval);
            this.checkboxarr.splice(indexval, 1);

        }
        console.log('this.checkboxarr+++++++++++');
        console.log(this.checkboxarr);
    }

    resumecampaigns(value){
        console.log('resumecampaigns');
        // 1 - resume i .e. status = 1
        // 0 - pause i .e. status = 0
        let link = this.serverurl+'changeallcampaignstatus';
        if(value==1){
            var data = {arrid:this.checkboxarr , statusid: 1};
        }
        else{
            var data = {arrid:this.checkboxarr , statusid: 0};
        }

        this._http.post(link, data)
            .subscribe(res => {
                let result = res.json();
                if(result.status=='success'){
                    this.getcampaignlist();
                }
            }, error => {
                console.log('Oooops!');
            });
    }

    changestatus(item){
        if(item.status == 1){
            this.statusid = 0;
        }
        else{
            this.statusid = 1;
        }
        let link = this.serverurl+'changecampaignstatus';
        let data = {id:item._id , statusid: this.statusid};
        console.log(data);
        this._http.post(link, data)
            .subscribe(res => {
                let result = res.json();
                    this.getcampaignlist();
            }, error => {
                console.log('Oooops!');
            });
    }

    allcheck() {
        this.checkboxvalue[0] = true;
        setTimeout(()=>{
        console.log('this.selectallcampaign--' + this.selectallcampaign);
            if (this.selectallcampaign == false) {
                for(let i in this.checkboxvalue){
                    this.checkboxvalue[i] = false;
                }
                this.checkboxarr=[];
            }
            if (this.selectallcampaign == true) {
                console.log($('.icheck').length);
                let cc = $('.icheck').length;
                console.log(this.checkboxvalue);
                for(let i=0 ; i<cc; i++){
                    this.checkboxvalue[i] = true;
                }
                for(let i in this.campaignlistarr){
                    this.checkboxarr.push(this.campaignlistarr[i]._id);
                }

            }
        }, 100);

    }

}
