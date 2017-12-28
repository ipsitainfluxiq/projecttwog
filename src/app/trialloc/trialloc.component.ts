import { Component, OnInit } from '@angular/core';
import {Http} from '@angular/http';
import {Commonservices} from '../app.commonservices' ;
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-trialloc',
  templateUrl: './trialloc.component.html',
  styleUrls: ['./trialloc.component.css'],
    providers: [Commonservices]
})
export class TriallocComponent implements OnInit {
    public datalist: any;
    public serverurl: any;
  constructor(private _http: Http, private router: Router, private route: ActivatedRoute, private _commonservices: Commonservices) {
      this.serverurl = _commonservices.url;
      this.getLocation();
  }

  ngOnInit() {

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
}
