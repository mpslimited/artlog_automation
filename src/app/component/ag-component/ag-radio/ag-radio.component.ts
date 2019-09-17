import { Component } from '@angular/core';
import { ICellRendererParams } from 'ag-grid';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { AgRadioService } from './ag-radio.service';



@Component({
  selector: 'app-ag-radio',
  templateUrl: './ag-radio.component.html',
  styleUrls: ['./ag-radio.component.css']
})
export class AgRadioVerticalComponent implements ICellRendererAngularComp {

  id: string;
  text = '';
  value: string = null;
  valueOnSelect = '';
  name: string;

  agParam: ICellRendererParams;

  constructor(
    private agRadioSer: AgRadioService
  ) {
    this.id = agRadioSer.getRadioID();
  }

  agInit(params: ICellRendererParams): void {

    this.agParam = params;
    this.name = params.colDef.field;
    this.valueOnSelect = params.data[params.colDef.field];
    this.value = params.data[params.colDef.field + '-config']['value'];
    const text = params.data[params.colDef.field + '-config']['text'];

    if (text) {
      this.text = params.data[params.colDef.field + '-config']['text'];
    }


  }

  onChange() {
    this.agParam.data[this.agParam.colDef.field + '-config']['value'] = this.value;
    // console.log(this.value, this.agParam);
  }

  refresh() {
    return false;
  }
}
