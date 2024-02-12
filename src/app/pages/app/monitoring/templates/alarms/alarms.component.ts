import { Component, OnInit,AfterViewInit, ViewChild, ViewEncapsulation   } from '@angular/core';

import { TableComponent } from '../../../../../components/table/table.component';
import { DynamicFormComponent } from 'src/app/components/form/dynamic-form/dynamic-form.component';

import { RequestService } from 'src/app/services/request.service';
import { NavigatorService } from 'src/app/services/navigator.service';

import {alarmsTemplateModel} from '../../../../../models/forms/app/monitoring/templates';

@Component({
  selector: 'app-alarms',
  templateUrl: './alarms.component.html',
  styleUrls: ['./alarms.component.css']
})
export class AlarmsComponent {
  @ViewChild(TableComponent) table:any;
  @ViewChild(DynamicFormComponent) notificationForm:any;

  fieldset: any[] = alarmsTemplateModel.fields;
  
  tableInput:any = {
    id: 'table',
    editable: {'add': true, 'view':true, 'edit': true, 'delete': true},
    config:this.fieldset
  }


  viewMode = 'table';
  formMode = '';
  selctedRow:any = {}
  
  alarms:any = []
  domains: any = []

  inputVariables:any = {}
  templateVariables:any = {}
  currentTemplate = ''

  currentCustomer = '';


  constructor(public request: RequestService, private navService: NavigatorService) {
    this.listenForCustomerChange();
  }

  ngOnInit(): void {}

  ngAfterViewInit(){
    this.getTableData();
  }

  listenForCustomerChange() {
    this.navService.customerChange.subscribe((value) => {
      this.currentCustomer = this.navService.getCurrentCustomer();
      this.getTableData();
    });
  }

  onTableOutput(event:any){
    
    let action = event.action;

    if(action == 'add'){
      this.addRow();
    }else if(action == 'delete'){
      this.deleteRow(event.data);
    }else if(action == 'edit'){
      this.editRow();
    }else if(action == 'view'){
      this.viewRow();
    }
    
  }

  async getTableData(){
    let message = {
      'access': {
        'action': 'Monitoring:AlarmTemplate:getTemplates',
        'resources': ['*'],
        'customers': [this.navService.getCurrentCustomer()]
      },
      'data': {}
    }

    try{
      let response = await this.request.sendRequest(message)
      this.alarms = response['msg'];
      this.table.setData(response['msg']);
    }
    catch(error){
      this.table.setData([]);
      alert(error);
    }
  }

  viewRow(){
    this.selctedRow = this.table.selection.selected[0];
    let variables = this.selctedRow['variables'].split(',');
    for (let variable of variables){
      this.inputVariables[variable] = ''
      this.templateVariables[variable] = '';
    }
    this.fillTemplate();
    this.viewMode = 'template';
  }

  addRow(){
    this.formMode = 'add';
    this.viewMode = 'form';    
  }

  editRow(){
    this.selctedRow = this.table.selection.selected[0];

    // loop through the fields and set the values
    for(let index in this.fieldset){
      this.fieldset[index].value = this.selctedRow[this.fieldset[index].id];
    }

    this.formMode = 'edit';
    this.viewMode = 'form';
  }

  async deleteRow(data:any){
    this.selctedRow = this.table.selection.selected[0];

    let message = {
      'access': {
        'action': 'Monitoring:AlarmTemplate:deleteTemplate',
        'resources': ['*'],
        'customers': [this.navService.getCurrentCustomer()]
      },
      'data': data
    }

    try{
      let response = await this.request.sendRequest(message)
      let index = this.selctedRow['position_123456789'] - 1
      this.alarms.splice(index, 1);
      this.table.setData(this.alarms);
    }
    catch(error){
      alert(error);
    }
  
    
  }

  async onSave(){
    var newDataset = this.notificationForm.form.value

    let action = 'Monitoring:AlarmTemplate:updateTemplate';

    if(this.formMode == 'add'){
      action = 'Monitoring:AlarmTemplate:createTemplate';
    }

    let message = {
      'access': {
        'action': action,
        'resources': ['*'],
        'customers': [this.navService.getCurrentCustomer()]
      },
      'data': newDataset
    }

    try{
      let response = await this.request.sendRequest(message)
      if(this.formMode == 'add'){
        this.alarms.push(newDataset);
      }
      else if(this.formMode == 'edit'){
        let index = this.selctedRow['position_123456789'] - 1
        for(let field of Object.keys(newDataset)){
          this.alarms[index][field] = newDataset[field];
        }
      }
      this.table.setData(this.alarms);
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

  fillTemplate(){
    let text = this.selctedRow['template'];
    let variables = this.selctedRow['variables'].split(',');
    for(let variable of variables){
      if(this.templateVariables[variable] != ''){
        text = text.replace('{{'+variable+'}}', this.templateVariables[variable]);
      }
      
    }
    this.currentTemplate = text;
  }


  setVariable(variableKey:any, event:any){
    this.templateVariables[variableKey] = event.target.value;
    this.fillTemplate();
  }

  copyToClipboard(){
    navigator.clipboard.writeText(this.currentTemplate);
  }

}
