import { Component, OnInit } from '@angular/core';
import {LatLngLiteral, MapsAPILoader} from '@agm/core';
import {Http} from "@angular/http";
import {Commonservices} from '../app.commonservices' ;
import { ActivatedRoute, Params, Router } from '@angular/router';
import {CookieService} from 'angular2-cookie/core';

@Component({
    selector: 'app-cicrlemap',
    templateUrl: './cicrlemap.component.html',
    styleUrls: ['./cicrlemap.component.css'],
    providers: [Commonservices],
})
export class CicrlemapComponent implements OnInit {

    public serverurl;
    public lat: any;
    public lng: any;
    public mapval: any;
    markers: Array<LatLngLiteral> = [];

    constructor( private _http: Http, private mapsAPILoader: MapsAPILoader, emailcookie: CookieService, private router: Router, private route: ActivatedRoute, private _commonservices: Commonservices) {
        this.serverurl = _commonservices.url;
        this.mapval = false;
        this.mapval = true;
        this.lng = 7.815982;
        this.lat = 51.673858;
    }

    ngOnInit() {
/*
        this.markers = [
            {
                lat: 51.673858,
                lng: 7.815982,
            },
            {
                lat: 51.373858,
                lng: 7.215982,
            },
            {
                lat: 51.723858,
                lng: 7.895982,
            }
        ];*/
    }

}
