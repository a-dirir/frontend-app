import { Injectable } from '@angular/core';
import { Observable,Subject } from 'rxjs';
import { Router } from '@angular/router';

import {mainRoutes, adminRoutes} from '../website/config/config';



@Injectable({
  providedIn: 'root'
})
export class NavigatorService {
    currentRoute: any = {"primary": "app/assets/products", "secondary": "", "tertiary": "" };
    customers: any = [];
    currentCustomer: string = "Root";
    mode: string = "main";

    modeChange: Observable<any>;
    private modeChangeSubject: Subject<any>;

    customerChange: Observable<any>;
    private customerChangeSubject: Subject<any>;
    

    mainRoutes: any[] = mainRoutes;
    adminRoutes: any[] = adminRoutes;


    constructor(private router: Router) {
        this.modeChangeSubject = new Subject<any>();
        this.modeChange = this.modeChangeSubject.asObservable();

        this.customerChangeSubject = new Subject<any>();
        this.customerChange = this.customerChangeSubject.asObservable();
    }



    getRoutes() {
        if (this.mode == "main") {
            return {"routes": this.mainRoutes, "mode": "main", "currentRoute": this.currentRoute};
        } else {
            return {"routes": this.adminRoutes, "mode": "admin", "currentRoute": this.currentRoute};
        }
    }

    primaryClicked(primary: string) {
        if (this.currentRoute["primary"] == primary) {
            this.currentRoute["primary"] = "";
            this.currentRoute["secondary"] = "";
            this.currentRoute["tertiary"] = "";
        } else {
            this.currentRoute["primary"] = primary;
            this.currentRoute["secondary"] = "";
            this.currentRoute["tertiary"] = "";
        }

        this.performRouting();

        return this.getRoutes();
    }

    secondaryClicked(secondary: string, primary: string) {
        if (this.currentRoute["secondary"] == secondary) {
            this.currentRoute["secondary"] = "";
            this.currentRoute["tertiary"] = "";
        } else {
            this.currentRoute["secondary"] = secondary;
            this.currentRoute["tertiary"] = "";
        }
        this.currentRoute["primary"] = primary;

        this.performRouting();

        return this.getRoutes();
    }

    tertiaryClicked(tertiary: string, secondary: string) {
        if (this.currentRoute["tertiary"] == tertiary) {
            this.currentRoute["tertiary"] = "";
        } else {
            this.currentRoute["tertiary"] = tertiary;
        }
        this.currentRoute["secondary"] = secondary;

        this.performRouting();

        return this.getRoutes();
    }

    getCustomers() {
        return this.customers;
    }

    setCustomers(customers: any) {
        this.customers = customers;
    }

    changeCustomer(customer: any) {
        this.currentCustomer = customer;
        this.customerChangeSubject.next(customer);
    }

    getCurrentCustomer() {
        return this.currentCustomer;
    }

    changeMode(mode: string) {
        this.mode = mode;
        this.modeChangeSubject.next(mode);
    }

    performRouting() {
        if (this.currentRoute['tertiary'] != ""){
            this.router.navigate([this.currentRoute['tertiary']]);
        }

        else if (this.currentRoute['secondary'] != ""){
            this.router.navigate([this.currentRoute['secondary']]);
        }

        else if (this.currentRoute['primary'] != ""){
            this.router.navigate([this.currentRoute['primary']]);
        }
    }


}
