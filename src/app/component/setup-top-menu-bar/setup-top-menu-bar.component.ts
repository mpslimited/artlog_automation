import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TemplateRef } from '@angular/core';
import { Router } from '@angular/router';

import { CustomModalPopUpService } from '../../component/custom-modal-pop-up/custom-modal-pop-up.service';
import { CustomModalPopUpModel } from '../../component/custom-modal-pop-up/custom-modal-pop-up.model';
declare var $: any;

import { GlobalProcessRoutingService } from '../../core/services';
import { Subscription } from 'rxjs';

import { SessionObject, Utils, ProjectUtils } from '../../core/shared/index';
import { BaseService } from '../../core/base/base.service';
import { GuardService } from '../../core/guard/guard.service';


@Component({
  selector: 'app-setup-top-menu-bar',
  templateUrl: './setup-top-menu-bar.component.html',
  styleUrls: ['./setup-top-menu-bar.component.css']
})
export class SetupTopMenuBarComponent implements OnInit {
  newProcessbasicSetting: any;
  currentMenu: any;
  subscription: Subscription;
  






  constructor(
    protected router: Router,
    protected customModalPopService: CustomModalPopUpService,
    private globalProcessRoutingService: GlobalProcessRoutingService,
    protected baseService: BaseService,
    private grdSer: GuardService
  ) {

    
  }

  

  ngOnInit() {

  }
 


  
 
  
  myChangeHandler(value: any) {
    // this.pathArr = [];
    
    // this.pathArr.push(value);
  }
  clickEvent(elm) {
    elm.click();
  }



}

