import { Injectable } from '@angular/core';
import { AlertMessageModel } from './alert-message.model';
import { Subject ,  Observable } from 'rxjs';
// import { AlertMessageComponent } from './alert-message.component';

@Injectable()

export class AlertMessageService {

      private alertRxSub: Subject<any> = new Subject();
      alertRxObs: Observable<any> = this.alertRxSub.asObservable();

      alertMsgModel: AlertMessageModel;

      constructor() {
      }


      show(msg: Array<string>) {
            this.alertMsgModel = new AlertMessageModel(msg);
            this.alertRxSub.next(this.alertMsgModel);
      }

      showAlertScucess(msg: Array<string>, duration?: number) {
            this.alertMsgModel = new AlertMessageModel(msg, duration);
            this.alertRxSub.next(this.alertMsgModel);
      }

      showAlertDanger(msg: Array<string>, duration?: number) {
            this.alertMsgModel = new AlertMessageModel(msg, duration, 'alert-danger');
            this.alertRxSub.next(this.alertMsgModel);
      }



}

