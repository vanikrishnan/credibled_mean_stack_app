import { AbstractControl, ValidationErrors, Validators } from "@angular/forms";

export function passwordPatternValidator(control: AbstractControl): ValidationErrors | null {
    const password: string = control && control.value;
    const pattern: any = (/^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/);
    if (password && pattern.test(password)) {
        return null;
    } else {
         return {'passwordPattern': true};
    }
}