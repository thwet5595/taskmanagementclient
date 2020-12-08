import {Injectable} from '@angular/core';
import { ApiService } from './api.service';
import { HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {

    private fisrtlogin = false;
    private supplierData = [];
    private supplier: any;

    constructor() {
    }

    // setCurrentUser(id: string, role: string, email: string, name: string): void {
    //     /*
    //     localStorage.setItem(ID, id);
    //     localStorage.setItem(TOKEN, token);
    //     localStorage.setItem(ROLE, role);
    //     */
    //     sessionStorage.setItem('ID', id);
    //     sessionStorage.setItem('ROLE', role);
    //     sessionStorage.setItem('EMAIL', email);
    //     sessionStorage.setItem('NAME', name);
    //     sessionStorage.setItem('NAME', name);
    // }

    setCurrentUser(id: string, role: string, email: string, name: string, sessionId: string): void {
        sessionStorage.setItem('ID', id);
        sessionStorage.setItem('ROLE', role);
        sessionStorage.setItem('EMAIL', email);
        sessionStorage.setItem('NAME', name);
        sessionStorage.setItem('SESSIONID', sessionId);
    }

    isLogged() {
        return sessionStorage.getItem('ACCESS_TOKEN') != null && sessionStorage.getItem('ID') != null;
    }

    getUserId() {
        return sessionStorage.getItem('ID');
    }

    getRole() {
        return sessionStorage.getItem('ROLE');
    }

    getEmail() {
        return sessionStorage.getItem('EMAIL');
    }

    getName(){
         return sessionStorage.getItem('NAME');
    }

    getAccessToken() {
        return sessionStorage.getItem('ACCESS_TOKEN');
    }

    getSessionId() {
        return sessionStorage.getItem('SESSIONID');
    }

    getRefreshToken() {
        return sessionStorage.getItem('REFRESH_TOKEN');
    }

    clearSession() {
        this.supplier ===  undefined;
        sessionStorage.clear();
    }

    setFirstLogin(firstlogin: boolean) {
        this.fisrtlogin = firstlogin;
    }

    isFirstLogin() {
        return this.fisrtlogin;
    }

    setRetailerData(supplierData: any) {
        this.supplierData = supplierData;
    }

    getRetailerData() {
        return this.supplierData;
    }   

}
