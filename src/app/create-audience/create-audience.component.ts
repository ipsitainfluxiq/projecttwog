import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-audience',
  templateUrl: './create-audience.component.html',
  styleUrls: ['./create-audience.component.css']
})
export class CreateAudienceComponent implements OnInit {
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


  constructor() {
  }

  ngOnInit() {
  }

  select(type) {
    if (type==1) {
      this.browserselect = 1;
    }
    if (type==2) {
      this.dayparting = 1;
    }
    if (type==3) {
      this.deals=1;
    }
    if (type==4) {
      this.device_types=1;
    }
    if (type==5) {
      this.locations=1;
    }
    if (type==6) {
      this.operating_systems=1;
    }
    if (type==7) {
      this.pacing=1;
    }
    if (type==8) {
      this.third_party_segments=1;
    }
    if (type==9) {
      this.viewability=1;
    }
    if (type==9) {
      this.website_filtering=1;
    }
  }

  updatebrowsers() {
    let j = 0 ;
    /*for(let i=0;i<8;i++){
     if(this.select+i == true){
        j++;
      }
    }*/
    console.log(this.select1);
    console.log('total no '+j);
  }

}
