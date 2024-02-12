import { Component, OnInit,AfterViewInit, ViewChild  } from '@angular/core';

import { RequestService } from 'src/app/services/request.service';

import { TableComponent } from '../../../../components/table/table.component';
import { DynamicFormComponent } from 'src/app/components/form/dynamic-form/dynamic-form.component';

import {policyModel} from '../../../../models/forms/admin/authorization/policy';



@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.css']
})
export class PolicyComponent implements OnInit, AfterViewInit {
  @ViewChild(TableComponent) policyTable:any;
  @ViewChild(DynamicFormComponent) policyForm:any;

  fieldset: any[] = policyModel.fields;
  
  policyTableInput:any = {
    id: 'policyTable',
    editable: {'add': true, 'edit': true, 'delete': true},
    config:this.fieldset
  }


  viewMode = 'table';
  formMode = '';
  selctedPolicy:any = {}
  
  policies:any = []

  constructor(public request: RequestService) {
   }

  ngOnInit(): void {}

  ngAfterViewInit(){
    this.getPolicies();
  }

  onTableOutput(event:any){
    let action = event.action;

    if(action == 'add'){
      this.addPolicy();
    }else if(action == 'delete'){
      this.deletePolicy(event.data);
    }else if(action == 'edit'){
      this.editPolicy();
    }
    
  }

  async getPolicies(){
    let message = {
      'access': {
        'action': 'IAM:Policy:getPolicies',
        'resources': ['*'],
        'customers': ['*']
      },
      'data': {}
    }

    try{
      let response = await this.request.sendRequest(message)
      this.policies = response['msg'];
      this.policyTable.setData(response['msg']);
    }
    catch(error){
      this.policyTable.setData([]);
      alert(error);
    }
    


  }

  addPolicy(){
    this.formMode = 'add';
    this.viewMode = 'form';
    // enable all the fields
  }

  editPolicy(){
    this.selctedPolicy = this.policyTable.selection.selected[0];

    // loop through the fields and set the values
    for(let index in this.fieldset){
      this.fieldset[index].value = this.selctedPolicy[this.fieldset[index].id];
    }

    this.formMode = 'edit';
    this.viewMode = 'form';
  }

  async deletePolicy(data:any){
    this.selctedPolicy = this.policyTable.selection.selected[0];
    
    let message = {
      'access': {
        'action': 'IAM:Policy:deletePolicy',
        'resources': ['*'],
        'customers': ['*']
      },
      'data': data
    }

    try{
      let response = await this.request.sendRequest(message)
      let index = this.selctedPolicy['position_123456789'] - 1  
      this.policies.splice(index, 1);
      this.policyTable.setData(this.policies)
    }
    catch(error){
      alert(error);
    }
    
  }

  async onSave(){
    let newDataset = this.policyForm.form.value

    let action = 'IAM:Policy:createPolicy';

    if(this.formMode == 'edit'){
      action = 'IAM:Policy:updatePolicy';
    }

    let message = {
      'access': {
        'action': action,
        'resources': ['*'],
        'customers': ['*']
      },
      'data': newDataset
    }

    try{
      let response = await this.request.sendRequest(message)
      if(this.formMode == 'add'){
        this.policies.push(newDataset);
      }else if(this.formMode == 'edit'){
        let index = this.selctedPolicy['position_123456789'] - 1
        for(let field of Object.keys(newDataset)){
          this.policies[index][field] = newDataset[field];
        }

      }
      this.policyTable.setData(this.policies);
        this.viewMode = 'table';
    }
    catch(error){
      this.viewMode = 'table';
      alert(error);
    }
    
  }

  onCancel(){
    this.viewMode = 'table';
    this.formMode = '';
  }

}
