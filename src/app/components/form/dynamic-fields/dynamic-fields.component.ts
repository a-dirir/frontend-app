import {Component, Input, OnInit, ViewChild, ViewContainerRef,} from '@angular/core';
import {FormArray, FormControl, FormGroupDirective, Validators,} from '@angular/forms';

import { DynamicFieldTextComponent } from '../dynamic-field-text/dynamic-field-text.component';


@Component({
  selector: 'app-dynamic-fields',
  templateUrl: './dynamic-fields.component.html',
  styleUrls: ['./dynamic-fields.component.css']
})
export class DynamicFieldsComponent {
  @ViewChild('dynamicField', { read: ViewContainerRef })
  formRef: ViewContainerRef;

  @Input() field: any;

  control!: FormControl;

  constructor(private formGroupDir: FormGroupDirective, private viewContainerRef: ViewContainerRef) {}

  ngOnInit(): void {
    if (this.field) {
      this.control = this.formGroupDir.control.get(
        this.field.id
      ) as FormControl;

      this.createFields();
    }
  }

  createFields(): void {
    const component = this.viewContainerRef.createComponent(
      DynamicFieldTextComponent
    );
    component.instance.field = this.field;
    component.instance.control = this.control;
    //component.instance.control.addValidators(Validators.required);
  }

}
