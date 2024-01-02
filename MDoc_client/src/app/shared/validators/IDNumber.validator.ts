import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';



export function CustomValidateTZ(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const id = control.value.trim();
        if (id && Array.from(id, Number).reduce((counter, digit, i) => {
            const step = digit * ((i % 2) + 1);
            return counter + (step > 9 ? step - 9 : step);
        }) % 10 === 0) {
            return null;
        }
        return { validateTZ: true };
    }
}