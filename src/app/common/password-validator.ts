import { AbstractControl } from '@angular/forms';
export class PasswordValidation {

    static MatchPassword(AC: AbstractControl) {
        let newPassword = AC.get('newPassword').value;
        if (AC.get('confirmPassword').touched || AC.get('confirmPassword').dirty) {
            let verifyPassword = AC.get('confirmPassword').value;

            if (newPassword != verifyPassword) {
                AC.get('confirmPassword').setErrors({ MatchPassword: true })
            } else {
                return null
            }
        }
    }
}