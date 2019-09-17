import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { BaseService } from '../../../../core/base';
import { BaseComponent } from '../../../../core/base/base.component';
import { DropdownWithDescriptionModel } from '../../../../component/dropdown-with-description/dropdown-with-description.model';

@Component({
  selector: 'app-process-repeating',
  templateUrl: './process-repeating.component.html',
  styleUrls: ['./process-repeating.component.css']
})
export class ProcessRepeatingComponent implements OnInit {

  dropDown: any;
  notification1: any;
  // @Output() disabled = new EventEmitter();

  @Input() repeatingCheck;
  @Input() is_edit;
  basicSetting: DropdownWithDescriptionModel;


  constructor() {



  }

  ngOnInit() {
    this.initDropdown();
    console.log('ProcessRepeatingComponent>ngOnInit>is_edit:', this.is_edit);
  }


  initDropdown() {

    this.basicSetting = new DropdownWithDescriptionModel();
    this.basicSetting.ListDisplayKeys = [{
      headerName: 'Key',
      displayKey: 'key'
    }];
    this.basicSetting.displayKey = 'key';
    this.basicSetting.serviceUrl = 'https://mysocietyconnect.com/mps/cs/interval_unit_dropdown.json';
    this.basicSetting.valueTypeOrKey = 'key';
  }

}
