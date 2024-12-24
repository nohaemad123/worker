import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class Validators
{
    /**
     * Check for empty (optional fields) values
     *
     * @param value
     */
    static isEmptyInputValue(value: any): boolean
    {
        return value == null || value.length === 0;
    }

    /**
     * Must match validator
     *
     * @param controlPath A dot-delimited string values that define the path to the control.
     * @param matchingControlPath A dot-delimited string values that define the path to the matching control.
     */
    static mustMatch(controlPath: string, matchingControlPath: string): ValidatorFn
    {
        return (formGroup: AbstractControl): ValidationErrors | null => {

            // Get the control and matching control
            const control = formGroup.get(controlPath);
            const matchingControl = formGroup.get(matchingControlPath);

            // Return if control or matching control doesn't exist
            if ( !control || !matchingControl )
            {
                return null;
            }

            // Delete the mustMatch error to reset the error on the matching control
            if (matchingControl.hasError('mustMatch')) {
                const errors = { ...matchingControl.errors };

                // Remove the 'mustMatch' error
                delete errors['mustMatch'];

                // Update the form control with the modified errors
                matchingControl.setErrors(Object.keys(errors).length === 0 ? null : errors);
              }

            // Don't validate empty values on the matching control
            // Don't validate if values are matching
            if ( this.isEmptyInputValue(matchingControl.value) || control.value === matchingControl.value )
            {
                return null;
            }

            // Prepare the validation errors
            const errors = {mustMatch: true};

            // Set the validation error on the matching control
            matchingControl.setErrors(errors);

            // Return the errors
            return errors;
        };
    }
}