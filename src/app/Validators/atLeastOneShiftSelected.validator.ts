import { ValidatorFn, FormGroup, AbstractControl } from "@angular/forms";

export function atLeastOneShiftSelectedValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null =>{
        const formGroup = control as FormGroup
        const controls = formGroup.controls;
        const hasOneSelected = Object.keys(controls).some(key=> controls[key].value === true);
        return hasOneSelected ? null : { 'notSelected': true}
    };
}