import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";


export function emptyValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    return value.length === 0 ? { empty: true } : null;
  };
}