import { Injectable } from '@angular/core';
import { ModalPopUp } from '../core-comp';
import { GlobalPopupComponent } from './global-popup.component';
import { Router } from '@angular/router';
@Injectable()

export class GlobalPopupService extends ModalPopUp {

      private globalPopUpComp: GlobalPopupComponent;

      constructor(
            private router: Router
      ) {
            super();
      }

      registerComponent(globalPopUpComp: GlobalPopupComponent) {
            this.globalPopUpComp = globalPopUpComp;
      }

      showGlobalPopup(msg: string, title = 'Alert!') {
            this.globalPopUpComp.msg = msg;
            this.globalPopUpComp.title = title;
            this.show(this.globalPopUpComp.id);
      }

      navigateTo(command: any[]) {
            this.router.navigate(command);
      }

}

