import { FormGroup } from "@angular/forms";

export function leaveFormValidator(formGroup : FormGroup) {
    const leaveDateControl = formGroup.get('leaveDate');
    const morningShiftControl = formGroup.get('morningShift');
    const afternoonShiftControl = formGroup.get('afternoonShift');

    if (!leaveDateControl?.value) {
        leaveDateControl?.setErrors({ required : true});
    }
    else {
        leaveDateControl.setErrors(null);
    }

    if(!morningShiftControl?.value && !afternoonShiftControl?.value) {
        morningShiftControl?.setErrors( { shiftRequired: true});
        afternoonShiftControl?.setErrors({shiftRequired: true});
    }
    else {
        morningShiftControl?.setErrors(null);
        afternoonShiftControl?.setErrors(null);
    }

    return null;
}