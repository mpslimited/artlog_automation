import { Component } from '@angular/core';
import { AgCheckBoxService } from './ag-check-box.service';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid';

@Component({
  selector: 'app-ag-check-box',
  templateUrl: './ag-check-box.component.html',
  styleUrls: ['./ag-check-box.component.css']
})
export class AgCheckBoxComponent implements ICellRendererAngularComp {

  id: string;
  value: string;
  isReadonly = false;
  agParam: ICellRendererParams;
  constructor(
    private agCheckSer: AgCheckBoxService
  ) {
    this.id = agCheckSer.getID();
  }

  agInit(params: ICellRendererParams): void {
    this.agParam = params;
    this.value = this.agParam.data[this.agParam.colDef.field].value;
    this.isReadonly = this.agParam.data[this.agParam.colDef.field].readonly;
  }


  onChange() {
    this.agParam.data[this.agParam.colDef.field].value = this.value;
    console.log(this.agParam.data);
  }


  refresh() {
    return false;
  }

}
