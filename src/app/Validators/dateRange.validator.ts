import { FormGroup } from "@angular/forms";

export const dateRangeValidator = ( startDateControlName: string, endDateControlName:string) =>{
    return (formGroup: FormGroup) =>{
        const startDateControl = formGroup.controls[startDateControlName];
        const endDateControl = formGroup.controls[endDateControlName];

        if(startDateControl.errors || endDateControl.errors){
            return;
        }

        const startDate = new Date(startDateControl.value);
        const endDate = new Date(endDateControl.value);

        if(startDate && endDate && startDate.getTime()>= endDate.getTime()){
            endDateControl.setErrors({dateRange: true});
        }else{
            endDateControl.setErrors(null);
        }
    }
}