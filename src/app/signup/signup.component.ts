import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder} from '@angular/forms';
import {Http} from "@angular/http";
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Commonservices} from '../app.commonservices' ;

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [Commonservices],
})
export class SignupComponent implements OnInit {
  public dataForm: FormGroup;
  private fb;
  static invalidemail;
  static blankemail;
  private passmatchvalidate;
  public is_error;
  public state: any = [];
  public months: any = [];
  public serverurl;

  constructor(fb: FormBuilder,private _http: Http,private router: Router, private _commonservices: Commonservices) {
    this.fb = fb;
    this.months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    SignupComponent.blankemail = false;
    SignupComponent.invalidemail = false;
    this.is_error='';
    this.serverurl = _commonservices.url;

   // var link = 'http://localhost:3004/getusastates';
    let link = this.serverurl + 'getusastates';
    this._http.get(link)
        .subscribe(res => {
          var result1 = res.json();
          for (let i in result1) {
            this.state[i]= result1[i].name;
          }
        }, error => {
          console.log("Oooops!");
        });
  }

  ngOnInit() {
    this.passmatchvalidate = false;

    this.dataForm = this.fb.group({
      firstname: ["", Validators.required],
      lastname: ["", Validators.required],
      email: ['', Validators.compose([Validators.required, SignupComponent.validateEmail])],
      password: ["", Validators.compose([Validators.required, Validators.minLength(8)])],
      confirmpassword: ["", Validators.required],
      month: [""],
      day: [""],
      year: [""],
      phone: [""],
      location: [""],
      state: [""],
    }, {validator: this.matchingPasswords('password', 'confirmpassword') });
  }


  static validateEmail(control: FormControl) {
    SignupComponent.blankemail = false;
    SignupComponent.invalidemail = false;

    if (control.value == '') {
      SignupComponent.blankemail = true;
      return { 'invalidemail' : true } ;
    }
    if ( !control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
      SignupComponent.invalidemail = true;
      return { 'invalidemail': true };
    }
  }

  getemail(type: any)  {
    // console.log('t '+type);
    if (type == 'invalid') {
      return SignupComponent.invalidemail;
    }
    if (type == 'blank') {
      return SignupComponent.blankemail;
    }
  }

  public matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
    return (group: FormGroup): {[key: string]: any} => {
      let password = group.controls[passwordKey];
      let confirmPassword = group.controls[confirmPasswordKey];
      if (password.value !== confirmPassword.value) {
        //  console.log('mismatch');
        return {
          mismatchedPasswords: true
        };
      }
      else {
        this.passmatchvalidate = true;
      }
    };
  }


  dosubmit(formval) {
    let x: any;
    for (x in this.dataForm.controls) {
      this.dataForm.controls[x].markAsTouched();
    }

    if (this.dataForm.valid && this.passmatchvalidate && (SignupComponent.invalidemail == false || SignupComponent.blankemail == false)) {
      console.log('hi');
      var data = {
        firstname: formval.firstname,
        lastname: formval.lastname,
        email: formval.email,
        password: formval.password,
        month: formval.month,
        day: formval.day,
        year: formval.year,
        phone: formval.phone,
        location: formval.location,
        state: formval.state,
      };

     // var link = 'http://localhost:3004/signup';
      let link = this.serverurl + 'signup';
      this._http.post(link, data)
          .subscribe(res => {
            var result = res.json();
            console.log(result.status);
            if (result.status == 'success') {
              // $('#popthankyou').modal('show');
              this.router.navigate(['/']);
            }
            else {
              this.is_error = result.status;
              // console.log(this.is_error);
            }
          }, error => {
            console.log("Oooops!");
          });


    }
  }
}
