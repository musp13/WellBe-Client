import { AbstractControl, ValidatorFn } from "@angular/forms";

const PHONE_NUMBER_REGEX = /^[6789]\d{9}$/;
//    /^(\+?91[\-\s]?)?[0]?(91)?[6789]\d{9}$/

export function indianPhoneNumberValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        const phoneNumber = control.value;
        if(phoneNumber && !PHONE_NUMBER_REGEX.test(phoneNumber)) {
            return { 'indianPhoneNumber' : {value: phoneNumber}};
        }
        return null;
    };
}