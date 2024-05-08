import { ValidatorFn, AbstractControl, ValidationErrors, FormGroup } from "@angular/forms";

export class FormGroupValidators {
    public static hasAtLeastOneField(fields: Array<string>): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const formGroup = control as FormGroup;

            if (!formGroup) return null;
            
            return fields.some((key) => formGroup.get(key)?.value)
                ? null
                : { hasAtLeastOneFieldError: true };
        }
    }
}