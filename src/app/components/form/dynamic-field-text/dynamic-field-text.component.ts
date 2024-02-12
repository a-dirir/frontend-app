import { Component, Input, AfterViewInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { JsonEditorComponent, JsonEditorOptions } from 'ang-jsoneditor';


@Component({
  selector: "dynamic-field-text.component",
  templateUrl: "./dynamic-field-text.component.html",
  styleUrls: ["./dynamic-field-text.component.css"],
})
export class DynamicFieldTextComponent implements AfterViewInit{
  @Input() field!: any;
  @Input() control!: FormControl;

  public editorOptions: JsonEditorOptions;
  value:any = {};

 
  constructor() {
    this.editorOptions = new JsonEditorOptions()
      this.editorOptions.modes = ['text', 'view']; 
      this.editorOptions.mode = 'text';
      this.value = {};
  }

  ngAfterViewInit(): void {
    this.value = this.field.value;
  }

}
