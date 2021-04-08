import { FormGroup, ValidationErrors } from "@angular/forms";

export function ConfirmPasswordValidator(controlName: string, matchingControlName: string): ValidationErrors | null {
    return (formGroup: FormGroup) => {
        let control = formGroup.controls[controlName];
        let matchingControl = formGroup.controls[matchingControlName]
        if (control && matchingControl && (control.value !== matchingControl.value)) {
            return { confirmPasswordValidator: true };
        } else {
          return null;
        }
    }
}