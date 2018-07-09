import { Component, NgZone, OnInit } from '@angular/core';
import {Http} from '@angular/http';
import {Commonservices} from '../app.commonservices' ;
import {CookieService} from 'angular2-cookie/core';
import {DomSanitizer} from '@angular/platform-browser';
declare var google: any;
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-searchnew',
  templateUrl: './searchnew.component.html',
  styleUrls: ['./searchnew.component.css'],
    providers: [Commonservices]
})
export class SearchnewComponent implements OnInit {
    private addcookie: CookieService;
    private cookiedetails;
    private emailcookie: CookieService;
    private mailcookiedetails;
    public serverurl: any;
    public tabopen: any = 1;
    public topmenu1: boolean = true;
    public statesubmenu: boolean = false;
    public topmenu2: boolean = false;
    public consumer_value: any;
    public  geodiv: any = 0;
    public  infodiv: any = 0;
    public  householddiv: any = 0;
    public  interestsdiv: any = 0;
    public  statediv: any = 0;
    public usstates: any = [];
    public openloader: any;
    public tokenid: any;
    public Physical_Statearr: any;
    public Physical_Cityarr: any;
    public selected_locations: any = [];
    public selected_locationsv: any = [];
    public show_state_cities: any = [];
    public uscities: any = [];
    public citydiv: any = 0;
    public selected_locationscityv: any = [];
    public selected_locationscity: any = [];
    public citysubmenu: boolean = false;
    public countrydiv: any = 0;
    public selected_locationscountry: any = [];
    public selected_locationscountryv: any = [];
    public Physical_Countryarr: any;
    public countrysubmenu: boolean = false;
    public show_state_countries: any = [];
    public zipval: any;
    public zipval1: any;
    public zipval2: any;
    public zipval3: any;
    public zipval4: any;
    public  zipdiv: any = 0;
    public selected_zip: any = [];
    public selected_ziparr: any;
    public ziplength: any;
    static invalidzip = false;
    public zipsubmenu: boolean = false;
    public addresssubmenu: boolean = false;
    public addressval: any;
    public addressdiv: any = 0;
    public radiusdiv: any = 0;
    public errorvalgeomiles: any;
    public geomiles: any;
    public geoaddress: any;
    public geozip: any;
    public geoerror: any;
    public selected_geoshapes: any;
    public errorvalgeozip: any;
    public geomilesorshapeslength: any;
    public radiussubmenu: boolean = false;
    public modalmapShown: boolean = false;
    map: any;
    drawingManager: any;
    static totalshapes = [];
    static totalshapesnew = [];
    static ctype;
    static cradius;
    static ccenter;
    static ne_lat;
    static ne_lng;
    static sw_lat;
    static sw_lng;
    static poly_arr = [];
    static poly_arr1 = [];
    public searchresult: any;
    public ModalShownforsearch: boolean = false;
    public ModalShownforbusinesssearch: boolean = false;
    public totalshapeslength: any;
    public mapsubmenu: boolean = false;
    public totalshapesnew: any;

    constructor(addcookie: CookieService, emailcookie: CookieService, private _http: Http, private router: Router, private route: ActivatedRoute, private _commonservices: Commonservices, public _sanitizer: DomSanitizer) {
        this.addcookie = addcookie;
        this.cookiedetails = this.addcookie.getObject('cookiedetails');
        this.emailcookie = emailcookie;
        this.mailcookiedetails = this.emailcookie.getObject('mailcookiedetails');
        console.log(this.mailcookiedetails);
        this.serverurl = _commonservices.url;
        this.getusstates();
        this.searchcriteria();
        this.getuscities();
    }

    ngOnInit() {
        /*this.map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: 40.785091, lng: -73.968285 },
            zoom: 8
        });*/
    }

    addclasstopmenu(val){
        // VAL = 1 ; Business
        // VAL = 2 ; Consumer
        this.tabopen = val;
        if(val==1){
            this.topmenu1 = true;
            this.topmenu2 = false;
        }
        else{
            this.topmenu2 = true;
            this.topmenu1 = false;
        }
        this.geodiv = 0;
        this.infodiv = 0;
        this.householddiv = 0;
        this.interestsdiv = 0;
        this.statediv = 0;
        this.citydiv = 0;
        this.zipdiv = 0;
        this.addressdiv = 0;
        this.radiusdiv = 0;
        this.statesubmenu = false;
        this.citysubmenu = false;
        this.countrysubmenu = false;
        this.zipsubmenu = false;
        this.addresssubmenu = false;
        this.radiussubmenu = false;
        this.mapsubmenu = false;

        this.Physical_Statearr = null;
        this.selected_locations = [];
        this.selected_locationsv = [];
        this.selected_locationscity = [];
        this.selected_locationscityv = [];
        this.show_state_cities = [];
        this.selected_locationscountryv = [];
        this.selected_locationscountry = [];
        this.selected_zip = [];
        this.ziplength = 0;
        this.zipval = null;
        this.zipval1 = null;
        this.zipval2 = null;
        this.zipval3 = null;
        this.zipval4 = null;
        this.addressval = null;
        this.selected_geoshapes = null;
        this.totalshapeslength = 0;
        SearchnewComponent.totalshapesnew=[];
        SearchnewComponent.totalshapes=[];
        this.totalshapesnew = null;
        /*for(let i in this.usstates) {
        $('#state_' +this.usstates[i].attr_id).removeClass('selectedclass');
        }*/
        //console.log('call');
        this.callforsearch();
    }
    opengeodiv(val) {
       /* if(val==1){
            this.businessgeodiv = (1 - this.businessgeodiv);
        }*/
       // else{
            this.geodiv = (1 - this.geodiv);
            if (this.geodiv == 1) {
                this.infodiv = 0;
                this.householddiv = 0;
                this.interestsdiv = 0;
         //   }
        }
    }
    openinfodiv() {
        this.infodiv = (1 - this.infodiv);
        if (this.infodiv == 1) {
            this.geodiv = 0;
            this.householddiv = 0;
            this.interestsdiv = 0;
        }
    }
    openhouseholddiv() {
        this.householddiv = (1 - this.householddiv);
        if (this.householddiv == 1) {
            this.geodiv = 0;
            this.infodiv = 0;
            this.interestsdiv = 0;
        }
    }
    openinterestsdiv() {
        this.interestsdiv = (1 - this.interestsdiv);
        if (this.interestsdiv == 1) {
            this.geodiv = 0;
            this.infodiv = 0;
            this.householddiv = 0;
        }
    }
    openstatediv() {
        this.statediv = 1;
        this.citydiv = 0;
        this.countrydiv = 0;
        this.zipdiv = 0;
        this.addressdiv = 0;
        this.radiusdiv = 0;
    }
    opencitydiv() {
        this.citydiv = 1;
        this.statediv = 0;
        this.countrydiv = 0;
        this.zipdiv = 0;
        this.addressdiv = 0;
        this.radiusdiv = 0;
    }
    opencountrydiv() {
        this.countrydiv = 1;
        this.statediv = 0;
        this.citydiv = 0;
        this.zipdiv = 0;
        this.addressdiv = 0;
        this.radiusdiv = 0;
    }
    openzipdiv() {
        this.zipdiv = 1;
        this.statediv = 0;
        this.citydiv = 0;
        this.countrydiv = 0;
        this.addressdiv = 0;
        this.radiusdiv = 0;
    }
    openaddressdiv() {
        this.addressdiv = 1;
        this.zipdiv = 0;
        this.statediv = 0;
        this.citydiv = 0;
        this.countrydiv = 0;
        this.radiusdiv = 0;
    }
    openradiusdiv() {
        this.radiusdiv = 1;
        this.zipdiv = 0;
        this.statediv = 0;
        this.citydiv = 0;
        this.countrydiv = 0;
        this.addressdiv = 0;
    }

    getusstates() {
        let link = this.serverurl + 'getusastates';
        this._http.get(link)
            .subscribe(res => {
                var result1 = res.json();
                for (let i in result1) {
                    //  this.usstates[i] = result1[i].abbreviation;
                    this.usstates[i] = {
                        attr_id: result1[i].abbreviation,
                        attr_name: result1[i].name,
                    };
                }
            }, error => {
                console.log('Oooops!');
            });
    }

    searchcriteria() {
        let link = this.serverurl + 'gettoken';
        this._http.get(link)
            .subscribe(res => {
                var tokenval = res.json();
                tokenval = tokenval.res;
                for (let i in tokenval) {
                    this.tokenid = tokenval[i].accesstoken;
                }
                console.log('tokenid is--' + this.tokenid);
                this. callforsearch();
            }, error => {
                console.log('Oooops!');
            });
    }
    callforsearch() {
        this.selected_geoshapes = null;
        this.zipsubmenu = false;
        this.addresssubmenu = false;
        this.radiussubmenu = false;
        this.mapsubmenu = false;
        this.Physical_Statearr = null;
        this.Physical_Cityarr = null;
        this.Physical_Countryarr = null;
        this.selected_ziparr = null;
        this.geomilesorshapeslength = null;
        this.totalshapeslength = 0;
        var flag = 0;
        console.log('SearchnewComponent.totalshapes just before search');
        console.log(SearchnewComponent.totalshapes);
        if (SearchnewComponent.totalshapes != null) {
            for (let i in SearchnewComponent.totalshapes) {
                if (SearchnewComponent.totalshapes[i].type == 'polygon') {
                    console.log('hi');
                    console.log(this.selected_geoshapes);
                    if (this.selected_geoshapes == null) {
                        this.selected_geoshapes = '#POLYGON#|' + SearchnewComponent.totalshapes[i].poly_arr;
                    }
                    else {
                        this.selected_geoshapes = this.selected_geoshapes + '|' + SearchnewComponent.totalshapes[i].poly_arr;
                    }
                    flag++;
                }
            }
            this.totalshapeslength = flag;
            if(this.totalshapeslength>0){
                this.mapsubmenu = true;
            }
        }
        if (this.selected_locations != null) {
            for (let i in this.selected_locations) {
                this.Physical_Statearr = this.Physical_Statearr + ',' + this.selected_locations[i].attr_id;
            }
        }
        if (this.selected_locationscity != null) {
            for (let i in this.selected_locationscity) {
                this.Physical_Cityarr = this.Physical_Cityarr + ',' + this.selected_locationscity[i].city;
            }
        }
        if (this.selected_locationscountry != null) {
            for (let i in this.selected_locationscountry) {
                this.Physical_Countryarr = this.Physical_Countryarr + ',' + this.selected_locationscountry[i].country;
            }
        }
        if (this.zipval != null &&  this.zipval != '') {
            this.selected_zip.push(this.zipval);
        }
        if (this.zipval1 != null &&  this.zipval1 != '') {
            this.selected_zip.push(this.zipval1);
        }
        if (this.zipval2 != null &&  this.zipval2 != '') {
            this.selected_zip.push(this.zipval2);
        }
        if (this.zipval3 != null &&  this.zipval3 != '') {
            this.selected_zip.push(this.zipval3);
        }
        if (this.zipval4 != null &&  this.zipval4 != '') {
            this.selected_zip.push(this.zipval4);
        }
        for (let i in this.selected_zip) {
            this.selected_ziparr = this.selected_ziparr + ',' + this.selected_zip[i];
        }
        if (((this.geomiles == null || this.geomiles == '') && (this.geoaddress == null || this.geoaddress == '') && (this.geozip == null  || this.geozip == '')) || (this.geomiles != null && this.geoaddress != null && this.geozip != null && this.geomiles != '' && this.geozip != '' && this.geoaddress != '')) {
            this.geoerror = null;
            console.log('geoerror should be null- ' + this.geoerror);
            if (this.geomiles != null && this.geoaddress != null && this.geozip != null && this.geomiles != '' && this.geozip != '' && this.geoaddress != '') {
                console.log('inside 1');
                console.log('geo miles val - '+this.geomiles);
                this.geomiles=parseFloat(this.geomiles);

                if (this.geomiles > 0 || this.geomiles < 150) {
                    this.errorvalgeomiles = null;
                    console.log('inside 2');
                }
                if (this.geomiles < 0 || this.geomiles > 150) {
                    this.errorvalgeomiles = 'The Number of Miles has to be between .1 and 150.0';
                    console.log('inside 3');
                }
                if (this.errorvalgeomiles == null) {
                    this.selected_geoshapes = this.geoaddress + '|' + this.geozip + '|' + this.geomiles;
                    this.geomilesorshapeslength = 1;
                    this.radiussubmenu = true;
                }
                let geozipvalid = /^[0-9]{5}$/;
                let geozipvalid1 = /^[0-9]{3}$/;
                if ((this.geozip.match(geozipvalid) || this.geozip.match(geozipvalid1)) || this.geozip.length == 0) {
                    this.errorvalgeozip = null;
                    console.log('inside 5');
                }
                else {
                    this.errorvalgeozip = 'Please enter a valid 3 or 5 ZIP code(s).';
                }
            }
        }
        else {
            this.geoerror = 'Please GIve all values';
        }
        if(this.tabopen == 1){
            var link = 'http://simplyfi.influxiq.com/businesscall.php?token=' + this.tokenid;
        }
        else{
            var link = 'http://simplyfi.influxiq.com/callconsumer.php?token=' + this.tokenid;
        }
        this.searchresult = null;
        let data = {
            Physical_State: this.Physical_Statearr,
            Physical_City: this.Physical_Cityarr,
            Vendor_State_County: this.Physical_Countryarr,
            Physical_Zip: this.selected_ziparr,
            Physical_Address: this.addressval,
            proximity: this.selected_geoshapes,
        };
        console.log(data);

        if (SearchnewComponent.invalidzip==false && this.geoerror == null && this.errorvalgeomiles == null && this.errorvalgeozip == null && this.tabopen!=null) {
            this.ziplength = this.selected_zip.length;
            if(this.ziplength>0){
                this.zipsubmenu = true;
            }
            if(this.addressval!=null){
                this.addresssubmenu = true;
            }
            this.openloader = true;
            this._http.post(link, data)
                .subscribe(res => {
                    this.openloader = false;
                    this.consumer_value = res.json();
                    this.selected_zip = [];
                  //  this.geomiles = null;
                   // this.geoaddress = null;
                  //  this.geozip = null;
                  //  this.selected_geoshapes = null;
                }, error => {
                    console.log('Oooops!');
                });
        }
    }

                                            /*For State*/

    addtolist(id, name , item) {
        this.statesubmenu = false;
        let tempvar= id;
        let indexval: any = this.selected_locationsv.indexOf(tempvar);
       // console.log(' indexval is ' + indexval);
        if (indexval == -1) {
            this.selected_locations.push({attr_id: id, attr_name: name});
            this.selected_locationsv.push( id);
        }
        else {
            this.selected_locations.splice(indexval, 1);
            this.selected_locationsv.splice(indexval, 1);
        }
        $('#state_' + id).toggleClass('selectedclass');
        if(this.selected_locations.length>0){
            this.statesubmenu = true;
        }
    }


                                                /*For City*/

    show_cities(id) { // here id is abbreviation
        this.show_state_cities=[];
        for (let i in this.uscities) {
            if (this.uscities[i].short_state == id) {
                this.show_state_cities.push(this.uscities[i]);
            }
        }
        /*for(let i in this.selected_locationscity) {
            for (let j in this.show_state_cities) {
                if (this.selected_locationscity[i].city == this.show_state_cities[j].city){
                    console.log('matched');
                    $('#city_' + this.selected_locationscity[i].city).toggleClass('selectedclass');
                }
                    }
        }*/
    }
    getuscities() {
        let link = this.serverurl + 'getus_cities1';
        this._http.get(link)
            .subscribe(res => {
                var result = res.json();
                for (let i in result) {
                    this.uscities[i] = {
                        city: result[i].city,
                        state: result[i].state,
                        short_state: result[i].short_state,
                        country: result[i].country,
                    };
                }
            }, error => {
                console.log('Oooops!');
            });
    }
    addtocitylist(city , item) {
        this.citysubmenu = false;
        let tempvar= city;
        let indexval: any = this.selected_locationscityv.indexOf(tempvar);
        if (indexval == -1) {
            this.selected_locationscity.push({city: city});
            this.selected_locationscityv.push( city);
        }
        /*else {
            this.selected_locationscity.splice(indexval, 1);
            this.selected_locationscityv.splice(indexval, 1);
        }*/
        if(this.selected_locationscity.length>0){
            this.citysubmenu = true;
        }
    }
    removefromcitylist(city , item) {
        console.log('before');
        console.log(this.selected_locationscity);
        let tempvar= city;
        let indexval: any = this.selected_locationscityv.indexOf(tempvar);
        console.log(' indexval is ' + indexval);
        this.selected_locationscity.splice(indexval, 1);
        this.selected_locationscityv.splice(indexval, 1);
        console.log('after');
        console.log(this.selected_locationscity);
        if(this.selected_locationscity.length==0){
            this.citysubmenu = false;
        }
    }


                                                    /*For County*/

    show_countries(id) { // here id is abbreviation
        this.show_state_countries = [];
        for (let i in this.uscities) {
            if (this.uscities[i].short_state == id) {
                console.log('inside');
                this.show_state_countries.push(this.uscities[i]);
            }
        }
    }
    addtocountrylist(country , item) {
        this.countrysubmenu = false;
        let tempvar= country;
        let indexval: any = this.selected_locationscountryv.indexOf(tempvar);
        if (indexval == -1) {
            this.selected_locationscountry.push({country: country});
            this.selected_locationscountryv.push( country);
        }
        if(this.selected_locationscountry.length>0){
            this.countrysubmenu = true;
        }
    }
    removefromcountrylist(country , item) {
        let tempvar= country;
        let indexval: any = this.selected_locationscountryv.indexOf(tempvar);
        this.selected_locationscountry.splice(indexval, 1);
        this.selected_locationscountryv.splice(indexval, 1);
        if(this.selected_locationscountry.length==0){
            this.countrysubmenu = false;
        }
    }


                                            /*For Zip*/
    zipvalidate(val){
        SearchnewComponent.zipvalidation(val);
    }

    static zipvalidation(val) {
        SearchnewComponent.invalidzip = false;
        if( (!val.match(/^[0-9]{3}$/)) && (!val.match(/^[0-9]{5}$/)) && (val.length!=0) ){
            SearchnewComponent.invalidzip = true;
        }
    }

    getzip(type: any) {
        if (type == 'invalid') {
            return SearchnewComponent.invalidzip;
        }
    }

    openmapdiv() {
        this.modalmapShown = true;
        setTimeout(() => {
            this.map = new google.maps.Map(document.getElementById('map'), {
                center: { lat: 40.785091, lng: -73.968285 },
                zoom: 8
            });
        this.drawingManager = new google.maps.drawing.DrawingManager({
            drawingMode: google.maps.drawing.OverlayType.POLYGON,
            drawingControl: true,
            drawingControlOptions: {
                position: google.maps.ControlPosition.TOP_CENTER,
                // drawingModes: ['polygon','circle','rectangle']
                drawingModes: ['polygon']
            }
        });
            this.drawingManager.setMap(this.map);
            google.maps.event.addListener(this.drawingManager, 'overlaycomplete', (event) => {
                // Polygon drawn
                if (event.type === google.maps.drawing.OverlayType.POLYGON) {
                    // this is the coordinate, you can assign it to a variable or pass into another function.
                    SearchnewComponent.ctype = event.type;
                    SearchnewComponent.poly_arr = event.overlay.getPath().getArray();
                    SearchnewComponent.poly_arr1 = [];
                    SearchnewComponent.poly_arr1 = event.overlay.getPath().getArray();
                                        for (let i in SearchnewComponent.poly_arr1) {
                                            SearchnewComponent.totalshapesnew.push(SearchnewComponent.poly_arr1[i].lng() + ' ' + SearchnewComponent.poly_arr1[i].lat());
                                        }
                                        SearchnewComponent.totalshapesnew.push(SearchnewComponent.poly_arr[0].lng() + ' ' + SearchnewComponent.poly_arr[0].lat());
                  /*  console.log('SearchnewComponent ' +  SearchnewComponent.totalshapesnew) ;*/
                    SearchnewComponent.poly_arr = SearchnewComponent.totalshapesnew; // added new
                    SearchnewComponent.totalshapes.push({
                        type: SearchnewComponent.ctype,
                        poly_arr: SearchnewComponent.totalshapesnew
                    });
                    SearchnewComponent.totalshapesnew=[];
                }
                console.log('SearchnewComponent.totalshapes++------+');
                console.log(SearchnewComponent.totalshapes);
                this.totalshapesnew = SearchnewComponent.totalshapes;
               /* console.log('this.totalshapesnew++------+');
                console.log(this.totalshapesnew);*/
            });
            if ((SearchnewComponent.totalshapes.length) > 0) {
                  for (let i in SearchnewComponent.totalshapes) {
                      var totalshapearr = [];
                    for(let j in SearchnewComponent.totalshapes[i].poly_arr){
                        var spl = SearchnewComponent.totalshapes[i].poly_arr[j].split(" ");
                        var obj={
                            lat:parseFloat(spl[0]),
                            lng:parseFloat(spl[1]),
                        }
                        totalshapearr.push(obj);
                    }
                    this.callpolygon(totalshapearr);
                  }
            }
        },500);
    }
    deletepolyshape( item: any ) {
        let indexval: any = SearchnewComponent.totalshapes.indexOf(item);
        SearchnewComponent.totalshapes.splice(indexval, 1);

       /* console.log('delete polyshapre after SearchnewComponent.totalshapes');
        console.log(SearchnewComponent.totalshapes);*/

    /*    var totalshapearr1 = [];
        for(let j in item.poly_arr){
            var spl = item.poly_arr[j].split(" ");
            var obj={
                lat:parseFloat(spl[0]),
                lng:parseFloat(spl[1]),
            }
            totalshapearr1.push(obj);
        }
        var PolyCoords1 = [];
        for (let j in totalshapearr1) {
            PolyCoords1.push({
                lat: totalshapearr1[j].lng,
                lng: totalshapearr1[j].lat
            });
        }
        var bermudaTriangle = new google.maps.Polygon({
            paths: PolyCoords1,
        });
        bermudaTriangle.setMap(null);
        console.log('failed??');*/
    }
    callpolygon(path) {
        var PolyCoords = [];
        for (let j in path) {
            PolyCoords.push({
                lat: path[j].lng,
                lng: path[j].lat
            });
        }

      /*  console.log('PolyCoords');
        console.log(PolyCoords);*/
        var bermudaTriangle = new google.maps.Polygon({
            paths: PolyCoords,
            strokeColor: '#0000FF',
            strokeOpacity: 0.8,
            strokeWeight: 3,
            fillColor: '#0000FF',
            fillOpacity: 0.35
        });
        bermudaTriangle.setMap(this.map);
    }
    onHidden() {
        this.modalmapShown = false;
        this.ModalShownforsearch = false;
        this.ModalShownforbusinesssearch = false;
    }
    viewallsearch() {
        this.openloader = true;
        let timestampis = new Date().getTime();
        if(this.tabopen==1){
            var link = 'http://simplyfi.influxiq.com/businesssearchresults.php?token=' + this.tokenid + '&v=' + timestampis;
        }
        else{
            var link = 'http://simplyfi.influxiq.com/searchresults.php?token=' + this.tokenid + '&v=' + timestampis;
        }
        this._http.get(link)
            .subscribe(res => {
                this.searchresult = res.json();
                this.openloader = false;
                if (this.searchresult != null) {
                    if(this.tabopen==1){
                        this.ModalShownforbusinesssearch = true;
                        this.ModalShownforsearch = false;
                    }
                    else{
                        this.ModalShownforsearch = true;
                        this.ModalShownforbusinesssearch = false;
                    }

                }
            }, error => {
                console.log('Oooops!');
            });
    }
}
