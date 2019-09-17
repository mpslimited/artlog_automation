import { Component, OnInit, Input, Output, EventEmitter, OnChanges, forwardRef, ChangeDetectorRef } from '@angular/core';
import { IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts } from 'angular-2-dropdown-multiselect';
import { mySettings, myTexts } from './setting';
import { SelectService } from './select.service';
import { CustomFormControl } from '../core-comp';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Utils } from '../../core/shared';


const MY_NG_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SelectComponent),
  multi: true,
};

const MY_NG_VALIDATORS = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => SelectComponent),
  multi: true,
};


@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css'],
  providers: [
    MY_NG_VALUE_ACCESSOR,
    MY_NG_VALIDATORS
  ]
})
export class SelectComponent extends CustomFormControl implements OnInit, OnChanges {


  @Input() Data;
  @Input() mulitSelect = false;
  @Input() outputKey: 'complete' | string = 'key';
  @Input() placeholder = 'Select a Value';
  @Input() params: any;
  @Input() isDisabled: false;
  @Input() url: string = null;
  @Input() apiKey: string = null;
  @Input() ifClearReq: boolean;
  @Output() change: EventEmitter<any> = new EventEmitter();
  @Output() remove: EventEmitter<any> = new EventEmitter();

  optionsModel: number[];
  myOptions = [];
  emittedValues: any;
  mySettings: IMultiSelectSettings = Object.assign({}, mySettings);
  myTexts: IMultiSelectTexts = Object.assign({}, myTexts);




  constructor(
    private selectSer: SelectService,
    private cdr: ChangeDetectorRef
  ) {
    super();
  }

  ngOnInit() {
  }


  ngOnChanges() {
    this.convertToSelectData();

    this.enableMultiSelect();
    this.setPlaceHolder();
    this.cdr.detectChanges();
    if (this.ifClearReq === false) {
      this.myTexts['uncheckAll'] = '';
    }
    this.resetMysettingNtext();
  }

  assignValueToDisplay(obj: any) {


    console.log('assignValueToDisplay', this.optionsModel)

    if (Array.isArray(obj)) {
      this.optionsModel = [];
      obj.forEach((item) => {
        this.optionsModel.push(item['id'] || item);
      });
      this.optionsModel = Array.from(this.optionsModel);

    } else if (obj === null || obj === undefined || obj === '') {
      this.optionsModel = [];
    } else {
      this.optionsModel = [obj];
    }
    this.optionsModel = Array.from(this.optionsModel);
    this.cdr.detectChanges();
    console.log('assignValueToDisplay', this.optionsModel)
    return false;
  }

  convertToSelectData() {
    this.myOptions = this.selectSer.convertToSelectData(this.Data);
    this.cdr.detectChanges();

  }



  onChange(val: any) {

    this.value = this.selectSer.findItems(this.myOptions, this.outputKey, val);
    this.emitValues();

  }



  onRemove(val: any) {

    this.remove.emit('');

  }


  emitValues() {
    this.emittedValues = this.beforePropagateChange();

    if (Utils.isEmpty(this.emittedValues)) {

    } else {
      this.propagateChange(this.emittedValues);
      this.change.emit(this.emittedValues);
    }


    console.log(this.emittedValues, this.optionsModel)
  }


  beforePropagateChange() {
    if (this.mulitSelect) {
      return this.value;
    } else {
      return this.value[0] || null;
    }
  }


  enableMultiSelect() {

    if (this.mulitSelect) {
      this.mySettings['closeOnSelect'] = false;
      this.mySettings['autoUnselect'] = false;
    } else {
      this.mySettings['selectionLimit'] = 1;
      this.mySettings['autoUnselect'] = true;
    }

  }


  setPlaceHolder() {

    if (this.placeholder) {
      this.myTexts['defaultTitle'] = this.placeholder;
    }
  }


  getData() {
    if (this.url) {
      this.selectSer.getData(this.url, this.params)
        .subscribe((data) => {
          this.myOptions = this.selectSer.convertToSelectData(data[this.apiKey]);
          this.value = this.myOptions[0];
          this.emitValues();
        });
    }
  }


  resetMysettingNtext() {
    this.mySettings = Object.assign({}, this.mySettings);
    this.myTexts = Object.assign({}, this.myTexts);
    this.cdr.detectChanges();


  }


}
