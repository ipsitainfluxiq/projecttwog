import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder} from '@angular/forms';
import {Http} from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Commonservices} from '../app.commonservices' ;

@Component({
  selector: 'app-adbannerlist',
  templateUrl: './adbannerlist.component.html',
  styleUrls: ['./adbannerlist.component.css'],
    providers: [Commonservices],
})
export class AdbannerlistComponent implements OnInit {
    private fb;
    public datalist;
    public id;
    orderbyquery: any;
    orderbytype: any;
    private isModalShown: boolean = false;
    public serverurl;
    public pageno;
    public pagestart;
    public pageinitation;
    public totalpage;
    public showrows;
    public list_length;
    public userlist;

    constructor(fb: FormBuilder, private _http: Http,  private router: Router, private _commonservices: Commonservices) {
        this.fb = fb;
        this.orderbyquery = 'adbannername';
        this.orderbytype = 1;
        this.serverurl = _commonservices.url;
        this.showrows = 5;
        this.pageno = 1;
        this.pagestart = 0;
        this.pageinitation = 5;
        this.getAdbannerList();
        this.getuserList();
    }

    ngOnInit() {
    }
    getAdbannerList() {
        let link = this.serverurl + 'adbannerlist';
        this._http.get(link)
            .subscribe(res => {
                let result = res.json();
                this.datalist = result.res;
                this.list_length = result.res.length;
                this.totalpage = this.list_length / this.showrows ;
                if (this.totalpage != parseInt(this.totalpage)) {
                    this.totalpage = parseInt(this.totalpage) + 1;
                }
                console.log(this.datalist);
            }, error => {
                console.log('Oooops!');
            });
    }

    getuserList() {
        let link = this.serverurl + 'userlist';
        this._http.get(link)
            .subscribe(res => {
                let result = res.json();
                this.userlist = result;
                console.log(this.userlist);
            }, error => {
                console.log('Oooops!');
            });
    }

    showname(addedby) {
        for (let i in this.userlist) {
            if (this.userlist[i].email == addedby) {
                return this.userlist[i].firstname + ' ' + this.userlist[i].lastname;
            }
            else{
              return '';
            }
        }
    }
    delConfirm(id) {
        this.id = id;
        this.isModalShown = true;
        console.log(this.isModalShown);
    }

    onHidden() {
        this.isModalShown = false;
    }

    admindel() {
        console.log('admindel');
        this.isModalShown = false;
        console.log('id got' + this.id);
        let link = this.serverurl + 'deleteadbanner';
        let data = {id: this.id};
        this._http.post(link, data)
            .subscribe(res => {
                let result = res;
                console.log(result);
                console.log('Data Deleted');
            }, error => {
                console.log('Oooops!');
            });
        setTimeout(() => {
            this.getAdbannerList();
        }, 300);
    }

    getSortClass(value: any) {
        if (this.orderbyquery == value && this.orderbytype == -1) {
            return 'caret-up';
        }

        if (this.orderbyquery == value && this.orderbytype == 1) {
            // console.log('caret-up');
            return 'caret-down';
        }
        return 'caret-up-down';
    }

    manageSorting(value: any) {
        if (this.orderbyquery == value && this.orderbytype == -1) {
            this.orderbytype = 1;
            return;
        }
        if (this.orderbyquery == value && this.orderbytype == 1) {
            this.orderbytype = -1;
            return;
        }
        this.orderbyquery = value;
        this.orderbytype = 1;
    }

    /*______________________________________________page_initiation_______________________________________*/

    pageval(type) {

        if (type == 1 ) {       // for prev page
            if ((this.pagestart - this.showrows) >= 0) {
                this.pageno--;
                this.pagestart = (this.pageno - 1) * this.showrows;
            }
        }

        if ( type == 2 ) {      // for next page
            if (this.list_length - this.showrows - 1 >= this.pagestart) {
                this.pagestart = this.pageno * this.showrows;
                this.pageno++;
            }
        }

        if ( type == 3 ) {    // for goto input type
            if ( (this.pageno >0) && (this.pageno <= this.totalpage) ) {
                this.pagestart = (this.pageno - 1) * this.showrows;
            } else {
                this.pageno = 1;
                this.pagestart = 0;
            }
        }

        this.pageinitation = parseInt(this.pagestart) + parseInt(this.showrows);
    }

    chagevalues() {
        this.totalpage = this.list_length / this.showrows ;
        if (this.list_length % this.showrows != 0) {
            this.totalpage = this.totalpage + 1;
            this.totalpage = parseInt(this.totalpage);
        }
        this.pageno = 1;
        this.pagestart = 0;
        this.pageinitation = parseInt(this.pagestart) + parseInt(this.showrows);
    }

}