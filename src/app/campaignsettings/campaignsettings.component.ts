import { Component, OnInit } from '@angular/core';
import {CookieService} from 'angular2-cookie/core';
import {Http} from '@angular/http';
declare var $: any;
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
    public newcreatedcampaignid: any;
    public newcreatedcampaignname: any;
    public name: any;
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
    public campaign_budget: any;
    public bidding_type: any;
    public monthly_budget: any;
    public daily_spend_target: any;
    public bidding_amount: any;
    public impressions_c: any;
    public monthly_impression: any;
    public daily_impression: any;
    public impressions_f: any;
    public p_hour: any;
    public calforcpc: any;
    public calforctr: any;
    public calforcpa: any;
    public impressions_goals: any;
    public goals: any;
    public disableokforcpc = false;
    public oba: any;
    public obaid: any;
    public divshow0: any;
    public divshow: any;
    public divshow2: any;
    public divshow3: any;
    public divshow4: any;
    public divshow5: any;
    public divshow6: any;
    public divshow7: any;
    public isokDisabled;
    public submitedval;
    public fee: any;
    public m_name: any;
    public bymedia: any;
    public bycpm: any;
    public byspeed: any;
    public bidid: any;
    public bid_value: any;
    public geoid: any;
    public geoname: any;
    public valcpc: any;
    public auto: any;
    public loadervalue: any;
    public viewthrupercentage: any;
    public clickthrupercentage: any;
    public viewattr: any;
    public clickattr: any;
    public slidedisable= false;
    public dateforstart;
    public dateforend;
    public obas: any = [];
    public dt: Date = new Date();
    public enddate: Date = new Date();
    public items: any = [];
    public isActive: any = [];
    public isDisabled: any = [];


    constructor(addcookie: CookieService, private _http: Http) {
        console.log('slidedisable'+this.slidedisable);
        if (this.auto == undefined) {
            this.auto = false;
        }
        this.addcookie = addcookie ;
        this.cookiedetails = this.addcookie.getObject('cookiedetails');
        console.log('cookiedetails');
        console.log('get id from saved cookie ->  '+this.cookiedetails);

        if (this.cookiedetails == null || this.cookiedetails=='' || typeof (this.cookiedetails) == 'undefined') {
            this.loadervalue = true;
            console.log('create it');
            this.createcampaign();
        }else {
            this.loadervalue = false;
            console.log('do nothing');
            this.link = 'http://simplyfi.influxiq.com/get_campaign.php?id='+this.cookiedetails;
            this._http.get(this.link)
                .subscribe(res => {

                    this.getresult = res.json();
                    console.log('this.getresult');
                    console.log(this.getresult);
                    if((typeof (this.getresult.campaigns[0].id)!='undefined' && (this.getresult.campaigns[0].id)!=null))
                        this.geoid = (this.getresult.campaigns[0].id);
                    else {
                        this.geoid = '';
                    }

                    if ( (typeof (this.getresult.campaigns[0].name) != 'undefined' && ( this.getresult.campaigns[0].name)!= null )) {
                        this.name = this.getresult.campaigns[0].name;
                    } else {
                        this.name = '';
                    }

                    if ( (typeof (this.getresult.campaigns[0].daily_budget) != 'undefined' && ( this.getresult.campaigns[0].daily_budget)!= null )) {
                        this.daily_spend_target = this.getresult.campaigns[0].daily_budget;
                    } else {
                        this.daily_spend_target = '';
                    }

                    if ( (typeof (this.getresult.campaigns[0].monthly_budget) != 'undefined' && ( this.getresult.campaigns[0].monthly_budget)!= null )) {
                        this.monthly_budget = this.getresult.campaigns[0].monthly_budget;
                    } else {
                        this.monthly_budget = '';
                    }

                    if ( (typeof (this.getresult.campaigns[0].total_budget) != 'undefined' && ( this.getresult.campaigns[0].total_budget)!= null )) {
                        this.campaign_budget = this.getresult.campaigns[0].total_budget;
                    } else {
                        this.campaign_budget = '';
                    }

                    if ( (typeof (this.getresult.campaigns[0].daily_impression_cap) != 'undefined' && ( this.getresult.campaigns[0].daily_impression_cap)!= null )) {
                        this.daily_impression = this.getresult.campaigns[0].daily_impression_cap;
                    } else {
                        this.daily_impression = '';
                    }

                    if ( (typeof (this.getresult.campaigns[0].monthly_impression_cap) != 'undefined' && ( this.getresult.campaigns[0].monthly_impression_cap)!= null )) {
                        this.monthly_impression = this.getresult.campaigns[0].monthly_impression_cap;
                    } else {
                        this.monthly_impression = '';
                    }
                    if ( (typeof (this.getresult.campaigns[0].impression_cap) != 'undefined' && ( this.getresult.campaigns[0].impression_cap)!= null )) {
                        this.impressions_c = this.getresult.campaigns[0].impression_cap;
                    } else {
                        this.impressions_c = '';
                    }
                    if ( (typeof (this.getresult.campaigns[0].frequency_capping.how_many_times) != 'undefined' && ( this.getresult.campaigns[0].frequency_capping.how_many_times)!= null )) {
                        this.impressions_f = this.getresult.campaigns[0].frequency_capping.how_many_times;
                    } else {
                        this.impressions_f = '';
                    }

                    if ( (typeof (this.getresult.campaigns[0].frequency_capping.hours) != 'undefined' && ( this.getresult.campaigns[0].frequency_capping.hours)!= null )) {
                        this.p_hour = this.getresult.campaigns[0].frequency_capping.hours;
                    } else {
                        this.p_hour = '';
                    }

                    if ( (typeof (this.getresult.campaigns[0].campaign_type) != 'undefined' && ( this.getresult.campaigns[0].campaign_type)!= null )) {
                        this.geoname = this.getresult.campaigns[0].campaign_type.name;
                    } else {
                        this.geoname = '';
                    }

                    if ( (typeof (this.getresult.campaigns[0].start_date) != 'undefined' && ( this.getresult.campaigns[0].start_date)!= null )) {
                        this.dateforstart = this.getresult.campaigns[0].start_date;
                    } else {
                        this.dateforstart = '';
                    }

                    if ( (typeof (this.getresult.campaigns[0].end_date) != 'undefined' && ( this.getresult.campaigns[0].end_date)!= null )) {
                        this.dateforend = this.getresult.campaigns[0].end_date;
                    } else {
                        this.dateforend = '';
                    }

                    if ( (typeof (this.getresult.campaigns[0].oba_provider) != 'undefined' && ( this.getresult.campaigns[0].oba_provider)!= null )) {
                        this.oba = this.getresult.campaigns[0].oba_provider.name;
                    } else {
                        this.oba = '';
                    }

                    if ( (typeof (this.getresult.campaigns[0].bid) != 'undefined' && ( this.getresult.campaigns[0].bid)!= null )) {
                        this.bidding_amount = this.getresult.campaigns[0].bid;
                    } else {
                        this.bidding_amount = '';
                    }

                    if ( (typeof (this.getresult.campaigns[0].bid_type) != 'undefined' && ( this.getresult.campaigns[0].bid_type)!= null )) {
                        this.bid_value = this.getresult.campaigns[0].bid_type.name;
                    } else {
                        this.bid_value = '';
                    }

                    if (this.bid_value == 'CPC') {
                        this.bidding_type = 'cpc_bidding' ;
                        this.valcpc=true;
                    }

                    console.log('bid'+this.bid_value);

                    if ( (typeof (this.getresult.campaigns[0].campaign_goal) != 'undefined' && ( this.getresult.campaigns[0].campaign_goal)!= null )) {
                        this.goals = this.getresult.campaigns[0].campaign_goal.goal_type;
                    } else {
                        this.goals = '';
                    }
                    if(this.goals=='cpc'){
                        this.calforcpc=true;
                    }
                    if(this.goals=='ctr'){
                        this.calforctr=true;
                    }
                    if(this.goals=='cpa'){
                        this.calforcpa=true;
                    }
                    if ( (typeof (this.getresult.campaigns[0].campaign_goal) != 'undefined' && ( this.getresult.campaigns[0].campaign_goal)!= null )) {
                        this.impressions_goals = this.getresult.campaigns[0].campaign_goal.goal_value;
                    } else {
                        this.impressions_goals = '';
                    }
                    //this.geoid = this.getresult.campaigns[0].campaign_type.id;
                    /*this.daily_spend_target = this.getresult.campaigns[0].daily_budget;
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
                  this.goals = this.getresult.campaigns[0].campaign_goal.goal_type;
                  this.impressions_goals = this.getresult.campaigns[0].campaign_goal.goal_value;*/

                    /* setInterval(() => {
                   this.bid_value = this.getresult.campaigns[0].bid_type.name;
                   }, 2000);*/
                }, error => {
                    console.log("Oooops!");
                });
        }





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
        /*  if (this.cookiedetails == null || this.cookiedetails=='' || typeof (this.cookiedetails) == 'undefined') {
      console.log('create it');
      this.createcampaign();
    }
    else {
       console.log('cookiedetails');
       console.log(this.cookiedetails);
       console.log('do nothing');
    }*/

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
        this.link = 'http://simplyfi.influxiq.com/create_campaign1.php' ;
        this.data = {} ;
        this._http.get(this.link)
            .subscribe(res => {
                this.result = res.json();
                console.log('created');
                console.log(this.result);
                this.loadervalue = false;
                this.addcookie.putObject('cookiedetails', this.result.campaigns[0].id);
                this.cookiedetails = this.addcookie.getObject('cookiedetails');
                console.log('after putobject '+this.cookiedetails);
                this.newcreatedcampaignid = this.result.campaigns[0].id;
                this.newcreatedcampaignname = this.result.campaigns[0].name;
                // console.log(this.newcreatedcampaignname);
                console.log('id of new created campaign ->  '+this.newcreatedcampaignid);
            }, err => {
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
            //$(this).attr('#con1').addClass('activetd');
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
        this.divshow7=false;
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
        if (this.name == null || this.name == '') {
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
        this.error1 = '';
        console.log("updatedate error "+this.error1);
        console.log("startdate"+this.startdt);
        console.log("enddate "+this.enddt);
        this.currentdate = new Date().getTime();
        // this.currentdate = this.currentdate.getTime();
        console.log("currentdate "+this.currentdate);
        /* if (this.startdt < this.currentdate) {
            this.error1 = 'Provide a proper Start date..!';
            console.log("go");
        }*/
        if (this.startdt > this.enddt) {
            this.error1 = 'End date must be on or after start date..!';
            console.log("go");
        }
        if (this.startdt == this.enddt) {
            this.error1 = 'Start date & End date cannot be equal..!';
            console.log("go1");
        }
        /*  if (this.startdt > this.enddt || this.startdt == this.currentdate) {
            this.error1 = 'Provide a proper Start date..!';
            console.log("go1");
        }*/

        //  if (this.enddt < this.currentdate || this.enddt < this.startdt) {
        if (this.enddt < this.startdt) {
            console.log("go2");
            this.error1 = 'Please provide proper End date..!';
        }
        console.log('else part '+this.error1);
        if(this.error1=='') {
            this.divshow0=false;
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
        this.error2 = '';
        this.error3 = '';
        this.error4 = '';
        this.error5 = '';
        console.log('amt'+this.bidding_amount);
        console.log('auto'+this.auto);
        console.log(this.bidding_type);
        console.log(this.daily_spend_target);
        if ((this.bidding_type == 'cpm_bidding') && (this.bidding_amount == null )) {
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
        if (this.bidding_type == 'cpc_bidding' && (this.bidding_amount == null) ) {
            this.error2 = 'Goal value cannot be blank';
        }
        if(this.error2=='' && this.error3=='' && this.error4=='' && this.error5=='' ) {
            this.divshow=false;
            console.log("what is going on "+this.bidding_type);
            console.log("what is going on "+this.bidding_amount);
            if(this.bidding_type == 'cpm_bidding'){
                this.bidid= 1;
                this.bid_value='CPM';
                this.valcpc=false;
            }
            if(this.bidding_type == 'cpc_bidding'){
                console.log('inside');
                this.bidid= 2;
                this.bid_value='CPC';
                this.valcpc=true;

                if(this.valcpc == true &&(this.goals=='none' || this.goals=='ctr')){
                    console.log('????????????????????????????');
                    this.disableokforcpc = true;
                }
            }

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
            this.doupdate(data);
        }
    }

    updatecapping() {
        this.error6 = '';
        this.error7 = '';
        this.error8 = '';
        this.error9 = '';
        console.log("call");
        console.log("impresion_c "+this.impressions_c);
        console.log("monthly "+this.monthly_impression);
        console.log("daily "+this.daily_impression);
        console.log("impressn f "+this.impressions_f);
        console.log("hour "+this.p_hour);
        if (parseFloat(this.impressions_c) < parseFloat(this.monthly_impression)) {
            console.log('if-1');
            this.error7 = 'Impression cap must be greater than or equal to monthly impression cap';
        }
        if (parseFloat(this.impressions_c) < parseFloat(this.daily_impression)) {
            console.log('if-2');
            this.error8 = 'Impression cap must be greater than or equal to daily impression cap';
        }
        if (parseFloat(this.monthly_impression) < parseFloat(this.daily_impression)) {
            console.log('if-3');
            this.error9 = 'Monthly impression cap must be greater than or equal to daily impression cap';
        }
        if ( (this.impressions_f=='' && this.p_hour!='Select') || (this.impressions_f!='' && this.p_hour=='Select') ) {
            console.log('if-4');
            this.error6 = 'Frequency capping impressions and per hour must both be blank or non-zero';
        }
        if (this.error7=='' && this.error6=='' && this.error8=='' && this.error9==''){
            console.log('done');
            this.divshow2=false;
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
        if(type==0){
            console.log('type 0');
            this.slidedisable = true;
            console.log("0");
            this.calforcpc='';
            this.calforctr='';
            this.calforcpa='';
            this.impressions_goals='';
console.log(this.slidedisable);
        }
        if(type==1){
            this.slidedisable = false;
            console.log("1");
            this.calforcpc=1;
            this.calforcpa='';
            this.calforctr='';
            this.disableokforcpc = false;
            console.log(this.slidedisable);
        }
        if(type==2){
            this.slidedisable = false;
            console.log("2");
            this.calforctr=1;
            this.calforcpa='';
            this.calforcpc='';
        }
        if(type==3){
            this.slidedisable = false;
            console.log("3");
            this.calforcpa=1;
            this.calforcpc='';
            this.calforctr='';
            this.disableokforcpc = false;
        }
    }

    updategoal(){
        this.error10 = '';
        console.log('goal val'+this.goals);
        console.log('impresn goal val'+this.impressions_goals);
        if (this.goals != 'none' && (this.impressions_goals == null || this.impressions_goals == '')) {
            this.error10 = 'Goal value cannot be blank';
        }
        if (this.goals=='ctr' && this.impressions_goals > 1) {
            this.error10 = 'Goal value must be less than or equal to 1.0';
        }
        if(this.goals=='none'){
            this.error10 = '';
        }
        if(this.error10 == '') {
            this.divshow4=false;
            let data: any = {
                id: this.cookiedetails,
                campaigndetails: {
                    campaign_goal: {
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
        this.divshow5=false;
        let data: any = {
            id: this.cookiedetails,
            campaigndetails: {
                oba_provider_id: this.obaid,
            }
        }
        this.doupdate(data);
    }
    updatemarkup(){
        if(this.fee==null || this.fee==''){
            this.error11='Name is too short (minimum is 1 character)';
        }
        if(this.m_name==null || this.m_name==''){
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

    myOnUpdate(val: any ) {
        console.log('hey');
    }

    myOnChange(val: any, type ) {
        if(type ==1) {
            this.viewthrupercentage = val.from;
        }
        if(type ==2) {
            this.clickthrupercentage = val.from;
        }
        if(type ==3) {
            this.viewattr = val.from;
        }
        if(type ==4) {
            this.clickattr = val.from;
        }
    }

    myOnFinish(val: any, type ) {
        console.log('hello');
    }

    updateslider() {
        console.log('call-slider');
        let data: any = {
            id: this.cookiedetails,
            campaigndetails: {
                click_attribution_window: this.clickattr,
                view_attribution_window: this.viewattr,
                campaign_goal: {
                    cpa_click_thru_per: this.clickthrupercentage,
                    cpa_view_thru_per: this.viewthrupercentage,
                }

            }
        }
        this.doupdate(data);
    }
    doupdate(data: any) {

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
