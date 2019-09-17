import { Component, OnInit, Input, ElementRef, Renderer2 } from '@angular/core';
import { TemplateRef } from '@angular/core';
import { Router } from '@angular/router';

import { CustomModalPopUpService } from '../../component/custom-modal-pop-up/custom-modal-pop-up.service';
import { CustomModalPopUpModel } from '../../component/custom-modal-pop-up/custom-modal-pop-up.model';
import { DropdownDataModel } from '../select';
declare var $: any;

import { GlobalProcessRoutingService } from '../../core/services';
import { Subscription } from 'rxjs';

import { SessionObject, Utils, ProjectUtils } from '../../core/shared/index';
import { BaseComponent, BaseService } from '../../core/base';
import { GuardService } from '../../core/guard/guard.service';
import { TopMenuBarModel } from './top-menu-bar.model';

@Component({
  selector: 'app-top-menu-bar',
  templateUrl: './top-menu-bar.component.html',
  styleUrls: ['./top-menu-bar.component.css']
})
export class TopMenuBarComponent extends BaseComponent implements OnInit {
  newProcessbasicSetting: any;
  currentMenu: any;
  subscription: Subscription;
  showHidePopup: any = false;
  topMenuBarModel: TopMenuBarModel;
  referenceID: any;
  AlertType: any;
  pathArr: any;
  NAME_NEW_PROCESS = 'NEW_PROCESS';
  NAME_PROCESS_TYPE = 'PROCESS_TYPE';
  NAME_PROCESS_DETAILS = 'NAME_PROCESS_DETAILS';
  // click = 0;
  moduleSeleted = 0;

  readytoGo: any;
  readytoGo1: any;
  newProcessType: DropdownDataModel;
  docRefFlag: boolean;



  constructor(
    protected router: Router,
    protected customModalPopService: CustomModalPopUpService,
    private globalProcessRoutingService: GlobalProcessRoutingService,
    protected baseService: BaseService,
    private grdSer: GuardService,
    private renderer: Renderer2,
    private el: ElementRef
  ) {
    super(baseService, router);
    
    this.docRefFlag = true;
  }
 
  

  initSearchModels() {
    this.topMenuBarModel = new TopMenuBarModel();
  }

  ngOnInit() {
   

  }

  // getServiceUrl(name): any {
  //   if (name === this.NAME_NEW_PROCESS) {
  //     return ProcessUrls.TK_ADD_NEW_PROCESS_URL;
  //   } else if (name === this.NAME_PROCESS_TYPE) {
  //     return ProcessUrls.TK_PROCESS_TYPE_URL;
  //   }
  // }

  getNonSearchModelParams(name: string) {
    
    if (name === this.NAME_NEW_PROCESS) {
      const obj = {
        processType: this.pathArr
      };
      return obj;
    }

  }


  clickEvent(elm) {

    elm.click();
  }

  resetClick() {
    this.topMenuBarModel.processType.value = '';
  }

}



















