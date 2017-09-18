/**
 * Created by kta pc on 7/25/2017.
 */
import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
@Injectable()
export class Commonservices {
    items: Array<any>;
    url: any

    constructor(private http: Http) {
       // this.url = 'http://localhost:3004/';
        this.url = 'http://influxiq.com:3014/';
    }

/*    constructor(private http: Http) {
        if (window.location.hostname == 'localhost') {
            this.url = 'http://localhost:3004/';
        } else {
            this.url = 'http://influxiq.com:3014/';
        }
    }*/
}