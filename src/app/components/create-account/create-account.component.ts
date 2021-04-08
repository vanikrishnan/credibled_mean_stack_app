import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { CountryCode, CountryCodes } from 'src/app/model/country-codes';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { emailDomain } from 'src/app/validators/emailDomainValidator';
import { passwordPatternValidator } from 'src/app/validators/passwordPatternValidator';
import { ConfirmPasswordValidator } from 'src/app/validators/passwordValidator';
import * as _ from 'underscore';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {
  createAccountForm: FormGroup;
  emailArr: Array<string> = [];
  Countries: Array<CountryCode> = CountryCodes;
  constructor(private formBuilder: FormBuilder, private toastr: ToastrManager, private apiService: ApiServiceService,
    private router: Router) { 
    this.createAccountForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.pattern('[A-Za-z]+')]],
      lastName: ['', [Validators.required, Validators.pattern('[A-Za-z]+')]],
      email: ['', [Validators.required, Validators.email, emailDomain]],
      country: ['', Validators.required],
      countryCode: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      organization: ['', [Validators.required, Validators.pattern('[A-Za-z]+')]],
      staffNos: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      password: ['', [Validators.required, passwordPatternValidator]],
      confirmPassword: ['', [Validators.required, passwordPatternValidator]],
      agreeCheck: [false, Validators.requiredTrue]
    }, {
      validator: ConfirmPasswordValidator('password', 'confirmPassword')
    });
  }

  ngOnInit(): void {
    this.apiService.getAllUsers().subscribe((data: any) => {
      let userData = data.message;
      if (userData.length > 0)
      this.emailArr = _.pluck(userData, 'email');
    }, err => {
      alert(err);
    })
  }

  createUser() {
    if (this.emailArr && this.emailArr.length > 0 && this.emailArr.indexOf(this.createAccountForm.controls['email'].value) >= 0) {
      this.toastr.warningToastr("Email already exists!!");
    }
    else if (this.createAccountForm.valid) {
      this.apiService.createUser(this.createAccountForm.value).subscribe(data => {
      this.toastr.successToastr("Account Created Successfully");
      this.apiService.setUserID(data.id);
      this.createAccountForm.reset();
      this.router.navigate(['/update']);
      }, err => {
        alert(err);
      })
    } else {
      this.toastr.warningToastr("This is not a valid form.", "Alert!");
    }
  }

  changeCity(event: any) {
    let arr = event.target.value.split(":");
    let selectedCountryObj = this.Countries[parseInt(arr[0])-1];
    this.createAccountForm.controls['countryCode'].setValue(selectedCountryObj.dial_code, {
      onlySelf: true
    });
    this.createAccountForm.updateValueAndValidity();
  }

}
