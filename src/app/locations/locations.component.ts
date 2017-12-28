import { Component, NgZone, OnInit } from '@angular/core';
import {Http} from '@angular/http';
import {Commonservices} from '../app.commonservices' ;
import {CookieService} from 'angular2-cookie/core';
declare var google: any;
import { Router, ActivatedRoute, Params } from '@angular/router';

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
    public child_locations_level2: any = [];
    public details: any = [];
    public details1: any = [];
    public details2: any = [];
    private addcookie: CookieService;
    private cookiedetails;
    private emailcookie: CookieService;
    private mailcookiedetails;
    public serverurl: any;
    public datalist: any;
    public count: any;
    public result: any;
    public http;
    map: any;
    type: any;
    datanew: any = [];
    drawingManager: any;
    static ctype;
    static cradius;
    static ccenter;
    static ne_lat;
    static ne_lng;
    static sw_lat;
    static sw_lng;
    static poly_arr = [];
    static totalshapes = [];
    public currentval: any = [];
    public nameval: any = [];
    public locationnameforreverse: any;
    public locationidforreverse: any;
    public rand1: number;
    public uploadjson: any;
    private zone: NgZone;
    public basicOptions: Object;
    public uploadedfilesrc: any;
    public filenameis: any;
    private response: any = {};
    public  r_earth;
    public  lng;
    public  lat;
    public  pi;
    public  shapes: any = [];
    paths = [];
    public addressoflatlng = [];
    public inserttype: any;
    public showfencediv: any;
    public showlocationdiv: any;
    public error: any;
    public loadervalue: any;
    public excessdataerror: any;

    constructor(addcookie: CookieService, emailcookie: CookieService, private _http: Http, private router: Router, private route: ActivatedRoute, private _commonservices: Commonservices) {
        console.log('length is '+this.addressoflatlng.length);
        this.addcookie = addcookie;
        this.datanew = [];
        this.locationnameforreverse = 'Selectable Locations';
        this.count = 0;
        this.currentval.push(0);
        this.nameval.push(0);
        this.cookiedetails = this.addcookie.getObject('cookiedetails');
        this.emailcookie = emailcookie;
        this.mailcookiedetails = this.emailcookie.getObject('mailcookiedetails');
        this.serverurl = _commonservices.url;
        if (this.cookiedetails == null || this.cookiedetails == '' || typeof (this.cookiedetails) == 'undefined') {
            console.log('create it');
            this.createcampaign();
        } else {
            console.log('do nothing');
            this.getshapes();
        }
        this.getLocation();
        this.uploadjson = false;
        this.showlocationdiv = 0;
        this.showfencediv = 1;
        this.lng = -81.74123564;
        this.lat = 25.96782579;
        this.pi = 3.14159;
        this.r_earth = 6378;
    }
    hi() {
        this.showlocationdiv = (1 - this.showlocationdiv);
        this.showfencediv = (1 - this.showfencediv);
    }

    createcampaign() {
        console.log('Create called');
        this.rand1 = Math.round((Math.random() * 100) * 100);
        let link = this.serverurl + 'checkcreateaudienceid';
        let data = {
            randomvar: this.rand1,
        }
        this._http.post(link, data)
            .subscribe(res => {
                this.result = res.json();
                console.log(this.result.status);
                if (this.result.status == 'success') {
                    this.calltocreate();
                }
                else {
                    this.createcampaign();
                }
            }, err => {
                console.log('Ooops');
            } );
    }
    calltocreate() {
        console.log('created');
        this.addcookie.putObject('cookiedetails', this.rand1);
        this.cookiedetails = this.addcookie.getObject('cookiedetails');
        console.log('after putobject ' + this.cookiedetails);
        this.getshapes();
    }
    ngOnInit() {

        this.zone = new NgZone({enableLongStackTrace: false});
        this.basicOptions = {
            url: this.serverurl + 'uploads'
        };

        this.datanew = [];
        this.map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: 40.785091, lng: -73.968285 },
            zoom: 8
        });
        this.drawingManager = new google.maps.drawing.DrawingManager({
            drawingMode: google.maps.drawing.OverlayType.POLYGON,
            drawingControl: true,
            drawingControlOptions: {
                position: google.maps.ControlPosition.TOP_CENTER,
                drawingModes: ['polygon','circle','rectangle']
            }
        });
        this.drawingManager.setMap(this.map);
        google.maps.event.addListener(this.drawingManager, 'overlaycomplete', (event) => {
            // Polygon drawn
            if (event.type === google.maps.drawing.OverlayType.POLYGON) {
                // this is the coordinate, you can assign it to a variable or pass into another function.
                LocationsComponent.ctype = event.type;
                //  alert(event.overlay.getPath().getArray());
                LocationsComponent.poly_arr = event.overlay.getPath().getArray();
                LocationsComponent.totalshapes.push({
                    type: LocationsComponent.ctype,
                    poly_arr: LocationsComponent.poly_arr
                });
                // console.log('LocationsComponent ' +  LocationsComponent.poly_arr) ;
            }

            if (event.type === google.maps.drawing.OverlayType.CIRCLE) {
                // alert(event.overlay.getBounds());
            }
            if (event.type === google.maps.drawing.OverlayType.RECTANGLE) {
                LocationsComponent.ctype = event.type;
                LocationsComponent.ne_lat = event.overlay.getBounds().getNorthEast().lat();
                LocationsComponent.ne_lng = event.overlay.getBounds().getNorthEast().lng();
                LocationsComponent.sw_lat = event.overlay.getBounds().getSouthWest().lat();
                LocationsComponent.sw_lng = event.overlay.getBounds().getSouthWest().lng();
                LocationsComponent.totalshapes.push({
                    type: LocationsComponent.ctype,
                    ne_lat: LocationsComponent.ne_lat,
                    ne_lng: LocationsComponent.ne_lng,
                    sw_lat: LocationsComponent.sw_lat,
                    sw_lng: LocationsComponent.sw_lng,
                });
            }
            this.inserttype = 0;
        });

        google.maps.event.addListener(this.drawingManager, 'circlecomplete', function (circle) {
            var radius = circle.getRadius();
            //   alert(radius);

        });
        google.maps.event.addListener(this.drawingManager, 'overlaycomplete', function (event) {
            if (event.type == 'circle') {
                LocationsComponent.ctype = event.type;
                LocationsComponent.cradius = event.overlay.getRadius();
                LocationsComponent.ccenter = event.overlay.getCenter();
                LocationsComponent.totalshapes.push({
                    type: LocationsComponent.ctype,
                    cradius: LocationsComponent.cradius,
                    ccenter: LocationsComponent.ccenter,
                });
            }
            this.inserttype = 0;
        });
        //  this.addparentlocation();
        // this.callparentlocation();
    }

    addtolist(id, name) {
        this.selected_locations.push({attr_id: id, attr_name: name});
        console.log(this.selected_locations);
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
    }
    getjson() {
        console.log('ki hchche??');
        this.uploadjson = (1 - this.uploadjson);
    }
    handleUpload(data: any): void
    {
        this.loadervalue = true;
        console.log('hi' + this.loadervalue);
        console.log(data);
        this.zone.run(() => {
            this.response = data;
            let resp = data.response;
            console.log('resp');
            console.log((resp));
            console.log(typeof(resp));
            if (typeof(resp) != 'undefined') {
                let result = (data.response);
                console.log('result');
                console.log(result);
                if (result.length > 1) {
                    this.uploadedfilesrc = '../../assets/uploads/' + resp.replace(/"/g, '');
                    console.log('upload file location' + this.uploadedfilesrc);
                    this.filenameis = resp.replace(/"/g, '');
                    let link1 = this.serverurl + 'readcsv';
                    //  let link1 = 'http://influxiq.com:3004/readcsv';
                    let datam = {
                        filenameis: this.filenameis
                    }
                    this._http.post(link1, datam)
                        .subscribe(res => {
                            let resultvalue = res.json();
                            console.log('Success!');
                            console.log('lat lang of csv -');
                            console.log(resultvalue);
                            console.log('+++++++++');
                            if (resultvalue.flag == 1) {
                                for (let i in resultvalue.msg) {
                                    var ne = this.addressval_1(resultvalue.msg[i].lat, resultvalue.msg[i].lng, -0.0099779328 , -0.0099779328);
                                    var sw = this.addressval_1(resultvalue.msg[i].lat, resultvalue.msg[i].lng, 0.0099779328 , 0.0099779328);
                                    console.log('ne is: ');
                                    console.log(ne);
                                    console.log('sw is: ');
                                    console.log(sw);
                                    let latlngs = {
                                        ne_lat: ne.lat,
                                        sw_lat: sw.lat,
                                        ne_lng: sw.lng,
                                        sw_lng: ne.lng,
                                        address: resultvalue.msg[i].address,
                                        csvlat: resultvalue.msg[i].lat,
                                        csvlng: resultvalue.msg[i].lng
                                    };
                                    this.callrectangle(latlngs,1);
                                }
                                this.excessdataerror = '';
                            }
                            if (resultvalue.flag == 0) {
                                this.excessdataerror = resultvalue.msg;
                            }
                            if (resultvalue.flag == 2) {
                                this.excessdataerror = resultvalue.msg;
                            }
                          /*  for (let i in resultvalue) {
                                var ne = this.addressval_1(resultvalue[i].lat, resultvalue[i].lng, -0.0099779328 , -0.0099779328);
                                var sw = this.addressval_1(resultvalue[i].lat, resultvalue[i].lng, 0.0099779328 , 0.0099779328);
                                console.log('ne is: ');
                                console.log(ne);
                                console.log('sw is: ');
                                console.log(sw);
                                let latlngs = {
                                    ne_lat: ne.lat,
                                    sw_lat: sw.lat,
                                    ne_lng: sw.lng,
                                    sw_lng: ne.lng
                                };
                                this.callrectangle(latlngs,1);
                            }*/
                            this.inserttype = 1;
                            this.loadervalue = false;
                        }, error => {
                            console.log('Oooops!');
                        });
                }
            }
        });
    }
/*    getdetails() {
        console.log('getdetails');
        let link = this.serverurl + 'addresslist';
        console.log(link);
        this._http.get(link)
            .subscribe(res => {
                let result = res.json();
                this.userdetails = result.res;
                console.log('this.userdetails8888888');
                console.log(this.userdetails);
                for (let i in this.userdetails) {
                    this.temppath = [];
                    this.shapes = [];
                    this.temppath.push(this.addressval_1(this.userdetails[i].Latitude , this.userdetails[i].Longitude , -0.0099779328 , -0.0099779328));
                    this.temppath.push(this.addressval_1(this.userdetails[i].Latitude , this.userdetails[i].Longitude , 0.0099779328 , 0.0099779328));
                //    this.shapes = { type:"rectangle", ne_lat: this.lat, ne_lng: this.lng};
                    this.paths.push(this.temppath);
                }
                console.log('this.paths++++++++++++++++++++');
                console.log(this.paths);
            /!*    for(let k in this.paths) {
                    for (let j in this.paths[k]) {
                        let latlngs = {
                            ne_lat:,
                            sw_lat:,
                            ne_lng:,
                            sw_lng:
                        };
                    }
                    this.callrectangle(this.paths[k]);
                }*!/
            }, error => {
                console.log('Ooops');
            });
    }*/


    addressval_1(lat_new , lng_new , dy , dx) {
        lat_new = parseFloat(lat_new);
        lng_new = parseFloat(lng_new);
        console.log('lat_new ' + lat_new);
        console.log('lng_new ' + lng_new);
        console.log('dy ' + dy);
        console.log('dx ' + dx);
        console.log('++++++');
        let new_latitude  = lat_new + ((dy / this.r_earth ) * (180 / this.pi));
        let new_longitude = lng_new + (dx / this.r_earth ) * (180 / this.pi) / Math.cos(lat_new * this.pi / 180);
        console.log(new_latitude);
        console.log(new_longitude);
        console.log('*****');
        return  {lat: new_latitude , lng: new_longitude};
    }



    getLocation() {
        let link = this.serverurl + 'locationlist';
        let data = {
            parentid: 0,
        };
        this._http.post(link, data)
            .subscribe(res => {
                let result = res.json();
                this.datalist = result;
                console.log('this.datalist*************************');
                console.log(this.datalist);
            }, error => {
                console.log('Oooops!');
            });
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
                this.getLocation();
                return;
            }
        }
        console.log('id of clildlist ' + id);
        this.locationidforreverse = id;
        this.locationnameforreverse = name;
        console.log('childlist');
        this.parent_locations = [];


        let link = this.serverurl + 'locationlist';
        let data = {
            parentid: id,
        };
        console.log('data====0==');
        console.log(data);
        this._http.post(link, data)
            .subscribe(res => {
                let result = res.json();
                this.datalist=null;
                this.datalist = result;
                console.log('this.datalist-----------');
                console.log(this.datalist);
            }, error => {
                console.log('Oooops!');
            });
    }
    /*  addparentlocation() {
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
                let link1 = this.serverurl + 'parentlocation';
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
    }*/


    /*  callparentlocation() {
        this.parent_locations = [];
        let link = 'http://simplyfi.influxiq.com/updateaudience.php';
        this._http.get(link)
            .subscribe(res => {
                this.parent_locations = res.json();
                for (let c in this.parent_locations.geo_targets) {
                    this.addchildlocation(this.parent_locations.geo_targets[c].id);
                }
            }, error => {
                console.log('Oooops!');
            });
    }*/

    /* addchildlocation(parentid) {
        let link1 = 'http://simplyfi.influxiq.com/getchildlist.php?parent_id=' + parentid;
        this._http.get(link1)
            .subscribe(res1 => {
                this.child_locations = res1.json();
                if (this.child_locations.geo_targets.length > 0) {
                    this.details1 = [];
                    for (let c in this.child_locations.geo_targets) {
                        this.addit(this.child_locations.geo_targets[c].id);
                    }
                }
            }, error => {
                console.log('Oooops!');
            });
    }*/

    calltoadddchildlcation() {
        let link1 = this.serverurl + 'childlocation';
        let data = {
            childlocations: this.details1
        }
        console.log('data-----fg----');
        console.log(data);
        this._http.post(link1, data)
            .subscribe(res2 => {
            }, error => {
                console.log('Oooops!');
            });
    }

    /* addit(newparentid) {
        let link1 = 'http://simplyfi.influxiq.com/getchildlist.php?parent_id=' + newparentid;
        this._http.get(link1)
            .subscribe(res1 => {
                this.child_locations_level2 = res1.json();
                if (this.child_locations_level2.geo_targets.length > 0) {
                    this.details2 = [];
                    for (let c in this.child_locations_level2.geo_targets) {
                        this.details2[c] = ({
                            parentid: newparentid,
                            id: this.child_locations_level2.geo_targets[c].id,
                            name: this.child_locations_level2.geo_targets[c].name
                        });
                    }
                    let link3 = this.serverurl + 'childlocation';
                    let data = {
                        childlocations: this.details2
                    };
                    console.log('data============================');
                    console.log(data);
                    this._http.post(link3, data)
                        .subscribe(res => {
                        }, error => {
                            console.log('Oooops!');
                        });
                }
            }, error => {
                console.log('Oooops!');
            });
    }*/

    submitlocation(selected_locations) {
        console.log('this.fence----------------------------------');
        console.log(this.datanew.length);

        if (this.datanew.length > 0) {
            this.error = 'There were errors with your request: Geo targets Select either Location Targeting or Geo Fencing, but not both';
        } else {

            if (selected_locations < 1) {
                this.error = 'Geo targets Select at least 1 Location, Postal Code or Geo Fence';
            } else {
                this.error = '';
                console.log('this is here');
                let link = this.serverurl + 'locations';
                let data = {
                    selected_locations: selected_locations,
                    createaudienceid: this.cookiedetails,
                    email: this.mailcookiedetails,
                };
                this._http.post(link, data)
                    .subscribe(res => {
                        this.result = res.json();
                        // console.log(this.result);
                    }, error => {
                        console.log('Oooops!');
                    });
            }

        }
    }


    callforadd() {
        console.log('selected_locations-------------------');
        console.log(this.selected_locations.length);
        if (this.selected_locations.length > 0) {
            this.error = 'There were errors with your request: Geo targets Select either Location Targeting or Geo Fencing, but not both';
        }
        else {
            if (LocationsComponent.totalshapes.length < 1) {
                this.error = 'Geo targets Select at least 1 Location, Postal Code or Geo Fence';
            }
            else {
                this.error = '';
                if (this.inserttype == 0) {
                    this.datanew = [];
                    if ((LocationsComponent.totalshapes.length) > 0) {
                        for (let i in LocationsComponent.totalshapes) {
                            if (LocationsComponent.totalshapes[i].type == 'circle') {
                                this.datanew[i] = {
                                    email: this.mailcookiedetails,
                                    createaudienceid: this.cookiedetails,
                                    type: LocationsComponent.totalshapes[i].type,
                                    radius: LocationsComponent.totalshapes[i].cradius,
                                    center: LocationsComponent.totalshapes[i].ccenter
                                };
                            }
                            if (LocationsComponent.totalshapes[i].type == 'rectangle') {
                                this.datanew[i] = {
                                    email: this.mailcookiedetails,
                                    createaudienceid: this.cookiedetails,
                                    type: LocationsComponent.totalshapes[i].type,
                                    ne_lat: LocationsComponent.totalshapes[i].ne_lat,
                                    ne_lng: LocationsComponent.totalshapes[i].ne_lng,
                                    sw_lat: LocationsComponent.totalshapes[i].sw_lat,
                                    sw_lng: LocationsComponent.totalshapes[i].sw_lng
                                };
                            }
                            if (LocationsComponent.totalshapes[i].type == 'polygon') {
                                this.datanew[i] = {
                                    email: this.mailcookiedetails,
                                    createaudienceid: this.cookiedetails,
                                    type: LocationsComponent.totalshapes[i].type,
                                    path: LocationsComponent.totalshapes[i].poly_arr
                                };
                            }
                        }
                        console.log('this.datanew/////');
                        console.log(this.datanew);
                        let link = this.serverurl + 'insertshapes';
                        this._http.post(link, this.datanew)
                            .subscribe(res => {
                                let result11 = res.json();
                                if (result11.status == 'success') {
                                }
                                else {
                                }
                            }, error => {
                                console.log('Oooops!');
                            });
                    }
                    else {
                        console.log('there is no shapes');
                    }
                }
                if (this.inserttype == 1) {
                    console.log('inserrype is 1 here,dat means upload files wll b saved');
                    if ((LocationsComponent.totalshapes.length) > 0) {
                        for (let i in LocationsComponent.totalshapes) {
                            this.datanew[i] = {
                                email: this.mailcookiedetails,
                                createaudienceid: this.cookiedetails,
                                type: LocationsComponent.totalshapes[i].type,
                                ne_lat: LocationsComponent.totalshapes[i].ne_lat,
                                ne_lng: LocationsComponent.totalshapes[i].ne_lng,
                                sw_lat: LocationsComponent.totalshapes[i].sw_lat,
                                sw_lng: LocationsComponent.totalshapes[i].sw_lng
                            };
                        }
                        console.log('this.datanew for uoploads from csv');
                        console.log(this.datanew);
                        let link = this.serverurl + 'insertshapes';
                        this._http.post(link, this.datanew)
                            .subscribe(res => {
                                let result11 = res.json();
                                if (result11.status == 'success') {
                                }
                                else {
                                }
                            }, error => {
                                console.log('Oooops!');
                            });
                    }
                    else {
                        console.log('there is no shapes uploads from csv');
                    }
                }
            }
        }
    }

    getshapes() {
        console.log('call getshapes');
        // let link = 'http://localhost:3004/getallshapes';
        let link = this.serverurl + 'getallshapes';
        let data = {
            emailid: this.mailcookiedetails,
            createaudienceid: this.cookiedetails
        };
        this._http.post(link, data)
            .subscribe(res => {
                let result = res.json();
                console.log('result8888888988888888');
                console.log(result);
                console.log('result888888888888888');
                for(let i in result.value) {
                    if (result.value[i].type == 'rectangle') {
                        this.callrectangle(result.value[i], 0);
                    }
                    if (result.value[i].type == 'polygon') {
                        this.callpolygon(result.value[i].path);
                    }
                    if (result.value[i].type == 'circle') {
                        this.callcircle(result.value[i].center, result.value[i].radius);
                    }
                }
                console.log('go inside it');
                for (let j in result.locations) {
                    console.log(result.locations[j]);
                    this.addtolist(result.locations[j].attr_id,  result.locations[j].attr_name);
                }
            }, error => {
                console.log('Oooops!');
            });
    }

    callrectangle(latlangs, type) {
        if (type == 0) {
            console.log('callit');
            console.log(latlangs);
            var rectangle = new google.maps.Rectangle({
                strokeColor: '#FF0000',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: '#FF0000',
                fillOpacity: 0.35,
                map: this.map,
                bounds: {
                    north: latlangs.ne_lat,
                    south: latlangs.sw_lat,
                    east: latlangs.ne_lng,
                    west: latlangs.sw_lng
                }
            });
        }
        if (type == 1) {
            console.log ('call rectangle type 1');
            var rectangle = new google.maps.Rectangle({
                strokeColor: '#FF0000',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: '#FF0000',
                fillOpacity: 0.35,
                map: this.map,
                bounds: {
                    north: latlangs.ne_lat,
                    south: latlangs.sw_lat,
                    east: latlangs.ne_lng,
                    west: latlangs.sw_lng
                }
            });
            LocationsComponent.totalshapes.push({
                type: 'rectangle',
                ne_lat: latlangs.ne_lat,
                ne_lng: latlangs.ne_lng,
                sw_lat: latlangs.sw_lat,
                sw_lng: latlangs.sw_lng,
            });
            this.addressoflatlng.push({
                type: 'rectangle',
                ne_lat: latlangs.ne_lat,
                ne_lng: latlangs.ne_lng,
                sw_lat: latlangs.sw_lat,
                sw_lng: latlangs.sw_lng,
                address: latlangs.address,
                csvlat: latlangs.csvlat,
                csvlng: latlangs.csvlng,
            });
            console.log('upoload location-------');
            console.log(LocationsComponent.totalshapes);
            console.log(this.addressoflatlng);
            console.log('length ixs '+this.addressoflatlng.length);
        }
         /*this.addressoflatlng = LocationsComponent.totalshapes;
        console.log(this.addressoflatlng);*/
    }
    callpolygon(path) {
        // console.log(path);
        var PolyCoords = [];
        for (let j in path) {
            PolyCoords.push({
                lat: path[j].lat,
                lng: path[j].lng
            });
        }

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
    callcenteraddress(csvlat, csvlng) {
        csvlat = parseFloat(csvlat);
        csvlng = parseFloat(csvlng);

        this.map.setCenter({lat: csvlat, lng: csvlng});
        this.map.setZoom(16);

    }
    callcircle(latlng , radius) {
        var draw_circle = null;
        draw_circle = new google.maps.Circle({
            fillColor: '#000000',
            fillOpacity: .6,
            strokeWeight: 1,
            strokeColor: '#000000',
            draggable: true,
            editable: true,
            map: this.map,
            center: new google.maps.LatLng(latlng.lat, latlng.lng),
            radius: radius,
        });
    }
}
