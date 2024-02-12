import { Component, OnInit, ViewChild } from '@angular/core';
import { JsonViewerComponent } from 'src/app/components/json-viewer/json-viewer.component';
import { NavigatorService } from 'src/app/services/navigator.service';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent{
  @ViewChild(JsonViewerComponent) jsonViewer: JsonViewerComponent;

  products:any = []
  currentCustomer = '';

  constructor(public request: RequestService, public navService: NavigatorService) {
    this.listenForCustomerChange();
    this.getProducts();
  }

  listenForCustomerChange() {
    this.navService.customerChange.subscribe((value) => {
      this.currentCustomer = this.navService.getCurrentCustomer();
      this.getProducts();
    });
  }


  async getProducts(){
    let currentCustomer = this.navService.getCurrentCustomer();

    let message = {
      'access': {
        'action': 'OPSNOW:Asset:getProducts',
        'resources': ['*'],
        'customers': ['*']
      },
      'data': {
        "customer_id": currentCustomer
      }
    }

    try{
      let response = await this.request.sendRequest(message)
      this.products = response['msg']['products'];
      this.products = JSON.stringify(this.products, null,4)
    }
    catch(error){
      this.products = [];
      alert(error);
    }
  }
}
