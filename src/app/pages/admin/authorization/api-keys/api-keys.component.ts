import { Component, OnInit,AfterViewInit, ViewChild, ViewEncapsulation   } from '@angular/core';
import {NgFor} from '@angular/common';


import { TableComponent } from '../../../../components/table/table.component';
import { DynamicFormComponent } from 'src/app/components/form/dynamic-form/dynamic-form.component';

import { RequestService } from 'src/app/services/request.service';

import {apikeyModel} from '../../../../models/forms/admin/authorization/apikey';

@Component({
  selector: 'app-api-keys',
  templateUrl: './api-keys.component.html',
  styleUrls: ['./api-keys.component.css']
})
export class ApiKeysComponent {
  @ViewChild(TableComponent) apiKeysTable:any;
  @ViewChild(DynamicFormComponent) apikeyForm:any;

  fieldset: any[] = apikeyModel.fields;

  
  apikeyTableInput:any = {
    id: 'apikeyTable',
    editable: {'add': true, 'edit': true, 'delete': true},
    config:this.fieldset
  }

  viewMode = 'table';
  formMode = '';
  selctedkey:any = {}

  apikeys:any = []
  groups:any = []

  constructor(public request: RequestService) {}

  ngOnInit(): void {}

  ngAfterViewInit(){
    this.getTableData();

    //wait for 1 second to get the policies
    setTimeout(() => {
      this.getGroups();
    }, 3000);
    
  }

  onTableOutput(event:any){
    
    let action = event.action;

    if(action == 'add'){
      this.addRow();
    }else if(action == 'delete'){
      this.deleteRow(event.data);
    }else if(action == 'edit'){
      this.editRow();
    }
    
  }

  async getTableData(){
    let message = {
      'access': {
        'action': 'IAM:ApiKey:getApiKeys',
        'resources': ['*'],
        'customers': ['*']
      },
      'data': {}
    }

    try{
      let response = await this.request.sendRequest(message)
      this.apikeys = response['msg'];
      this.apiKeysTable.setData(response['msg']);
    }
    catch(error){
      this.apiKeysTable.setData([]);
      alert(error);
    }
  }

  async getGroups(){
    let message = {
      'access': {
        'action': 'IAM:Group:getGroups',
        'resources': ['*'],
        'customers': ['*']
      },
      'data': {}
    }

    try{
      let response = await this.request.sendRequest(message)
      let groups = response['msg'];
      this.groups = []
      this.fieldset[0].options = []
      for(let group of groups){
        this.groups.push(group['name']);
        this.fieldset[2].options.push({'value': group['name'], 'viewValue': group['name']});
      }

    }
    catch(error){
      alert(error);
    }
  }

  async addRow(){
    this.formMode = 'add';
    this.viewMode = 'form';
  }

  editRow(){
    this.selctedkey = this.apiKeysTable.selection.selected[0];

    for(let index in this.fieldset){
      this.fieldset[index].value = this.selctedkey[this.fieldset[index].id];
    }

    this.formMode = 'edit';
    this.viewMode = 'form';
  }

  async deleteRow(data:any){
    this.selctedkey = this.apiKeysTable.selection.selected[0];

    let message = {
      'access': {
        'action': 'IAM:ApiKey:deleteApiKey',
        'resources': ['*'],
        'customers': ['*']
      },
      'data': data
    }

    try{
      let response = await this.request.sendRequest(message)
      let index = this.selctedkey['position_123456789'] - 1
      this.apikeys.splice(index, 1);
      this.apiKeysTable.setData(this.apikeys);
    }
    catch(error){
      alert(error);
    }
  
    
  }

  async onSave(){
    var newDataset = this.apikeyForm.form.value

    let action = 'IAM:ApiKey:updateApiKey';

    if(this.formMode == 'add'){
      action = 'IAM:ApiKey:createApiKey';
    }

    // set the message
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
        this.apikeys.push(response['msg']);
        let key_id = response['msg']['key_id']
        let key_value = response['msg']['key_value']
        //save the key id and value into csv file for download
        let csvContent = "data:text/csv;charset=utf-8,";
        csvContent += "key_id,key_value\n";
        csvContent += key_id + "," + key_value + "\n";
        var encodedUri = encodeURI(csvContent);
        var link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `apikey_${key_id}.csv`);
        document.body.appendChild(link); // Required for FF
        link.click(); // This will download the data file named "my_data.csv".

        alert('The api key has been created. Please save the csv file for the key id and value, you will not be able to see the value again.');

      }
      else if(this.formMode == 'edit'){
        let index = this.selctedkey['position_123456789'] - 1
        this.apikeys[index]['key_group'] = newDataset['key_group'];
      }
      this.apiKeysTable.setData(this.apikeys);
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
