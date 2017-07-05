import { Component, OnInit } from '@angular/core';
import {CookieService} from 'angular2-cookie/core';
import {Http} from '@angular/http';
declare var $ : any;
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
  public getresult;
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
  public error8;
  public error9;
  public error10;
  public error11;
  public error12;
  public start_date;
  public end_date;
  public startdt;
  public enddt;
  public currentdate;
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
  public calforcpc;
  public calforctr;
  public calforcpa;
  public impressions_goals;
  public goals;
  public oba;
  public obaid;
  public divshow0;
  public divshow;
  public divshow2;
  public divshow3;
  public divshow4;
  public divshow5;
  public divshow6;
  public divshow7;
  public isokDisabled;
  public submitedval;
  public fee;
  public m_name;
  public bymedia;
  public bycpm;
  public byspeed;
  public m_cpm;
  public m_media;
  public m_speed;
  public bidid;
  public bid_value;
  public geoid;
  public geoname;
  public auto;
  public showname;
  public dateforstart;
  public dateforend;
  public obas: any = [];
  public dt: Date = new Date();
  public enddate: Date = new Date();
  public items: any = [];
  public isActive: any = [];
  public isDisabled: any = [];


  constructor(addcookie: CookieService, private _http: Http) {
      if(this.auto == undefined){
          this.auto = false;
      }
    this.addcookie = addcookie ;
    this.cookiedetails = this.addcookie.getObject('cookiedetails');

      this.link = 'http://simplyfi.influxiq.com/get_campaign.php';
      this._http.get(this.link)
          .subscribe(res => {
              this.getresult = res.json();
              console.log('this.getresult');
              console.log(this.getresult);
              console.log(this.getresult.campaigns[0].campaign_type.name);
              this.name = this.getresult.campaigns[0].name;
              this.daily_spend_target = this.getresult.campaigns[0].daily_budget;
              this.monthly_budget = this.getresult.campaigns[0].monthly_budget;
              this.campaign_budget = this.getresult.campaigns[0].total_budget;
              this.daily_impression = this.getresult.campaigns[0].daily_impression_cap;
              this.monthly_impression = this.getresult.campaigns[0].monthly_impression_cap;
              this.impressions_c = this.getresult.campaigns[0].impression_cap;
              this.impressions_f = this.getresult.campaigns[0].frequency_capping.how_many_times;
              this.p_hour = this.getresult.campaigns[0].frequency_capping.hours;
              this.geoname = this.getresult.campaigns[0].campaign_type.name;
              this.dateforstart = this.getresult.campaigns[0].start_date;
              this.dateforend = this.getresult.campaigns[0].end_date;
              this.oba = this.getresult.campaigns[0].oba_provider.name;
              this.bidding_amount = this.getresult.campaigns[0].bid;
              this.bid_value = this.getresult.campaigns[0].bid_type.name;

     /* setInterval(() => {
          this.bid_value = this.getresult.campaigns[0].bid_type.name;
      }, 2000);*/
          });

console.log(this.bid_value);
console.log('bid_value');

      for (let i = 0; i <= 1; i++) {
          this.isActive.push(false);
          this.isDisabled.push(true);
      }
      this.isokDisabled = true;
      this.divshow0=0;
      this.divshow=0;
      this.divshow2=0;
      this.divshow3=0;
      this.divshow4=0;
      this.divshow5=0;
      this.divshow6=0;
      this.divshow7=0;
  }

  ngOnInit() {
    if (this.cookiedetails == undefined) {
      console.log('create it');
      this.createcampaign();
    }
    else {
        console.log(this.cookiedetails);
       console.log('do nothing');
    }

      this.items = ['Select', 1 , 2 , 3 , 4 , 5, 6 , 7 , 8 , 9 , 10  , 11 , 12 , 13 , 14 , 15 , 16 , 17 , 18 , 19 , 20 , 21 , 22 , 23 , 24];
      this.p_hour = 'Select';
      this.bidding_type = 'cpm_bidding';
      this.obas = ['Select', 'Evidon', 'Truste', 'OBA Compliance already present'];
      this.oba = 'Select';
      this.m_name = 'by CPM';
  }

   public getDate(): number {
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
         // console.log(this.newcreatedcampaignname);
          console.log(this.newcreatedcampaignid);
        }, error2 => {
          console.log('Ooops');
        } );
  }
    gettype(val) {
      console.log(val);
      if (val == 1) {
          this.geoid = 1;
          this.geoname = 'Search';
      }
      if (val == 2) {
          this.geoid = 2;
          this.geoname = 'Contextual';
      }
      if (val == 3) {
          this.geoid = 3;
          this.geoname = 'Site Retargeting';
      }
      if (val == 4) {
          this.geoid = 4;
          this.geoname = 'IP Targeting';
      }
      if (val == 5) {
          this.geoid = 5;
          this.geoname = 'Geo Optimized';
      }

    }

    updategeo() {
        let data: any = {
            id: this.cookiedetails,
            campaigndetails: {
               /* campaign_type: {
                    id: this.geoid,
                    name: this.geoname,
                }*/
                campaign_type_id:this.geoid,
            }
        }
        this.doupdate(data);
    }
    updatename() {
      if (this.name == '' || this.name == undefined) {
        this.error = 'Sorry! Please provide a name.';
      }
      else {
       this.error = '';
          let data: any = {
              id: this.cookiedetails,
              campaigndetails: {
                  name: this.name,
              }
          }
       this.doupdate(data);
    }
}

    sendtype(type) {
      console.log(type);
      if(type==0){
          this.divshow0=(1-this.divshow0);
      }  if(type==1){
          this.divshow=(1-this.divshow);
      }  if(type==2){
          this.divshow2=(1-this.divshow2);
      }if(type==3){
          this.divshow3=(1-this.divshow3);
      }if(type==4){
          this.divshow4=(1-this.divshow4);
      }if(type==5){
          this.divshow5=(1-this.divshow5);
      }if(type==6){
                this.isDisabled[0] = false;
                this.isActive[0] = true;
      }if(type==7){
            this.divshow7=(1-this.divshow7);
      }

        /*setTimeout(() => {
            this.isDisabled[val] = false;
            this.isActive[val] = true;
        }, 100);*/
    }

    updatedate() {
        this.currentdate = new Date();
        this.currentdate = this.currentdate.getTime();

        if (this.startdt < this.currentdate) {
            this.error1 = 'Provide a proper Start date..!';
        }
        if (this.startdt == this.currentdate) {
            this.error1 = 'Start date & End date cannot be equal..!';
        }
        if (this.enddt < this.currentdate || this.enddt < this.startdt) {
            this.error1 = 'Please provide proper End date..!';
        }
        else {
            this.error1 = '';
            let data: any = {
                id: this.cookiedetails,
                campaigndetails: {
                    start_date: this.dt,
                    end_date: this.enddate,
                }
            }
            this.dateforstart= this.dt;
            this.dateforend= this.enddate;
            this.doupdate(data);
        }
    }
    selectm_name(){
      console.log(this.m_name);
        if(this.m_name=='by_CPM'){
            this.bycpm='1';
            this.bymedia='';
            this.byspeed='';
        }
        if(this.m_name=='by_Percent_Media'){
            this.bycpm='';
            this.bymedia='1';
            this.byspeed='';
        }
        if(this.m_name=='by_Percent_Speed'){
            this.bycpm='';
            this.bymedia='';
            this.byspeed='1';
        }
    }
    updatebudget() {
        if (this.bidding_type == 'cpm_bidding' && (this.bidding_amount == undefined || this.bidding_amount == '' )) {
            this.error2 = 'Max bid is not a number';
        }
        if (this.bidding_amount > 99) {
            this.error2 = 'Max bid must be less than or equal to 99';
        }
        if (this.campaign_budget < this.monthly_budget) {
            this.error3 = 'Total budget must be greater than or equal to monthly budget';
        }
        if (this.campaign_budget < this.daily_spend_target) {
            this.error4 = 'Total budget must be greater than or equal to daily spend target';
        }
        if ( this.monthly_budget < this.daily_spend_target ) {
            this.error5 = 'Monthly budget must be greater than or equal to daily spend target';
        }
        if (this.bidding_type == 'cpc_bidding' && (this.bidding_amount == undefined || this.bidding_amount == '') ) {
            this.error2 = 'Goal value cannot be blank';
        }
        else {
            console.log(this.bidding_type);
            if(this.bidding_type == 'cpm_bidding'){
                this.bidid= 1;
                this.bid_value='CPM';
            }
            if(this.bidding_type == 'cpc_bidding'){
                console.log('inside');
                this.bidid= 2;
                this.bid_value='CPC';
            }
            this.error2 = '';
            this.error3 = '';
            this.error4 = '';
            this.error5 = '';
            this.submitedval=1;
            let data: any = {
                id: this.cookiedetails,
                campaigndetails: {
                    bid_type_id : this.bidid,
                    bid: this.bidding_amount,
                    monthly_budget: this.monthly_budget,
                    total_budget: this.campaign_budget,
                    daily_budget: this.daily_spend_target,
                    auto_adjust_daily_budget: this.auto,
                },
            }
            console.log('show data-> '+data);
            this.doupdate(data);
        }
    }

    updatecapping() {
        console.log("cal");
        if (this.impressions_c < this.monthly_impression){
            this.error6 = 'Impression cap must be greater than or equal to monthly impression cap';
        }
        if (this.impressions_c < this.daily_impression){
            this.error7 = 'Impression cap must be greater than or equal to daily impression cap';
        }
        if (this.monthly_impression < this.daily_impression){
            this.error8 = 'Monthly impression cap must be greater than or equal to daily impression cap';
        }
        if (((this.impressions_f != undefined ||this.impressions_f != '' ) && this.p_hour == 'Select')||((this.impressions_f == undefined || this.impressions_f == '') && this.p_hour != 'Select') ) {
            this.error9 = 'Frequency capping impressions and per hour must both be blank or non-zero';
        }
        else {
            console.log("what is going on");
            console.log(this.impressions_f);
            console.log(this.p_hour);
            this.error6 = '';
            this.error7 = '';
            this.error8 = '';
            this.error9 = '';
            let data: any = {
                id: this.cookiedetails,
                campaigndetails: {
                    impression_cap: this.impressions_c,
                    daily_impression_cap: this.daily_impression,
                    monthly_impression_cap: this.monthly_impression,
                    frequency_capping:{
                        how_many_times: this.impressions_f,
                        hours: this.p_hour,
                    }
                }
            }
            this.doupdate(data);
        }
    }

    callfunction(type){
      //console.log(type);
      if(type==1){
          console.log("1");
          this.calforcpc=1;
          this.calforcpa='';
          this.calforctr='';
      }
      if(type==2){
          console.log("2");
          this.calforctr=1;
          this.calforcpa='';
          this.calforcpc='';
      }
      if(type==3){
          console.log("3");
          this.calforcpa=1;
          this.calforcpc='';
          this.calforctr='';
      }
    }

    updategoal(){
        if (this.impressions_goals == '') {
        this.error10 = 'Goal value cannot be blank';
        }
        if (this.calforctr==1 && this.impressions_goals > 1) {
            console.log("occured");
            this.error10 = 'Goal value must be less than or equal to 1.0';
        }
        else{
            this.error10 = '';
            let data: any = {
                id: this.cookiedetails,
                campaigndetails: {
                    campaign_goal:{
                        goal_type: this.goals,
                        goal_value: this.impressions_goals,
                    }
                }
            }
            this.doupdate(data);
        }
    }


    selectoba() {
        if (this.oba == 'Select'){
            this.isokDisabled = true;
        }
        else {
            this.isokDisabled = false;
        }
    }
    updateoba(){
        console.log('oba val '+this.oba);
        if(this.oba == 'Evidon'){
            this.obaid= 2;
        }
        if(this.oba == 'Truste'){
            this.obaid= 1;
        }
        if(this.oba == 'OBA Compliance already present'){
            this.obaid= 3;
        }
        let data: any = {
            id: this.cookiedetails,
            campaigndetails: {
                oba_provider_id: this.obaid,
            }
        }
        this.doupdate(data);
    }
    updatemarkup(){
        if(this.fee=='' || this.fee==undefined){
            this.error11='Name is too short (minimum is 1 character)';
        }
        if(this.m_name=='' || this.m_name==undefined){
            this.error12='Markup is not a number';
        }
        else{
            //this.doupdate();
        }
/*if(this.divshow6 == 0){
    this.isokDisabled1 = true;
}
else{
    this.isokDisabled1 = true;
}*/
    }
    doupdate(data : any) {

      /*  let data: any = {
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
        impressions_c: this.impressions_c,
        monthly_impression: this.monthly_impression,
        daily_impression: this.daily_impression,
        impressions_f: this.impressions_f,
        p_hour: this.p_hour,
        goals: this.goals,
        impressions_goals: this.impressions_goals,
        oba: this.oba,
        fee: this.fee,
        m_name: this.m_name,
        m_cpm: this.m_cpm,
        m_media: this.m_media,
        m_speed: this.m_speed,
        },
    };*/
    this.link = 'http://simplyfi.influxiq.com/update_campaign.php';
    console.log('doupdatedata');
    console.log(data);
    this._http.post(this.link, JSON.stringify(data))
        .subscribe(res => {
        this.updateresult = res.json();
       // console.log(this.updateresult.errors[0]);
      //  this.resperr=this.updateresult.errors[0];
        }, error => {
        console.log('Oooops!');
    });
    }

}
