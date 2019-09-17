import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs/observable';
import { GlobalDropdownModel } from './global-dropdown.model';

export interface DropdownDataI {
      basicSetting: GlobalDropdownModel;
      listData: Array<any>;
      ele: any;
      context: any;
}

@Injectable()
export class GlobalDropDownService {

      private sendData: Subject<DropdownDataI> = new Subject<DropdownDataI>();
      public getData: Observable<DropdownDataI> = this.sendData.asObservable();

      private sendShow: Subject<boolean> = new Subject<boolean>();
      public getShow: Observable<boolean> = this.sendShow.asObservable();

      constructor() {
      }

      sendDropdownData(dropdownData: DropdownDataI) {
            this.sendData.next(dropdownData);
      }

      sendDropdownShow(show: boolean) {
            this.sendShow.next(show);
      }

}

