import { Component, OnInit,AfterViewInit, ViewChild, ViewEncapsulation   } from '@angular/core';

import { TableComponent } from '../../../../components/table/table.component';
import { DynamicFormComponent } from 'src/app/components/form/dynamic-form/dynamic-form.component';

import { RequestService } from 'src/app/services/request.service';

import {groupModel} from '../../../../models/forms/admin/authorization/group';


@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class GroupComponent implements OnInit, AfterViewInit{
  @ViewChild(TableComponent) groupTable:any;
  @ViewChild(DynamicFormComponent) groupForm:any;

  fieldset: any[] = groupModel.fields;
  
  groupTableInput:any = {
    id: 'groupTable',
    editable: {'add': true, 'edit': true, 'delete': true},
    config:this.fieldset
  }


  viewMode = 'table';
  formMode = '';
  selctedGroup:any = {}
  
  groups:any = []

  policies:any = []

  constructor(public request: RequestService) {}

  ngOnInit(): void {}

  ngAfterViewInit(){
    this.getTableData();
    
    //wait for 1 second to get the policies
    setTimeout(() => {
      this.getPoloicies();
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
        'action': 'IAM:Group:getGroups',
        'resources': ['*'],
        'customers': ['*']
      },
      'data': {}
    }

    try{
      let response = await this.request.sendRequest(message)
      this.groups = response['msg'];
      this.groupTable.setData(response['msg']);
    }
    catch(error){
      this.groupTable.setData([]);
      alert(error);
    }
  }

  async getPoloicies(){
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
      let policies = response['msg'];
      this.policies = []
      this.fieldset[1].options = []
      for(let policy of policies){
        this.policies.push(policy);
        this.fieldset[1].options.push({'value': policy['name'], 'viewValue': policy['name']});
      }
      
    }
    catch(error){
      alert(error);
    }
  }

  addRow(){
    this.formMode = 'add';
    this.viewMode = 'form';
    
  }

  editRow(){
    this.selctedGroup = this.groupTable.selection.selected[0];

    // loop through the fields and set the values
    for(let index in this.fieldset){
      this.fieldset[index].value = this.selctedGroup[this.fieldset[index].id];
    }

    this.formMode = 'edit';
    this.viewMode = 'form';
  }

  async deleteRow(data:any){
    this.selctedGroup = this.groupTable.selection.selected[0];

    let message = {
      'access': {
        'action': 'IAM:Group:deleteGroup',
        'resources': ['*'],
        'customers': ['*']
      },
      'data': data
    }

    try{
      let response = await this.request.sendRequest(message)
      let index = this.selctedGroup['position_123456789'] - 1
      this.groups.splice(index, 1);
      this.groupTable.setData(this.groups);
    }
    catch(error){
      alert(error);
    }
  
    
  }

  async onSave(){
    var newDataset = this.groupForm.form.value

    let action = 'IAM:Group:updateGroup';

    for(let policy of this.policies){
      if(policy['name'] == newDataset['policy']){
        newDataset['permission'] = policy['policy'];
        break;
      }
    }

    if(this.formMode == 'add'){
      action = 'IAM:Group:createGroup';
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
      console.log(message);
      let response = await this.request.sendRequest(message)
      if(this.formMode == 'add'){
        this.groups.push(newDataset);
      }
      else if(this.formMode == 'edit'){
        let index = this.selctedGroup['position_123456789'] - 1
        for(let field of Object.keys(newDataset)){
          this.groups[index][field] = newDataset[field];
        }
      }
      this.groupTable.setData(this.groups);
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
