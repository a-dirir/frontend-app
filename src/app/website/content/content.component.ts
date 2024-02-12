
import { Component, OnInit } from '@angular/core';
import { NavigatorService } from '../../services/navigator.service';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  
  isAdminMode = false;
  customers:any = []

  constructor(private navService: NavigatorService, public request: RequestService) { 
    this.initializeCustomers().then((customers) => {
      this.customers = ['Root']
      for (let customer of customers['customers']){
        this.customers.push(customer['id'])
      }

      this.navService.changeCustomer('Root');
      this.navService.setCustomers(this.customers); 
    }).catch((error) => {
      console.log(error);
    });
  
  }

  ngOnInit(): any {}

  async initializeCustomers() {
    let message = {
        'access': {
          'action': 'IAM:Customer:getCustomers',
          'resources': ['*'],
          'customers': ['*']
        },
        'data': {}
      }
  
      try{
        let response = await this.request.sendRequest(message)
        this.customers = response['msg'];
      }
      catch(error){
        this.customers = []
      }
      
      return this.customers;
}

  changeCustomer(customer:any){
    this.navService.changeCustomer(customer);
  }

  changeViewMode(){
    this.isAdminMode = !this.isAdminMode;
    if (this.isAdminMode){
      this.navService.changeMode("admin");
    }else{
      this.navService.changeMode("main");
    }
  }

  

}
