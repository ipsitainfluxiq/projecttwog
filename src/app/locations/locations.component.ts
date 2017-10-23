import { Component, OnInit } from '@angular/core';
import {Http} from '@angular/http';
import {Commonservices} from '../app.commonservices' ;
import {CookieService} from 'angular2-cookie/core';

@Component({
    selector: 'app-locations',
    templateUrl: './locations.component.html',
    styleUrls: ['./locations.component.css'],
    providers: [Commonservices]
})
export class LocationsComponent implements OnInit {
    public selected_locations: any = [];
    public parent_locations: any = [];
    public child_locations: any = [];
    public details: any = [];
    private addcookie: CookieService;
    private cookiedetails;
    private emailcookie: CookieService;
    private mailcookiedetails;
    public serverurl: any;

    constructor(addcookie: CookieService, emailcookie: CookieService, private _http: Http, private _commonservices: Commonservices) {
        this.addcookie = addcookie;
        this.cookiedetails = this.addcookie.getObject('cookiedetails');
       // console.log('cookiedetails');
       // console.log('get id from saved cookie ->  ' + this.cookiedetails);
        this.emailcookie = emailcookie;
        this.mailcookiedetails = this.emailcookie.getObject('mailcookiedetails');
        this.serverurl = _commonservices.url;
    }

    ngOnInit() {
        // this.parentlo();
        // this.childlo();
    }

    parentlo() {
        this.parent_locations = [];
        let link = 'http://simplyfi.influxiq.com/updateaudience.php';
        this._http.get(link)
            .subscribe(res => {
                this.parent_locations = res.json();
                for (let c in this.parent_locations.geo_targets) {
                    this.details[c] = ({
                        id: this.parent_locations.geo_targets[c].id,
                        name: this.parent_locations.geo_targets[c].name
                    });
                }
                /*console.log('this.details');
                console.log(this.details);*/

                let link1 = this.serverurl + 'alllocation';
                let data = {
                    alllocations: this.details
                }
                this._http.post(link1, data)
                    .subscribe(res => {
                    }, error => {
                        console.log('Oooops!');
                    });
            }, error => {
                console.log('Oooops!');
            });
    }


    childlo() {

        let link = 'http://simplyfi.influxiq.com/updateaudience.php';
        this._http.get(link)
            .subscribe(res => {
                this.parent_locations = res.json();
                for (let c in this.parent_locations.geo_targets) {
                    setTimeout(() => {
                    let link1 = 'http://simplyfi.influxiq.com/getchildlist.php?parent_id=' + this.parent_locations.geo_targets[c].id;
                    this._http.get(link1)
                        .subscribe(res1 => {
                            this.child_locations = res1.json();
                           // console.log(this.child_locations);
                          //  console.log(this.child_locations.geo_targets.length);
                            if (this.child_locations.geo_targets.length > 0) {
                                this.details = [];
                                for (let c in this.child_locations.geo_targets) {
                                    this.details[c] = ({
                                        id: this.child_locations.geo_targets[c].id,
                                        name: this.child_locations.geo_targets[c].name
                                    });
                                }
                                /*console.log('this.details');
                                console.log(this.details);*/
                                setTimeout(() => {
                                let link1 = this.serverurl + 'childlocation';
                                let data = {
                                    parentid: this.parent_locations.geo_targets[c].id,
                                    parentname: this.parent_locations.geo_targets[c].name,
                                    childlocation: this.details
                                }
                               /* console.log('=============');
                                console.log('this.parent_locations.geo_targets[c].id '+this.parent_locations.geo_targets[c].id);
                                console.log('this.parent_locations.geo_targets[c].name '+this.parent_locations.geo_targets[c].name);
                                console.log('????????????????????data');*/
                                console.log(data);
                                this._http.post(link1, data)
                                    .subscribe(res2 => {
                                    }, error => {
                                        console.log('Oooops!');
                                    });
                                }, 3000);
                            }
                        }, error => {
                            console.log('Oooops!');
                        });
                    }, 100);
                }
            }, error => {
                console.log('Oooops!');
            });


    }
}
