import { Component, OnInit } from '@angular/core';
import { NavigatorService } from 'src/app/services/navigator.service';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-usage',
  templateUrl: './usage.component.html',
  styleUrls: ['./usage.component.css']
})
export class UsageComponent {

  usage:any = []

  currentCustomer = '';

  constructor(public request: RequestService, public navService: NavigatorService) {
    this.listenForCustomerChange();
    this.getUsage();
  }

  listenForCustomerChange() {
    this.navService.customerChange.subscribe((value) => {
      this.currentCustomer = this.navService.getCurrentCustomer();
      this.getUsage();
    });
  }


  async getUsage(){
    let currentCustomer = this.navService.getCurrentCustomer();

    let message = {
      'access': {
        'action': 'OPSNOW:Asset:getUsage',
        'resources': ['*'],
        'customers': ['*']
      },
      'data': {
        "customer_id": currentCustomer
      }
    }

    try{
      let response = await this.request.sendRequest(message)
      this.usage = response['msg']['usage'];
      // convert products to string
      this.usage = JSON.stringify(this.usage, null,4)
    }
    catch(error){
      this.usage = [];
      alert(error);
    }
  }

}
