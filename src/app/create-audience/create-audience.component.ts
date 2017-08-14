import { Component, OnInit } from '@angular/core';
import {LatLngLiteral} from '@agm/core';
import {Http} from '@angular/http';
import {CookieService} from 'angular2-cookie/core';
import { MapsAPILoader } from '@agm/core';

@Component({
    selector: 'app-create-audience',
    templateUrl: './create-audience.component.html',
    styleUrls: ['./create-audience.component.css']
})
export class CreateAudienceComponent implements OnInit {
    private addcookie: CookieService;
    private cookiedetails;
    public browserselect: any;
    public responsedaypart: any;
    public threshold_id: any;
    public dealdetails: any;
    public dayparting;
    public deals;
    public device_types;
    public locations;
    public operating_systems;
    public pacing;
    public third_party_segments;
    public viewability;
    public website_filtering;
    public select1 = false;
    public select2 = false;
    public select3 = false;
    public select4 = false;
    public select5 = false;
    public select6 = false;
    public select7 = false;
    public link1: any;
    public locationidforreverse: any;
    public locationnameforreverse: any;
    public chrome: any;
    public lat: any;
    public lng: any;
    public mapval: any;
    public searchaddress: any;
    public view: any;
    public checkuncheck;
    public key: any;
    public pacingval: any;
    public pacingval1: any;
    public showpace: any;
    public string1: any;
    public string2: any;
    public string3: any;
    public deallen: any;
    public oslen: any;
    public divshowpace = false;
    public paceenable: boolean= true;
    public link;
    public divshow1;
    public parent_locations: any = [];
    public pushdeals: any = [];
    public mainstringarray: any = [];
    public browserlists: any = [];
    public selected_locations: any = [];
    public selected_browsers: any = [];
    public selected_devices: any = [];
    public selected_os: any = [];
    public details: any = [];
    public allbrowsers: any = [];
    public alldevices: any = [];
    public allos: any = [];
    public devicelist: any = [];
    public oslist: any = [];
    public getresult1: any;
    public result;
    public applyforall;
    public rand: any;
    public viewabilitis: any = [];
    public daypartval: any = [];
    public len: any;
    public len1: any;
    public currentval: any = [];
    public nameval: any = [];
    public count: any;
    public polyname: any;
    public polydelete: any;
    patharr: any = [];
    public fence: any = [];
    public error: any;
    public paceerror: any;
    private bounds: any = [];
    private temppath: Array<LatLngLiteral>= [];
    private allcoordinates: Array<LatLngLiteral>= [];
    private polygonresult: any;
    paths: Array<LatLngLiteral> = [
        {lat: 25.774, lng: -80.190},
        {lat: 18.466, lng: -66.118},
        {lat: 32.321, lng: -64.757},
        {lat: 25.774, lng: -80.190}
    ]
    public values: any;
    public show_locations: any = [];
    private fence_length: string;
    private allbrowserslist: any = [];
    private alldevicelist: any = [];
    private alloslist: any = [];
    private getbrowser: any = [];
    private getdevice: any = [];
    private getos: any = [];
    private getdeal: any = [];
    constructor(addcookie: CookieService, private _http: Http, private mapsAPILoader: MapsAPILoader) {
        this.daypartval[1] = '111111111111111111111111';
        this.daypartval[2] = '111111111111111111111111';
        this.daypartval[3] = '111111111111111111111111';
        this.daypartval[4] = '111111111111111111111111';
        this.daypartval[5] = '111111111111111111111111';
        this.daypartval[6] = '111111111111111111111111';
        this.daypartval[7] = '111111111111111111111111';
        this.pushdeals = [] ;
        this.browserselect = 0;
        this.deals = 0;
        this.device_types = 0;
        this.locations = 0;
        this.pacing = 0;
        this.viewability = 0;
        this.view = 'No minimum';
        this.operating_systems = 0;
        this.dayparting = 0;
        this.currentval.push(0);
        this.nameval.push(0);
        this.count = 0;
        this.pacingval = 100.00;
        this.paceerror = '';
        this.showpace = 'Automated Pacing Enabled - 100.0%';
        // this.locationidforreverse = 'Selectable Locations';
        this.locationnameforreverse = 'Selectable Locations';
        this.divshow1 = 0;
        this.addcookie = addcookie ;
        this.cookiedetails = this.addcookie.getObject('cookiedetails');
        console.log('cookiedetails');
        console.log('get id from saved cookie ->  ' + this.cookiedetails);
        this.link1 = 'http://simplyfi.influxiq.com/getgeoofence.php?id=' + this.cookiedetails ;
        this._http.get(this.link1)
            .subscribe(res => {
                this.getresult1 = res.json();
                console.log('-------------getresult1');
                console.log(this.getresult1);
                let y;
                this.patharr = [];
                for (y in this.getresult1.geo_fences) {
                    if (this.getresult1.geo_fences[y].geo_fence_type_name == 'Target') {
                        this.fence.push({
                            fencename: this.getresult1.geo_fences[y].name,
                            fencecheckbox: false,
                            fencecoordinates: this.getresult1.geo_fences[y].bid_area.coordinates[0]
                        });
                        console.log('is it complete?');
                        console.log(this.fence);
                        this.fence_length = this.fence.length + ' Geo Fence';
                        console.log(this.fence_length);
                        let a: any;
                        this.temppath = [];
                        for (a in this.getresult1.geo_fences[y].bid_area.coordinates[0]) {
                            console.log('geofencesss___lat');
                            this.temppath.push({
                                lat: this.getresult1.geo_fences[y].bid_area.coordinates[0][a][1],
                                lng: this.getresult1.geo_fences[y].bid_area.coordinates[0][a][0]
                            });

                            this.allcoordinates.push({
                                lat: this.getresult1.geo_fences[y].bid_area.coordinates[0][a][1],
                                lng: this.getresult1.geo_fences[y].bid_area.coordinates[0][a][0]
                            });

                        }
                        this.patharr.push(this.temppath);
                        this.temppath = [];
                    }
                }

                this.mapsAPILoader.load().then(() => {
                    this.bounds = new window['google'].maps.LatLngBounds();
                    for (let i = 0; i <  this.allcoordinates.length; i++) {
                        this.bounds.extend( this.allcoordinates[i]);
                    }
                });

            }, error1 => {
                console.log('Oooops!');
            });

        console.log('temppath null done??');
        console.log(this.temppath.length);
        this.parent_locations = [];
        this.link = 'http://simplyfi.influxiq.com/updateaudience.php';
        this._http.get(this.link)
            .subscribe(res => {
                this.parent_locations = res.json();
                console.log(this.parent_locations);
                for ( let c in this.parent_locations.geo_targets) {
                    this.details[c] = this.parent_locations.geo_targets[c];
                }
                console.log(this.details);
            }, error => {
                console.log('Oooops!');
            });

        this.link = 'http://simplyfi.influxiq.com/get_geo_target.php';
        let data = {
            id: this.cookiedetails
        };
        this._http.post(this.link, data)
            .subscribe(res => {
                this.values = res.json();
                console.log('this.values');
                console.log(this.values);
                for (let v in this.values.geo_targets) {
                    // this.selected_locations.push({attr_id: this.values.geo_targets.id, attr_name: this.values.geo_targets.name});
                    this.addtolist(this.values.geo_targets[v].id,  this.values.geo_targets[v].name);
                    console.log(this.values.geo_targets[v].id,  this.values.geo_targets[v].name);
                }
            }, error => {
                console.log('Oooops!');
            });

        this.link = 'http://simplyfi.influxiq.com/browserlist.php';
        this._http.get(this.link)
            .subscribe(res => {
                this.browserlists = res.json();
                this.allbrowsers = [];
                for ( let f in this.browserlists.browsers) {
                    this.allbrowsers[f] = this.browserlists.browsers[f];
                    this.allbrowserslist[this.browserlists.browsers[f].id] = false;
                }

            }, error => {
                console.log('Oooops!');
            });

        this.link = 'http://simplyfi.influxiq.com/devicelist.php';
        this._http.get(this.link)
            .subscribe(res => {
                this.devicelist = res.json();
                // console.log('======================');
                console.log(this.devicelist);
                this.alldevices = [];
                for ( let f in this.devicelist.devices) {
                    this.alldevices[f] = this.devicelist.devices[f];
                    this.alldevicelist[this.devicelist.devices[f].id] = false;
                }

            }, error => {
                console.log('Oooops!');
            });

        this.link = 'http://simplyfi.influxiq.com/oslist.php';
        this._http.get(this.link)
            .subscribe(res => {
                this.oslist = res.json();
               // console.log(this.oslist);
                this.allos = [];
                for ( let g in this.oslist.operating_systems) {
                    this.allos[g] = this.oslist.operating_systems[g];
                    this.alloslist[this.oslist.operating_systems[g].id] = false;
                }
                console.log(this.oslist.operating_systems);
                console.log('[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[');
                console.log(this.oslist.operating_systems.length);
            }, error => {
                console.log('Oooops!');
            });


        this.link = 'http://simplyfi.influxiq.com/getpace.php?id=' + this.cookiedetails;
        console.log(this.link);
        this._http.get(this.link)
            .subscribe(res => {
                this.pacingval1 = res.json();
                this.pacingval = this.pacingval1.campaigns[0].pacing;
                if (this.pacingval1.campaigns[0].automated_pacing_enabled == true) {
                    // this.showpace = 'Automated Pacing Enabled - 100.0%';
                    this.showpace = 'Automated Pacing Enabled- ' + this.pacingval1.campaigns[0].pacing + '.00%';
                    console.log('hi');
                    console.log(this.showpace);
                }
                else{
                    this.pacingval = this.pacingval1.campaigns[0].pacing;
                    console.log('val 2 is ' + this.pacingval);
                this.showpace = this.pacingval1.campaigns[0].pacing + '.00%';
                }
            }, error => {
                console.log('Oooops!');
            });


        this.link = 'http://simplyfi.influxiq.com/getpace.php?id=' + this.cookiedetails; // this is for viewablity
        this._http.get(this.link)
            .subscribe(res => {
                this.view = res.json();
                this.view = this.view.campaigns[0].viewability;
                console.log(this.view);

          if(this.view == 'Not Set') {
            this.view = 'None';
          }
            }, error => {
                console.log('Oooops!');
            });


        this.link = 'http://simplyfi.influxiq.com/getpace.php?id=' + this.cookiedetails; // this is for dayparting
        this._http.get(this.link)
            .subscribe(res => {
                this.responsedaypart = res.json();
                console.log(this.responsedaypart.campaigns[0].week_dayparting);
                for (let i in this.responsedaypart.campaigns[0].week_dayparting) {
                    let tempval : any = [];
                    tempval.from = this.responsedaypart.campaigns[0].week_dayparting[i][0];
                    tempval.to = this.responsedaypart.campaigns[0].week_dayparting[i][this.responsedaypart.campaigns[0].week_dayparting[i].length - 1];
                    this.myOnChange(tempval, i );
                }
            }, error => {
                console.log('Oooops!');
            });


        this.link = 'http://simplyfi.influxiq.com/getbrowser.php?id=' + this.cookiedetails;
        this._http.get(this.link)
            .subscribe(res => {
                this.getbrowser = res.json();
                console.log(this.getbrowser);
                if (this.allbrowserslist.length > 0) {
                    for (let x in this.getbrowser.browsers) {
                        // console.log(this.getbrowser.browsers[x]);
                        this.allbrowserslist[ this.getbrowser.browsers[x].id] = true;
                    }
                    this.len = this.getbrowser.browsers.length;
                    if (this.len == 0) {
                        this.len = 'None';
                    }
                    if (this.len == 1) {
                        this.len = '1 Browser';
                    }
                    if (this.len > 1 && this.len < 7) {
                        this.len = this.len + ' Browsers';
                    }
                    if (this.len == 7) {
                        this.len = 'Any';
                    }
                }
            }, error => {
                console.log('Oooops!');
            });

        this.link = 'http://simplyfi.influxiq.com/getdevice.php?id=' + this.cookiedetails;
        this._http.get(this.link)
            .subscribe(res => {
                this.getdevice = res.json();
                console.log(this.getdevice);
                if (this.alldevicelist.length > 0) {
                    for (let x in this.getdevice.devices) {
                        this.alldevicelist[ this.getdevice.devices[x].id] = true;
                    }
                    this.len1 = this.getdevice.devices.length;
                    if (this.len1 == 0) {
                        this.len1 = 'None';
                    }
                    if (this.len1 == 1) {
                        this.len1 = '1 Device Type';
                    }
                    if (this.len1 > 1 && this.len1 < 7) {
                        this.len1 = this.len1 + ' Device Types';
                    }
                    if (this.len1 == 4) {
                        this.len1 = 'Any';
                    }
                }
            }, error => {
                console.log('Oooops!');
            });


        this.link = 'http://simplyfi.influxiq.com/getos.php?id=' + this.cookiedetails;
        this._http.get(this.link)
            .subscribe(res => {
                this.getos = res.json();
                console.log(this.getos);
                console.log('is it working or not?');
                if (this.alloslist.length > 0) {
                    for (let x in this.getos.operating_systems) {
                        this.alloslist[ this.getos.operating_systems[x].id] = true;
                    }
                    this.oslen = this.getos.operating_systems.length;
                    if (this.oslen == 0) {
                        this.oslen = 'None';
                    }
                    if (this.oslen == 1) {
                        this.oslen = '1 Operating System';
                    }
                    if (this.oslen > 1 && this.oslen < 17) {
                        this.oslen = this.oslen + ' Operating Systems';
                    }
                    if (this.oslen == 17) {
                        this.oslen = 'Any';
                    }
                }


            }, error => {
                console.log('Oooops!');
            });




        this.link = 'http://simplyfi.influxiq.com/getdeal.php?id=' + this.cookiedetails;
        this._http.get(this.link)
            .subscribe(res => {
                this.getdeal = [];
                this.getdeal = res.json();
                for (let i in this.getdeal.deals[0].identifiers) {
                    this.pushdeals.push(this.getdeal.deals[0].identifiers[i].identifier);
                }
               // console.log('getdeal========================================================================');
                // console.log(this.getdeal);
                this.deallen = this.getdeal.deals[0].identifiers.length;
              //  console.log(this.getdeal.deals[0].identifiers.length);
                console.log(this.deallen);
                if (this.deallen == 0) {
                    this.deallen = 'None';
                }
                if (this.deallen == 1) {
                    this.deallen = '1 deal';
                }
                if (this.deallen > 1) {
                    this.deallen = this.deallen + ' deals';
                }
                console.log(this.deallen);
            }, error => {
                console.log('Oooops!');
            });
    }

    ngOnInit() {
        this.viewabilitis = ['No minimum', 'Good', 'Better', 'Best'];

    }
    addtolist(id, name) {
        this.selected_locations.push({attr_id: id, attr_name: name});
        console.log(this.selected_locations);
        if (this.selected_locations.length > 6) {
            this.show_locations = [];
            this.show_locations.push({attr_name: this.selected_locations.length + ' Countries'}) ;
        }
        else {
            // this.show_locations=[];
            this.show_locations.push({attr_id: id, attr_name: name});
        }
        console.log('give me the values');
        console.log(this.show_locations);
    }


    deletelocations(id, name, item) {
        console.log('deletelocations==================');
        console.log(this.selected_locations);
        console.log(id);
        let indexval: any = this.selected_locations.indexOf(item);
        console.log('-----------------');
        console.log(indexval);
        this.selected_locations.splice(indexval, 1);
        console.log(this.selected_locations);
        if (this.selected_locations.length > 6) {
            this.show_locations = [];
            this.show_locations.push({attr_name: this.selected_locations.length + ' Countries'}) ;
            // this.show_locations.splice(indexval, 1) + ' Countries';
        } else {
            // this.show_locations.push({attr_id: id, attr_name: name});
            this.show_locations.splice(indexval, 1);
        }
    }
    getzerostring(length, type) {
        if (type == 1) {                              // 1st call
            this.string2 = '';
            for ( let i = 0; i < length; i++) {
                this.string2 = this.string2.toString() + 0;
            }
            //  console.log(this.string2);
        }
        if (type == 0) {                               // 3rd call
            this.string3 = '';
            for ( let i = 0; i < length; i++) {
                this.string3 = this.string3.toString() + 0;
            }
        }
    }
    getonestring(length) {                               // 2nd call
        this.string1 = '';
        for ( let i = 0; i < length; i++) {
            this.string1 = this.string1.toString() + 1;
        }
        // console.log(this.string1);
    }

    updatedaypart() {
        //  console.log(this.daypartval);
        let data = {
            id: this.cookiedetails,
            dayparting: this.daypartval
        }
        console.log('updatedaypart');
        console.log(data);
        this.link = 'http://simplyfi.influxiq.com/updatedaypart.php';
        this._http.post(this.link, data)
            .subscribe(res => {
                this.result = res.json();
            }, error => {
                console.log('Oooops!');
            });
        //  this.daypartval = [];
        this.dayparting = 0;
    }
    myOnUpdate(val: any ) {
    }

    myOnChange(val: any, type ) {
        console.log(val);
        console.log(type);
        let length = parseInt (val.to) - parseInt (val.from);
        this.getzerostring(val.from, 1 );
        this.getonestring(length);
        this.getzerostring(24 - parseInt (val.to), 0);
        this.daypartval[type] = this.string2.toString() + this.string1.toString() + this.string3.toString();
        // console.log(this.daypartval);
    }

    myOnFinish(val: any, type ) {
        // console.log('hello');
    }
    childlist(id, name, type) {
        if (type == 1) {
            this.count++;
            this.currentval[this.count] = id;
            this.nameval[this.count] = name;
        }
        if (type == 2) {
            this.count--;
            id = this.currentval[this.count];
            name = this.nameval[this.count];
            if (id == 0) {
                this.locationnameforreverse = 'Selectable locations';
                this.getbackparentlist();
                return;
            }
        }
        console.log('id of clildlist '+ id);
        this.locationidforreverse = id;
        this.locationnameforreverse = name;
        console.log('childlist');
        this.parent_locations = [];

        this.link = 'http://simplyfi.influxiq.com/getchildlist.php?parent_id=' + id;
        this._http.get(this.link)
            .subscribe(res => {
                this.parent_locations = res.json();
                console.log(this.parent_locations);
                console.log(this.parent_locations.geo_targets.length);
                if (this.parent_locations.geo_targets.length > 0) {
                    this.details = [];
                    for ( let c in this.parent_locations.geo_targets) {
                        this.details[c] = this.parent_locations.geo_targets[c];
                    }
                }
            }, error => {
                console.log('Oooops!');
            });

    }

    getbackparentlist(){
        this.parent_locations = [];
        this.details = [];
        this.link = 'http://simplyfi.influxiq.com/updateaudience.php';
        this._http.get(this.link)
            .subscribe(res => {
                this.parent_locations = res.json();
                console.log(this.parent_locations);
                for ( let c in this.parent_locations.geo_targets) {
                    this.details[c] = this.parent_locations.geo_targets[c];
                }
            }, error => {
                console.log('Oooops!');
            });
    }
    submitlocation(selected_locations) {
        console.log('this.fence----------------------------------');
        console.log(this.fence.length);
        if (this.fence.length > 0) {
            this.error = 'There were errors with your request: Geo targets Select either Location Targeting or Geo Fencing, but not both';
        } else {
            this.link = 'http://simplyfi.influxiq.com/add_geo_target.php';
            let data = {
                selected_locations: JSON.stringify(selected_locations),
                id: this.cookiedetails
            };
            this._http.post(this.link, data)
            //  this._http.post(this.link, selected_locations)
                .subscribe(res => {
                    this.result = res.json();
                    // console.log(this.result);
                }, error => {
                    console.log('Oooops!');
                });
        }
    }


    updatebrowsers(selected_browsers) {
        console.log(this.allbrowserslist);
        for (let x in this.allbrowserslist) {
            if (this.allbrowserslist[x] == true) {
                this.selected_browsers.push({attr_id: x });
            }
        }
        let data = {
            id: this.cookiedetails,
            campaigndetails: {
                browser_ids: JSON.stringify(selected_browsers),
            }
        }
        console.log('updatebrowsers');
        console.log(data);
        this.doupdate(data);
        this.len = this.selected_browsers.length;
        if (this.len == 0) {
            this.len = 'None';
        }
        if (this.len == 1) {
            this.len = '1 Browser';
        }
        if (this.len > 1 && this.len < 7) {
            this.len = this.len + ' Browsers';
        }
        if (this.len == 7) {
            this.len = 'Any';
        }
        this.selected_browsers = [];
        this.browserselect = 0;
    }

    onChange() {
        setTimeout(() => {
            console.log('hi');
            console.log(this.paceenable) ;
            if (this.paceenable == true) {   //on
                this.divshowpace = false;
              //  this.showpace = 'Automated Pacing Enabled - 100.0%';
                this.showpace = 'Automated Pacing Enabled- ' + this.pacingval + '.00%';
            }
            else {   //off
                this.divshowpace = true;
            }
        }, 300);
    }

    updatepacing(pacingval) {
        if (pacingval > 100) {
            this.paceerror = 'Pacing must be less than or equal to 100';
        }
        else {
            this.paceerror = '';
            this.showpace = pacingval + '.00%';
            let data = {
                id: this.cookiedetails,
                campaigndetails: {
                    pacing: pacingval
                }
            }
            console.log(data);
            this.doupdate(data);
            this.pacing = 0;
        }

    }

    selectview(view) {
        console.log(view);
/*        if(this.view == 'Not Set') {
            this.view = 'None';
        }*/
     //   if (view == 'No Minimum') {
        if (view == 'No minimum') {
            this.threshold_id = null;
            this.view = 'None';
        }
        if (view == 'Good') {
            this.threshold_id = 1;
            this.view = 'Good';
            console.log(this.threshold_id);
        }
        if (view == 'Better') {
            this.threshold_id = 2;
            this.view = 'Better';
        }
        if (view == 'Best') {
            this.threshold_id = 3;
            this.view = 'Best';
        }
        let data = {
            id: this.cookiedetails,
            campaigndetails: {
                integral_viewability_threshold_id: this.threshold_id
            }
        }
        console.log(data);
        this.doupdate(data);
        this.viewability = 0;
      //  $("[name='my-checkbox']").bootstrapSwitch();
    }


    updatedevice() {
        console.log(this.alldevicelist);
        for (let x in this.alldevicelist){
            if (this.alldevicelist[x] == true) {
                this.selected_devices.push({attr_id: x });
            }
        }
        let data = {
            id: this.cookiedetails,
            campaigndetails: {
                device_ids: JSON.stringify(this.selected_devices),
            }
        }
        console.log('updatedevice');
        console.log(data);
        this.doupdate(data);
        this.len1 = this.selected_devices.length;
        if (this.len1 == 0) {
            this.len1 = 'None';
        }
        if (this.len1 == 1) {
            this.len1 = '1 Device Type';
        }
        if (this.len1 > 1 && this.len1 < 4) {
            this.len1 = this.len1 + ' Device Types';
        }
        if (this.len1 == 4) {
            this.len1 = 'Any';
        }
        this.selected_devices = [];
        this.device_types = 0;

    }

    updateos() {
        console.log(this.alloslist);
        for (let x in this.alloslist) {
            if (this.alloslist[x] == true) {
                this.selected_os.push({attr_id: x});
            }
        }
        let data = {
            id: this.cookiedetails,
            operating_system_ids: this.selected_os
        }
        console.log('updateos');
        console.log(data);
        this.link = 'http://simplyfi.influxiq.com/updateos.php';
        this._http.post(this.link, data)
            .subscribe(res => {
                this.result = res.json();
            }, error => {
                console.log('Oooops!');
            });
        this.oslen = this.selected_os.length;
        if (this.oslen == 0) {
            this.oslen = 'None';
        }
        if (this.oslen == 1) {
            this.oslen = '1 Operating System';
        }
        if (this.oslen > 1 && this.oslen < 17) {
            this.oslen = this.oslen + ' Operating Systems';
        }
        if (this.oslen == 17) {
            this.oslen = 'Any';
        }
        this.selected_os = [];
        this.operating_systems = 0;
    }


    adddeals(dealdetails) {
        this.pushdeals.push(dealdetails);
        console.log(this.pushdeals);
        this.dealdetails = '';
    }
    updatedeal(pushdeals) {
       /* console.log(this.pushdeals);*/
        let data = {
            id: this.cookiedetails,
            deals: this.pushdeals
        }
/*        console.log('99999999999999999999999');
        console.log(data); */
        this.deallen = data.deals.length;

        if (this.deallen == 0) {
            this.deallen = 'None';
        }
        if (this.deallen == 1) {
            this.deallen = '1 deal';
        }
        if (this.deallen > 1) {
            this.deallen = this.deallen + ' deals';
        }

        this.link = 'http://simplyfi.influxiq.com/updatedeal.php';
        this._http.post(this.link, data)
            .subscribe(res => {
                this.result = res.json();
            }, error => {
                console.log('Oooops!');
            });
        this.deals = 0;
    }
    deletedeal(item) {
        let indexval: any = this.pushdeals.indexOf(item);
        console.log('-----------------');
        console.log('-----------------');
        console.log(indexval);
        this.pushdeals.splice(indexval, 1);
        console.log(this.pushdeals);



    }

    doupdate(data: any) {
        this.link = 'http://simplyfi.influxiq.com/update_campaign.php';
        this._http.post(this.link, data)
            .subscribe(res => {
                this.result = res.json();
            }, error => {
                console.log('Oooops!');
            });
    }

    select(type) {
        if (type == 1) {
            console.log('111111111111111111111111111111111');
            this.browserselect = (1 - this.browserselect);
        }
        if (type == 2) {
            this.dayparting = (1 - this.dayparting);
        }
        if (type == 3) {
            this.deals = (1 - this.deals);
        }
        if (type == 4) {
            this.device_types = (1 - this.device_types);
        }
        if (type == 5) {
            // this.locations = 1;
            console.log(this.locations);
            this.locations = (1 - this.locations);
        }
        if (type == 6) {
            this.operating_systems = (1 - this.operating_systems);
        }
        if (type == 7) {
            this.pacing = (1 - this.pacing);
        }
        if (type == 8) {
            this.third_party_segments = 1;
        }
        if (type == 9) {
            this.viewability = (1 - this.viewability);
        }
        if (type == 9) {
            this.website_filtering = 1;
        }
    }

    initializeval() {
        this.lat = 51.678418;
        this.lng = -7.809007;
        this.mapval = false;
        this.mapval = true;
    }

    searchlatlng(char) {
        this.key = char.keyCode;
        this.link = 'http://maps.google.com/maps/api/geocode/json?address=' + this.searchaddress;
        if (this.key == '13') {
            this._http.get(this.link)
                .subscribe(res => {
                    this.result = res.json();
                    // console.log('searchbox');
                    // console.log(this.result);
                    // console.log(this.result.results[0].geometry.location.lat);
                    // console.log(this.result.results[0].geometry.location.lng);
                    this.lat = this.result.results[0].geometry.location.lat;
                    this.lng = this.result.results[0].geometry.location.lng;
                    this.mapval = false;
                    this.mapval = true;
                }, err => {
                    console.log('Ooops');
                });
        }
    }

    createsh(type) {
        console.log('this.temppath at start---------????????????????????????????????');
        console.log(this.temppath);
        console.log(this.temppath.length);
        // this.temppath = [];
        if (this.temppath.length != 0) {
            this.rand = Math.round((Math.random() * 10) * 10);
            this.polyname = 'polygon' + this.rand;
            let temparr: Array<any> = [];
            let temparrval: Array<any> = [];
            let x: any;
            for (x in this.temppath) {
                console.log(this.temppath[x].lat);
                console.log(this.temppath[x].lng);
                console.log(temparr);
                temparrval = [];
                temparrval.push(this.temppath[x].lng);
                temparrval.push(this.temppath[x].lat);
                console.log(temparrval);
                temparr.push(temparrval);
            }
            let polyshape: any = {
                fencename: this.polyname,
                fencecoordinates: temparr,
                fencecheckbox: false
            }
            console.log(polyshape);
            this.fence.push(polyshape);
            console.log('polyshape details ');
            console.log(this.fence);
        }
        this.temppath = [] ;
    }

    mapClicked($event: any) {
        console.log('mapclicked');
        // console.log($event.coords.lat);
        // console.log($event.coords.lng);
        // this.temppath.push({lat:$event.coords.lat,lng:$event.coords.lng});
        this.temppath.push($event.coords);
        console.log(this.temppath);
        console.log('this.patharr');
        console.log(this.patharr);
        if (this.temppath.length == 2) {
            this.patharr.push(this.temppath);
        }
        if (this.temppath.length > 2) {
            // this.patharr.push(this.paths1);
            console.log('in 2>');
            this.patharr.pop();
            setTimeout(() => {
                // this.patharr=this.patharr.slice(0,1);
                this.patharr.push(this.temppath);
            }, 300);
        }
    }

    mapdelete() {
        // console.log(this.polydelete);
        if (this.polydelete == 'removeall') {
            this.fence = [];
            this.patharr = [];
            this.polydelete = 'Actions';
        }
        if (this.polydelete == 'removeselected') {
            console.log('removeselected');
            for (let i in this.fence) {
                if ( this.fence[i].fencecheckbox == true ) {
                    this.fence.splice(i, 1);
                    this.patharr.splice(i, 1);
                }
                this.polydelete = 'Actions';
            }
        }

    }

    savepolygon() {
        this.fence_length = this.fence.length + ' Geo Fence';

        console.log('selected_locations-------------------');
        console.log(this.selected_locations.length);
        if (this.selected_locations.length > 0) {
            this.error = 'There were errors with your request: Geo targets Select either Location Targeting or Geo Fencing, but not both';
        }
        else {
            this.link = 'http://simplyfi.influxiq.com/putgeofence.php';
            let data = {
                fence: JSON.stringify(this.fence),
                id: this.cookiedetails
            };
            // this.link = 'http://simplyfi.influxiq.com/putgeoconversion.php';
            // this._http.post(this.link, JSON.stringify(this.fence))
            this._http.post(this.link, data)
                .subscribe(res => {
                    this.polygonresult = res.json();
                    console.log('this.polygonresult++++++++++++++++++++++++++++++++++++++++++++++++');
                    console.log(this.polygonresult);
                }, error => {
                    console.log('Oooops!');
                });
            setTimeout(() => {
                console.log('after change');
                console.log(this.fence);
            }, 400);
        }
    }
    allcheck() {
        setTimeout(() => {
            console.log(this.checkuncheck);
            if (this.checkuncheck == true) {
                for (let i in this.fence) {
                    this.fence[i].fencecheckbox = true;
                }
            }
            if (this.checkuncheck == false) {
                for (let i in this.fence) {
                    this.fence[i].fencecheckbox = false;
                }
            }
        }, 400);
    }

    deletepolyshape( item: any ) {
        console.log('fence total');
        console.log(this.fence);
        let indexval: any = this.fence.indexOf(item);
        console.log('-----------------');
        console.log('-----------------');
        console.log(indexval);
        this.fence.splice(indexval, 1);
        this.patharr.splice(indexval, 1);
        // console.log('fence after poprr');
        // console.log(this.fence);
    }

}
