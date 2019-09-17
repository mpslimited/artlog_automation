import { Component, OnInit } from '@angular/core';
import { ModalPopUp } from '../core-comp';
import { IDGeneratorService } from '../../core/services';
import { GlobalPopupService } from './global-popup.service';

declare var $;

@Component({
  selector: 'app-global-popup',
  templateUrl: './global-popup.component.html',
  styleUrls: ['./global-popup.component.css']
})
export class GlobalPopupComponent {

  id: string;
  msg: string;
  title: string;

  constructor(
    private idGen: IDGeneratorService,
    private globalPopSer: GlobalPopupService
  ) {
    this.id = idGen.generateNormalIDs('global-pupup');
    globalPopSer.registerComponent(this);
  }


}
