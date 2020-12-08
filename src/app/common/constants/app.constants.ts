import { Injectable } from '@angular/core';

@Injectable()
export class Constants {
    static tokenDelimeter = ',';
    static isHeaderPresentFlag = true;
    static validateHeaderAndRecordLengthFlag = true;
    static valildateFileExtenstionFlag = true;

    static oauth2ClientID = "client-id"
    static oauth2ClientPassword = "client-password"

    static maxFileSize = 1000000; // 1MB
    static paginationSize = 10;
    static dateFormat = 'yyyy/MM/dd';

    static validatePhone(phoneNumber) {
        var phoneRe = /^(09)/g;
        var flag = phoneRe.test(phoneNumber);
        return flag;
    }

    static validatePassport(passport) {
        var passportReg = /^[a-zA-Z0-9]*$/g;
        var flag = passportReg.test(passport);
        return flag;
    }

    static validatePassword(password) {
        var passwordRegx = /^(?!.*([A-Za-z0-9])\1{2})(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/g;
        var flag = passwordRegx.test(password);
        return flag;
    }

}
