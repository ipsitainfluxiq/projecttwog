import { Component, OnInit } from '@angular/core';
import {Http} from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-trial',
  templateUrl: './trial.component.html',
  styleUrls: ['./trial.component.css']
})
export class TrialComponent implements OnInit {


  constructor(private _http: Http, private router: Router) {  }

  ngOnInit() {
  }
  show(){
/*    $('#calender').datepicker();*/
  }
}
