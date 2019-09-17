import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { GlobalDropdownModel } from '../global-dropdown';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { DropdownDataI, GlobalDropDownService } from '../global-dropdown';
// import { testData, basicSetting as BS } from './test.data';


@Component({
  selector: 'app-ag-dropdown',
  templateUrl: './ag-dropdown.component.html',
  styleUrls: ['./ag-dropdown.component.css']
})
export class AgDropdownComponent implements ICellRendererAngularComp, AfterViewInit {

  @ViewChild('myInput') myInput: any;
  myInputEle: any;
  selectedValue: any = {};

  value: any;
  params: any;
  basicSetting: GlobalDropdownModel = new GlobalDropdownModel();
  data: Array<any>;

  constructor(
    private globalDropDownService: GlobalDropDownService
  ) {
  }

  ngAfterViewInit() {
    this.myInputEle = this.myInput.nativeElement;
  }

  agInit(params: any): void {
    this.params = params;
    this.basicSetting = this.params.value.basicSetting;
    this.data = this.params.value.data;
    this.selectedValue = this.data[0];
  }

  onChange(event) {
    console.log(event);
    this.selectedValue = event;
    this.params.data[this.params.colDef.field + '-value'] = this.progateValue(event);
  }


  progateValue(val) {
    if (this.basicSetting.valueTypeOrKey === 'complete') {
      return val;
    } else {
      return val[this.basicSetting.valueTypeOrKey];
    }
  }



  showDropdown() {
    let abc: DropdownDataI | any = {};
    abc.basicSetting = this.basicSetting;
    abc.context = this;
    abc.ele = this.myInputEle;
    abc.listData = this.data;
    this.globalDropDownService
      .sendDropdownData(abc);
  }



  onMouseLeave() {
    this.myInputEle.onblur = this.myBlurFunc;
  }

  onMouseEnter() {
    this.myInputEle.onblur = null;
  }

  onFocus() {
    this.showDropdown();
  }

  myBlurFunc = () => {
    this.globalDropDownService.sendDropdownShow(false);
  }


  refresh(): boolean {
    return false;
  }
}
