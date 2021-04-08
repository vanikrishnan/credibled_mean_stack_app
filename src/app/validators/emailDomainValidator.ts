import { AbstractControl, ValidationErrors, Validators } from "@angular/forms";

export function emailDomain(control: AbstractControl): ValidationErrors | null {
    const email: string = control.value;
    const domain: string = email && email.substring(email.lastIndexOf('@') + 1);
    if (domain && domain.toLowerCase() === 'credibled.com') {
        return null;
    } else {
         return {'emailDomain': true};
    }
}