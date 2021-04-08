import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { CountryCode, CountryCodes } from 'src/app/model/country-codes';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { emailDomain } from 'src/app/validators/emailDomainValidator';
import { passwordPatternValidator } from 'src/app/validators/passwordPatternValidator';
import { ConfirmPasswordValidator } from 'src/app/validators/passwordValidator';

@Component({
  selector: 'app-update-account',
  templateUrl: './update-account.component.html',
  styleUrls: ['./update-account.component.css']
})
export class UpdateAccountComponent implements OnInit {
  updateAccountForm: FormGroup;
  Countries: Array<CountryCode> = CountryCodes;
  constructor(private formBuilder: FormBuilder, private toastr: ToastrManager, private apiService: ApiServiceService,
    private router: Router) {
    this.updateAccountForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.pattern('[A-Za-z]+')]],
      lastName: ['', [Validators.required, Validators.pattern('[A-Za-z]+')]],
      email: ['', [Validators.required, Validators.email, emailDomain]],
      country: ['', Validators.required],
      countryCode: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      organization: ['', [Validators.required, Validators.pattern('[A-Za-z]+')]],
      staffNos: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      // password: ['', [Validators.required, passwordPatternValidator]],
      // confirmPassword: ['', [Validators.required, passwordPatternValidator]],
    }, {
      validator: ConfirmPasswordValidator('password', 'confirmPassword')
    });
   }

  ngOnInit(): void {
    this.apiService.getUserByID(this.apiService.getUserID()).subscribe((data: any) => {
      let userData = data.message;
      this.updateAccountForm.setValue(userData);
    }, err => {
      alert(err);
    })
  }

  updateUser() {
    if (this.updateAccountForm.valid) {
      this.apiService.editUser(this.updateAccountForm.value).subscribe(data => {
      this.toastr.successToastr("Account Updated Successfully");
      this.router.navigate(['/create']);
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
    this.updateAccountForm.controls['countryCode'].setValue(selectedCountryObj.dial_code, {
      onlySelf: true
    });
    this.updateAccountForm.updateValueAndValidity();
  }

}
