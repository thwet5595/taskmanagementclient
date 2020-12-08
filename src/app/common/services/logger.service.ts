import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LoggerService {

    error(message: string) {
        // Send errors to server here
        //console.log('LoggerService: ' + message);
    }
}
