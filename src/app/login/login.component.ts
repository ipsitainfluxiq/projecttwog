import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {Http} from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {CookieService} from 'angular2-cookie/core';
import {Commonservices} from '../app.commonservices' ;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    providers: [Commonservices],
})
export class LoginComponent implements OnInit {
    public dataForm: FormGroup;
    private fb;
    public is_error;
    public serverurl;
    private alldetailcookie: CookieService;
    private cookiedetailsforalldetails;
    private emailcookie: CookieService;
    private mailcookiedetails;

    constructor(fb: FormBuilder, emailcookie: CookieService, alldetailcookie: CookieService, private _http: Http, private router: Router,  private _commonservices: Commonservices) {
        this.serverurl = _commonservices.url;
        this.fb = fb;
        this.emailcookie = emailcookie ;
        this.alldetailcookie = alldetailcookie ;
        this.mailcookiedetails = this.emailcookie.getObject('mailcookiedetails');
        this.cookiedetailsforalldetails = this.alldetailcookie.getObject('cookiedetailsforalldetails');

        if (typeof (this.mailcookiedetails) != 'undefined') {
           /* if(this.cookiedetailsforalldetails.type==0){ //user
            this.router.navigateByUrl('/campaignlists');
            }
            else{
                this.router.navigateByUrl('/accountdetails'); //admin
            }*/
           // this.router.navigateByUrl('/viewability');
            this.router.navigateByUrl('/campaignlists');
        }
    }

    ngOnInit() {
        this.dataForm = this.fb.group({
            email: ["", Validators.required],
            password: ["", Validators.required]});
    }

    dosubmit(formval) {
        let x: any;
        for (x in this.dataForm.controls) {
            this.dataForm.controls[x].markAsTouched();
        }
        this.is_error = 0;
        if (this.dataForm.valid) {
           // var link = 'http://localhost:3004/login';
            let link = this.serverurl + 'login';
            let data = {email: formval.email, password: formval.password};

            this._http.post(link, data)
                .subscribe(res => {
                    let result = res.json();
                    console.log('result.status-----');
                    console.log(result.status);
                    if (result.status == 'success') {
                        this.emailcookie.putObject('mailcookiedetails', result.msg.email);
                        this.mailcookiedetails = this.emailcookie.getObject('mailcookiedetails');
                        console.log('after putobject mail' + this.mailcookiedetails);
                        this.alldetailcookie.putObject('cookiedetailsforalldetails', result.msg);
                        this.cookiedetailsforalldetails = this.alldetailcookie.getObject('mailcookiedetails');
                        console.log('after putobject all details' + this.cookiedetailsforalldetails);
                       // this.router.navigate(['/accountdetails']);
                        window.location.reload();
                      //  this.router.navigate(['/viewability']);
                    }
                    else {
                        console.log('else part');
                        this.is_error = result.msg;
                      //  this.router.navigate(['/']);
                    }

                }, error => {
                    console.log('Oooops!');
                });
        }
    }
}
