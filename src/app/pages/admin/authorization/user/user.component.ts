import { Component, OnInit,AfterViewInit, ViewChild, ViewEncapsulation   } from '@angular/core';


import { TableComponent } from '../../../../components/table/table.component';
import { DynamicFormComponent } from 'src/app/components/form/dynamic-form/dynamic-form.component';

import { RequestService } from 'src/app/services/request.service';

import {userModel} from '../../../../models/forms/admin/authorization/user';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  @ViewChild(TableComponent) userTable:any;
  @ViewChild(DynamicFormComponent) userForm:any;

  fieldset: any[] = userModel.fields;
  
  userTableInput:any = {
    id: 'userTable',
    editable: {'add': true, 'edit': true, 'delete': true},
    config:this.fieldset
  }


  viewMode = 'table';
  formMode = '';
  selctedUser:any = {}
  
  users:any = []

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
        'action': 'IAM:User:getUsers',
        'resources': ['*'],
        'customers': ['*']
      },
      'data': {}
    }

    try{
      let response = await this.request.sendRequest(message)
      this.users = response['msg'];
      this.userTable.setData(response['msg']);
    }
    catch(error){
      this.userTable.setData([]);
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
      this.fieldset[2].options = []
      for(let group of groups){
        this.groups.push(group['name']);
        this.fieldset[2].options.push({'value': group['name'], 'viewValue': group['name']});
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
    this.selctedUser = this.userTable.selection.selected[0];

    for(let index in this.fieldset){
      this.fieldset[index].value = this.selctedUser[this.fieldset[index].id];
    }

    this.formMode = 'edit';
    this.viewMode = 'form';
  }

  async deleteRow(data:any){
    this.selctedUser = this.userTable.selection.selected[0];

    let message = {
      'access': {
        'action': 'IAM:User:deleteUser',
        'resources': ['*'],
        'customers': ['*']
      },
      'data': data
    }

    try{
      let response = await this.request.sendRequest(message)
      let index = this.selctedUser['position_123456789'] - 1
      this.users.splice(index, 1);
      this.userTable.setData(this.users);
    }
    catch(error){
      alert(error);
    }
  
    
  }

  async onSave(){
    var newDataset = this.userForm.form.value

    let action = 'IAM:User:updateUser';

    if(this.formMode == 'add'){
      action = 'IAM:User:createUser';
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
        this.users.push(newDataset);
      }
      else if(this.formMode == 'edit'){
        let index = this.selctedUser['position_123456789'] - 1
        for(let field of Object.keys(newDataset)){
          this.users[index][field] = newDataset[field];
        }
      }
      this.userTable.setData(this.users);
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
