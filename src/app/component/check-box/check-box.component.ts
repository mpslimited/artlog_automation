import { Component, OnInit, forwardRef, Input, Output, EventEmitter } from '@angular/core';

import { NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import { CustomFormControl } from '../core-comp';
import { IDGeneratorService } from '../../core/services';
// import { EventEmitter } from 'events';


const dropdownHeight = '190px';

const MY_NG_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CheckBoxComponent),
  multi: true,
};

const MY_NG_VALIDATORS = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => CheckBoxComponent),
  multi: true,
};



@Component({
  selector: 'app-check-box',
  templateUrl: './check-box.component.html',
  styleUrls: ['./check-box.component.css'],
  providers: [
    MY_NG_VALUE_ACCESSOR,
    MY_NG_VALIDATORS
  ]
})
export class CheckBoxComponent extends CustomFormControl implements OnInit {

  @Input() label = 'Check this custom checkbox';
  @Output() valueChange: EventEmitter<any> = new EventEmitter();
  @Input() disabled = 0;
  @Input() Autoeventfire = true;


  id: string;
  get _value() {
    if (this.value == 0) {
      return false;
    } else if (this.value == 1) {
      return true;
    }
    return false;
  }

  set _value(val) {
  }

  get _disabled() {

    if (this.disabled == 0) {
      return false;
    } else if (this.disabled == 1) {
      return true;
    }
    return false;
  }

  set _disabled(val) {
  }


  assignValueToDisplay(value: any) {
    if (value === null || value === undefined) {
      this.value = 0;
    } else {
      this.value = value;
    }

    if (this.Autoeventfire !== false) {
      this.propagateChange(this.value);
      this.valueChange.emit(this.value);
    }
  }

  constructor(
    private idGen: IDGeneratorService
  ) {
    super();
    this.id = this.idGen.generateNormalIDs('check-box');
  }

  ngOnInit() {

  }



  onChange(event: any) {
    this.setValueToBoolean();
    this.propagateChange(this.value);
    this.valueChange.emit(this.value);
  }

  setValueToBoolean() {
    if (this._value === false) {
      this.value = 1;
    } else {
      this.value = 0;
    }
  }


}
