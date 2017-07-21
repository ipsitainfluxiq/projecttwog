import { Component, OnInit } from '@angular/core';
import {LatLngLiteral} from '@agm/core';
import {Http} from '@angular/http';
import {CookieService} from 'angular2-cookie/core';

@Component({
  selector: 'app-create-audience',
  templateUrl: './create-audience.component.html',
  styleUrls: ['./create-audience.component.css']
})
export class CreateAudienceComponent implements OnInit {
  private addcookie: CookieService;
  private cookiedetails;
  public browserselect;
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
  public lat: any;
  public lng: any;
  public mapval: any;
  public searchaddress: any;
  public checkuncheck;
  public key: any;
  public link;
  public divshow1;
  public getresult1: any;
  public result;
  public rand: any;
  public polyname: any;
  public polydelete: any;
  patharr: any = [];
  public fence: any = [];
  private temppath: Array<LatLngLiteral>= [];
  private polygonresult: any;
  paths: Array<LatLngLiteral> = [
    {lat: 25.774, lng: -80.190},
    {lat: 18.466, lng: -66.118},
    {lat: 32.321, lng: -64.757},
    {lat: 25.774, lng: -80.190}
  ]
  constructor(addcookie: CookieService, private _http: Http) {
    this.divshow1 = 0;
    this.addcookie = addcookie ;
    this.cookiedetails = this.addcookie.getObject('cookiedetails');
    console.log('cookiedetails');
    console.log('get id from saved cookie ->  ' + this.cookiedetails);
    this.link1 = 'http://simplyfi.influxiq.com/getgeoofence.php';
    this._http.get(this.link1)
        .subscribe(res => {
          this.getresult1 = res.json();
          console.log('-------------getresult1');
          console.log(this.getresult1);
          let y;
          this.patharr = [];
          for (y in this.getresult1.geo_fences) {
            this.fence.push({fencename : this.getresult1.geo_fences[y].name, fencecheckbox: false, fencecoordinates: this.getresult1.geo_fences[y].bid_area.coordinates[0]});
            console.log('is it complete?');
            console.log(this.fence);

            let a: any;
            this.temppath = [];
            for (a in this.getresult1.geo_fences[y].bid_area.coordinates[0]) {
              console.log('geofencesss___lat');
              this.temppath.push({lat: this.getresult1.geo_fences[y].bid_area.coordinates[0][a][1], lng: this.getresult1.geo_fences[y].bid_area.coordinates[0][a][0]});
            }
           // console.log('this.temppath__before null------------------');
           // console.log(this.temppath);
            this.patharr.push(this.temppath);
            this.temppath = [];
          }
        //  console.log('patharr------???');
        //  console.log(this.patharr);
        }, error1 => {
          console.log('Oooops!');
        });

    console.log('temppath null done??');
    console.log(this.temppath.length);
    /*    this.patharr = [];*/
  }

  ngOnInit() {
  }
  sendtype(type) {
    if (type == 1) {
      this.divshow1 = (1 - this.divshow1);
    }
  }
  select(type) {
    if (type == 1) {
      this.browserselect = 1;
    }
    if (type == 2) {
      this.dayparting = 1;
    }
    if (type == 3) {
      this.deals = 1;
    }
    if (type == 4) {
      this.device_types = 1;
    }
    if (type == 5) {
      this.locations = 1;
    }
    if (type == 6) {
      this.operating_systems = 1;
    }
    if (type == 7) {
      this.pacing = 1;
    }
    if (type == 8) {
      this.third_party_segments = 1;
    }
    if (type == 9) {
      this.viewability = 1;
    }
    if (type == 9) {
      this.website_filtering = 1;
    }
  }

  updatebrowsers() {
    let j = 0 ;
    console.log(this.select1);
    console.log('total no ' + j);
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
    this.link = 'http://simplyfi.influxiq.com/putgeoconversion.php';
    this._http.post(this.link, JSON.stringify(this.fence))
        .subscribe(res => {
          this.polygonresult = res.json();
        }, error => {
          console.log('Oooops!');
        });
    setTimeout(() => {
      console.log('after change');
      console.log(this.fence);
    }, 400);
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
