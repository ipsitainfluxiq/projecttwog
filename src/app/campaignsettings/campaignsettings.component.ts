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
  public id;
  public result;
  public updateresult;
  public newcreatedcampaignid;
  public newcreatedcampaignname;
  public name;
  public error;
  public error1;
  public error2;
  public error3;
  public error4;
  public error5;
  public error6;
  public error7;
  public start_date;
  public end_date;
  public startdt;
  public enddt;
  public currentdate;
  public campaigndetails;
  public campaign_budget;
  public bidding_type;
  public monthly_budget;
  public daily_spend_target;
  public bidding_amount;
  public impressions_c;
  public monthly_impression;
  public daily_impression;
  public impressions_f;
  public p_hour;
  public dt: Date = new Date();
  public enddate: Date = new Date();
  public items: any = [];

  constructor(addcookie: CookieService, private _http: Http) {
    this.addcookie = addcookie ;
    this.cookiedetails = this.addcookie.getObject('cookiedetails');
  }

  ngOnInit() {
    if (this.cookiedetails == undefined) {
      console.log("create it");
      this.createcampaign();
    }
    else {
        console.log(this.cookiedetails);
       console.log("do nothing");
        //this.newcreatedcampaignname;
    }
    //for( let i=0; i<25, i++) {
      this.items = ['Select',1,2,3,4,5];
      this.p_hour='Select';
      // }
  }

   public getDate(): number {
        //console.log(this.dt);
       this.startdt = this.dt && this.dt.getTime() || new Date().getTime();
        return this.dt && this.dt.getTime() || new Date().getTime();
    }
    public getendDate(): number {
      this.enddt = this.enddate && this.enddate.getTime() || new Date().getTime();
        return this.enddate && this.enddate.getTime() || new Date().getTime();
    }

  createcampaign() {
    this.link = 'http://simplyfi.influxiq.com/create_campaign.php' ;
    this.data = {} ;
    this._http.get(this.link)
        .subscribe(res => {
          this.result = res.json();
          console.log(this.result);
          this.addcookie.putObject('cookiedetails', this.result.campaigns[0].id);
          this.newcreatedcampaignid = this.result.campaigns[0].id;
          this.newcreatedcampaignname = this.result.campaigns[0].name;
          console.log(this.newcreatedcampaignname);
          console.log(this.newcreatedcampaignid);
        }, error2 => {
          console.log('Ooops');
        } );
  }

    updatename(){

      if (this.name == '' || this.name == undefined) {
        this.error = 'Sorry! Please provide a name.';
      }
      else {
       this.error = '';
       this.doupdate();
    }
}

    updatedate(){
        this.currentdate= new Date();
        this.currentdate= this.currentdate.getTime();

        if(this.startdt < this.currentdate){
            this.error1 = 'Provide a proper Start date..!';
        }
        if(this.startdt == this.currentdate){
            this.error1 = 'Start date & End date cannot be equal..!';
        }
        if(this.enddt < this.currentdate || this.enddt < this.startdt) {
            this.error1 = 'Please provide proper End date..!';
        }
        else {
            this.error1 = '';
            this.doupdate();
        }
    }

    updatebudget(){
        console.log("called");
        console.log(this.bidding_type);
        console.log(this.bidding_amount);
        if (this.bidding_type=='cpm_bidding' && (this.bidding_amount== undefined || this.bidding_amount=='')) {
            this.error2='Max bid is not a number';
        }
        if (this.campaign_budget<this.monthly_budget){
            this.error3= 'Total budget must be greater than or equal to monthly budget';
        }
        if (this.campaign_budget<this.daily_spend_target){
            this.error4= 'Total budget must be greater than or equal to daily spend target';
        }
        if (this.monthly_budget<this.daily_spend_target){
            this.error5= 'Monthly budget must be greater than or equal to daily spend target';
        }
        if (this.bidding_type=='cpc_bidding' && (this.bidding_amount== undefined || this.bidding_amount=='')) {
            this.error2='Goal value cannot be blank';
        }
    }

    updatecapping(){
        if (this.impressions_c<this.monthly_impression){
            this.error6= 'Impression cap must be greater than or equal to monthly impression cap';
        }
        if (this.impressions_c<this.daily_impression){
            this.error7= 'Impression cap must be greater than or equal to daily impression cap';
        }
    }

    doupdate() {
        let data: any = {
        id: this.cookiedetails,
        campaigndetails: {
        name: this.name,
        start_date: this.dt,
        end_date: this.enddate,
        campaign_budget: this.campaign_budget,
        bidding_type: this.bidding_type,
        monthly_budget: this.monthly_budget,
        bidding_amount: this.bidding_amount,
        daily_spend_target: this.daily_spend_target,
        },
    };
    this.link = 'http://simplyfi.influxiq.com/update_campaign.php';
    console.log(data);
    this._http.post(this.link, JSON.stringify(data))
        .subscribe(res => {
        this.updateresult = res.json();
        }, error => {
        console.log("Oooops!");
    });
    }

}
