import { Component, OnInit, Input } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
@Component({
  selector: 'app-radio-button',
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.css']
})
export class RadioButtonComponent implements ICellRendererAngularComp {
  name: string;
  value: any;
  defaultValue: any;
  outputKeyInData: string;
  params: any;

  constructor() { }

  agInit(params: any): void {
    this.params = params;
    this.defaultValue = this.params.value.defaultValue;
    this.name = this.params.value.name;
    this.value = this.params.value.value;
    this.outputKeyInData = this.params.value.outputKeyInData;
    this.params.data[this.outputKeyInData] = this.params.value.value;
  }

  onChange() {
    this.params.data[this.outputKeyInData] = this.value;
  }


  refresh() {
    return false;
  }

}
