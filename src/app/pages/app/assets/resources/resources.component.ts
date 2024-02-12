import { Component, OnInit } from '@angular/core';
import { NavigatorService } from 'src/app/services/navigator.service';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.css']
})
export class ResourcesComponent {
  resources:any = []

  currentCustomer = '';

  constructor(public request: RequestService, public navService: NavigatorService) {
    this.listenForCustomerChange();
    this.getResources();
  }

  listenForCustomerChange() {
    this.navService.customerChange.subscribe((value) => {
      this.currentCustomer = this.navService.getCurrentCustomer();
      this.getResources();
    });
  }


  async getResources(){
    let currentCustomer = this.navService.getCurrentCustomer();

    let message = {
      'access': {
        'action': 'OPSNOW:Asset:getResources',
        'resources': ['*'],
        'customers': ['*']
      },
      'data': {
        "customer_id": currentCustomer
      }
    }

    try{
      let response = await this.request.sendRequest(message)
      this.resources = response['msg']['resources'];
      // convert products to string
      this.resources = JSON.stringify(this.resources, null,4)
    }
    catch(error){
      this.resources = [];
      alert(error);
    }
  }

}
