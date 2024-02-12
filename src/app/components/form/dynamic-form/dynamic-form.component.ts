import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';



@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css']
})
export class DynamicFormComponent implements OnInit {
  @Input() fieldset:any;

  public form: FormGroup;


  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.form = this.formBuilder.group({});

    this.fieldset.forEach((field:any) => {
      this.form.addControl(field.id, this.initializeFormControl(field), {
        emitEvent: false,
      });
    });
  }

  initializeFormControl(field:any): FormControl {
    //return this.formBuilder.control({ value: field.value, disabled: !field.editable });
    return this.formBuilder.control(field.value);
  }

}
