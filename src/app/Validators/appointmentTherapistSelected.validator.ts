import { AbstractControl, ValidatorFn, Validators } from "@angular/forms";

export function therapistSelectedValidator(): ValidatorFn {
    return (control : AbstractControl) : { [key: string]: any} | null => {
        const therapistValue = control.get('therapist')?.value;
        return therapistValue ? null : { therapistNtSelected: true};
    }
}