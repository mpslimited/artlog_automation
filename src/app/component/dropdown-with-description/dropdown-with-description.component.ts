import {
  Component, OnInit, Input, Output, forwardRef, AfterViewInit,
  ViewChild, EventEmitter, OnChanges, ElementRef
} from '@angular/core';
import { DropdownWithDescriptionModel } from './dropdown-with-description.model';
import { DropdownWithDescriptionService } from './dropdown-with-description.service';
import { CustomFormControl } from '../core-comp';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import { Subject } from 'rxjs';
import { Utils } from '../../core/shared';

declare var $;
const dropdownHeight = '190px';

const MY_NG_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DropdownWithDescriptionComponent),
  multi: true,
};

const MY_NG_VALIDATORS = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => DropdownWithDescriptionComponent),
  multi: true,
};

@Component({
  selector: 'app-dropdown-with-description',
  templateUrl: './dropdown-with-description.component.html',
  styleUrls: ['./dropdown-with-description.component.css'],
  providers: [
    MY_NG_VALUE_ACCESSOR,
    MY_NG_VALIDATORS
  ]
})

export class DropdownWithDescriptionComponent extends CustomFormControl implements OnInit, AfterViewInit, OnChanges {

  arrivedValue = null;

  @ViewChild('myInput') myInput: any;
  @ViewChild('dropdown') dropdownEle: any;

  @Input() basicSetting: DropdownWithDescriptionModel;
  @Input() is_editAble;
  @Input() data = new Subject<any>();
  @Output() change: EventEmitter<any> = new EventEmitter();
  @Input() Data;
  @Input() placeholder = 'Select a Value';
  @Input() header: boolean = false;




  dropdownHeight = '0px';

  ele: HTMLElement;
  show = false;
  listWidth: number;


  triggrApi: Subject<any>;

  dropdownWithDescriptionModel: DropdownWithDescriptionModel;
  listData: Array<any> = [];
  orgData: Array<any> = [];
  selectedValue: any = {};
  preValueCheckObj = {};
  selValue: string;

  constructor(
    private ddSrv: DropdownWithDescriptionService,
    private element: ElementRef
  ) {
    super();
    this.basicSetting = new DropdownWithDescriptionModel();
  }

  ngOnChanges() {
    console.log('ngOnChangesngOnChangesngOnChanges');
    if (this.Data) {
      this.convertToArray(this.Data);
    }
  }

  ngOnInit() {
    this.initSearchModel();
    this.ddSrv.errorChecking(this.basicSetting, this.name);
    this.loadData();
    this.sub_ApiTrigger();

  }

  initSearchModel() {
    this.dropdownWithDescriptionModel = this.basicSetting;
  }

  assignValueToDisplay(obj: any) {

    this.arrivedValue = obj;
    if (this.basicSetting.valueTypeOrKey === 'complete') {
      if (obj) {
        this.selectedValue = obj;
      }

    } else {
      if (obj) {
        const value = this.listData.find((item) => {
          this.selValue = item[this.basicSetting.valueTypeOrKey];
          return item[this.basicSetting.valueTypeOrKey] === obj;
        });
        if (value) {
          this.selectedValue = value;
        }

      }
    }

  }

  loadData() {
    if ((this.basicSetting.serviceUrl !== undefined) && (this.triggrApi === undefined)) {
      this.loadDataFromApi();
    } else {
      this.data.subscribe((data) => {
        this.convertToArray(data);
      });
    }
  }


  loadDataFromApi() {
    this.ddSrv
      .getData(this.basicSetting.serviceUrl, this.basicSetting.params)
      .subscribe((data) => {
        data.data = data[this.basicSetting.apiKey];
        if (Array.isArray(data) === false) {
          this.convertToArray(data);
        } else {
          this.selectedValue = data[0];
          this.assignListData(data);
        }
      });
  }

  emptySelectedValue() {

    this.selectedValue = {};
    this.progateValue(this.selectedValue);
  }

  convertToArray(obj) {
    let temp = [];
    if (!Array.isArray(obj.data)) {
      Object.keys(obj.data)
        .forEach((key) => {
          temp.push({
            key: key,
            value: obj.data[key]
          });
        });
    } else {
      temp = obj.data ? obj.data : obj;
    }

    if (this.basicSetting.serviceUrl) {
      this.selectedValue = temp[0];
    }

    this.assignListData(temp);
  }

  assignListData(data) {
    if (data) {
      this.dropdownHeight = this.ddSrv.generateDropdownHeight(data.length);
      this.listData = data;
      this.orgData = Array.from(data);

      this.assignValueToDisplay(this.arrivedValue);
      // if (this.listData.length === 1) {
      //   this.selectedValue = this.listData[0];
      // }
      this.progateValue(this.selectedValue);
    }
  }

  ngAfterViewInit() {
    this.ele = this.myInput.nativeElement;
    setTimeout(() => {
      this.listWidth = (this.ele.clientWidth * 10) / 6;
    }, 200);
  }


  onMouseLeave() {
    this.ele.onblur = this.myBlurFunc;
  }

  onMouseEnter() {
    this.ele.onblur = null;
  }


  togggleDropDown() {

    if (!this.is_editAble) {
      if (this.show) {
        this.show = false;
      } else {
        this.ele.focus();
        //   this.onFocus();
        // this.show = true;
        // this.slimScrollSetting();
      }
    }
  }


  onFocus() {
    this.setPositionOfElementToEle(this.myInput.nativeElement, this.dropdownEle.nativeElement, 350);
    this.show = true;
    this.slimScrollSetting();

  }


  setPositionOfElementToEle(targetEle: any, outputEle: any, DEFAULT_Height: number) {
    this.ddSrv.setPositionOfElementToEle(targetEle, outputEle, DEFAULT_Height, dropdownHeight);
  }

  onKeyUp(val: any) {
    this.listData = this.ddSrv.filterDropdown(val.value, this.orgData, this.dropdownWithDescriptionModel);




  }

  myBlurFunc = () => {

    this.show = false;
    const value = this.selectedValue[this.dropdownWithDescriptionModel.displayKey];

    if (this.ele['value'] === '') {
      this.emptySelectedValue();
    } else {
      this.ele['value'] = value ? value : '';
    }


  }


  onShownBodyClick(val) {

    console.log(val);
    this.show = false;
    this.selectedValue = val;
    this.selValue = val.issueDate;
    this.progateValue(val);
  }

  progateValue(val) {
    this.passOnlyNewValue(val);
  }


  passOnlyNewValue(val: any) {

    Utils.checkForNewValue(typeof val === 'object' ? JSON.stringify(val) : val, this.preValueCheckObj)
      .then((value) => {

        if (this.basicSetting.valueTypeOrKey === 'complete') {
          this.propagateChange(val);
          this.arrivedValue = val;
          this.change.emit(val);
        } else {
          if (val[this.basicSetting.valueTypeOrKey]) {
            this.arrivedValue = val[this.basicSetting.valueTypeOrKey];
            this.propagateChange(val[this.basicSetting.valueTypeOrKey]);
            this.change.emit(val[this.basicSetting.valueTypeOrKey]);
          }
        }

      })
      .catch((error) => {
        console.log(error);
      });
  }

  sub_ApiTrigger() {
    if (this.triggrApi instanceof Subject) {
      this.triggrApi
        .subscribe(() => {
          this.loadDataFromApi();
        });
    }
  }

  slimScrollSetting() {

    this.ddSrv.slimScrollSetting(dropdownHeight);

  }

}

