import { Component, OnInit } from '@angular/core';
import { AgCheckBoxService } from '../ag-check-box/ag-check-box.service';
import { IHeaderAngularComp } from 'ag-grid-angular';
import { IHeaderParams } from 'ag-grid';

@Component({
  selector: 'app-ag-checbox-header',
  templateUrl: './ag-checbox-header.component.html',
  styleUrls: ['./ag-checbox-header.component.css']
})
export class AgChecboxHeaderComponent implements IHeaderAngularComp {
  id: string;
  value = false;
  params: IHeaderParams;

  constructor(
    private agCheckBox: AgCheckBoxService
  ) {
    this.id = agCheckBox.getID();
  }

  agInit(params: IHeaderParams): void {
    this.params = params;
  }


  onChange() {

    const field = this.params.column.getColDef().field;
    this.params.api.forEachNode((item) => {


      if (item.data[field].readonly = false) {
        if (this.value) {
          item.data[field] = Object.assign({}, item.data[field], { value: true });
        } else {
          item.data[field] = Object.assign({}, item.data[field], { value: false });
        }
      }


    });

    this.params.api.refreshCells();

  }

}
