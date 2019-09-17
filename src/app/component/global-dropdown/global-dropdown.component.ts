import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { GlobalDropdownModel } from './global-dropdown.model';

import { GlobalDropDownService } from './global-dropdown.service';


declare var $;

@Component({
  selector: 'app-global-dropdown',
  templateUrl: './global-dropdown.component.html',
  styleUrls: ['./global-dropdown.component.css']
})
export class GlobalDropdownComponent implements OnInit, AfterViewInit {



  DEFAULT_WIDTH = 350;

  @ViewChild('me') me: any;
  meELe: any;
  basicSetting: GlobalDropdownModel = new GlobalDropdownModel();
  listData: Array<any> = [];
  ele: any = {};

  context: any = {};

  listWidth = 100;
  show = false;
  selectedValue: any = {};
  constructor(
    private gddServ: GlobalDropDownService
  ) { }

  ngOnInit() {
    this.sub_GetDropdownData();
    this.sub_Show();
  }

  ngAfterViewInit() {
    this.meELe = this.me.nativeElement;
  }


  sub_GetDropdownData() {

    this.gddServ.getData
      .subscribe((data) => {
        this.show = true;
        this.basicSetting = data.basicSetting;
        this.listData = data.listData;
        this.ele = data.ele;
        this.context = data.context;


        this.setPositionOfElementToEle(this.ele, this.meELe, this.DEFAULT_WIDTH);
        this.listWidth = this.DEFAULT_WIDTH;
        // const { bottom, height, left, right, top, width } = this.ele.getBoundingClientRect();
        // //     this.listWidth = (width > this.DEFAULT_WIDTH) ? width : this.DEFAULT_WIDTH;
        // this.listWidth = this.DEFAULT_WIDTH;
        // const bodyRect: any = document.body.getBoundingClientRect();
        // //
        // //
        // // clientWidth

        // const windowWidth = window.outerWidth;
        // const windowInnerHeight = window.innerHeight;
        // let eleTop = top + height + (-bodyRect.y);

        // if (eleTop > (windowInnerHeight - this.DEFAULT_WIDTH)) {
        //   eleTop = eleTop - this.DEFAULT_WIDTH + 17;
        // }


        // if (windowWidth < this.listWidth + left) {
        //   this.meELe.style.left = windowWidth;
        // } else {
        //   this.meELe.style.left = (left) + 'px';
        // }

        // this.meELe.style.position = 'absolute';

        // this.meELe.style.top = eleTop + 'px';


      });
  }

  setPositionOfElementToEle(targetEle: any, outputEle: any, DEFAULT_WIDTH: number) {
    const { bottom, height, left, right, top, width } = targetEle.getBoundingClientRect();
    const bodyRect: any = document.body.getBoundingClientRect();
    const windowWidth = window.outerWidth;
    const windowInnerHeight = window.innerHeight;
    let eleTop = top + height + (-bodyRect.y);

    if (eleTop > (windowInnerHeight - DEFAULT_WIDTH)) {
      eleTop = eleTop - DEFAULT_WIDTH + 17;
    }


    if (windowWidth < DEFAULT_WIDTH + left) {
      outputEle.style.left = windowWidth;
    } else {
      outputEle.style.left = (left) + 'px';
    }

    outputEle.style.position = 'absolute';

    outputEle.style.top = eleTop + 'px';
  }



  sub_Show() {
    this.gddServ.getShow.subscribe((show) => {
      this.show = show;
    });
  }


  onShownBodyClick(val) {

    this.show = false;
    this.selectedValue = val;
    this.context.onChange(this.selectedValue);
    // this.progateValue(val);
  }

  progateValue(val) {
    if (this.basicSetting.valueTypeOrKey === 'complete') {
      this.selectedValue = val;
    } else {
      this.selectedValue = val[this.basicSetting.valueTypeOrKey];
    }
  }



  onMouseLeave() {

    this.ele.onblur = this.myBlurFunc;
  }

  onMouseEnter() {

    this.ele.onblur = null;
  }

  myBlurFunc = () => {
    this.show = false;
  }

}




// slimScrollSetting() {
//   setTimeout(() => {
//     $('.dropDownSlim').slimScroll({
//       color: '#000',
//       size: '5px',
//       height: '300px',
//       alwaysVisible: true
//     });
//   }, 100);
// }


