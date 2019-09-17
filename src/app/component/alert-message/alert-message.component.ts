import { Component, OnInit, Input, NgZone } from '@angular/core';
import { AlertMessageModel } from './alert-message.model';
import { Subject } from 'rxjs';
import { AlertMessageService } from './alert-message.service';
import { IDGeneratorService } from '../../core/services';
import { ProjectUtils } from '../../core/shared';

declare var $;

@Component({
  selector: 'app-alert-message',
  templateUrl: './alert-message.component.html',
  styleUrls: ['./alert-message.component.css']
})
export class AlertMessageComponent {

  id: string;
  alertType: string;
  msg: Array<string> = [];


  constructor(
    public alertService: AlertMessageService,
    private idGen: IDGeneratorService
  ) {
    this.id = idGen.generateNormalIDs('alert-msg');
    this.SubToAlertRxSub();

  }



  SubToAlertRxSub() {
    this.alertService.alertRxObs
      .subscribe((data: AlertMessageModel) => {
        this.alertType = data.type;
        this.msg = data.message;
        ProjectUtils.html.showMsgForDuration(this.id, data.timeToLive);

      });
  }

}
