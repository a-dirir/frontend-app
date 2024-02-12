import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { NavigatorService } from './navigator.service';

// create a function to send a request to the server

@Injectable({
    providedIn: 'root'
  })
export class RequestService {
    constructor(private navService: NavigatorService) { }
    // create a function to send a request to the server
    sendRequest( body:any) {
        let headers = {
            'Content-Type': 'application/json',
            'user-id': 'ahmed.dirir@bespinglobal.ae',
            'user-type':'user'
        };

        let customer = this.navService.getCurrentCustomer();
        if (customer != "Root"){
            body['access']['customers'] = [customer]
        }else{
            body['access']['customers'] = ['*']
        }
        

        return fetch('http://127.0.0.1:8080/', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: headers
        })
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
        
            return response.json().then(function (error) {
                var e = new Error(error);
                throw e;
            });
        });
    }
}

