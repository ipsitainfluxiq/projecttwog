import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {Http} from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {CookieService} from 'angular2-cookie/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    public dataForm: FormGroup;
    private fb;
    public is_error;
   /* private addcookie: CookieService;
    private cookiedetails;*/
    private emailcookie: CookieService;
    private mailcookiedetails;

    constructor(fb: FormBuilder, emailcookie: CookieService, private _http: Http, private router: Router) {
        this.fb = fb;
        this.emailcookie = emailcookie ;
        this.mailcookiedetails = this.emailcookie.getObject('mailcookiedetails');
        console.log('mailcookiedetails');
        console.log('get mail from login page saved cookie ->  ' + this.mailcookiedetails);
        if (typeof (this.mailcookiedetails) != 'undefined') {
            this.router.navigateByUrl('/campaignlist');
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
            console.log("valid proved for login");
            var link = 'http://localhost:3004/login';
            let data = {email: formval.email, password: formval.password};

            this._http.post(link, data)
                .subscribe(res => {
                    let result = res.json();
                    console.log(result.status);
                    if (result.status == 'success') {
                        this.emailcookie.putObject('mailcookiedetails', result.msg);
                        this.mailcookiedetails = this.emailcookie.getObject('mailcookiedetails');
                        console.log('after putobject ' + this.mailcookiedetails);

                        this.router.navigateByUrl('/');
                    }
                    else {
                        this.is_error = result.msg;
                        this.router.navigate(['/login']);
                    }

                }, error => {
                    console.log('Oooops!');
                });
        }
    }
}
