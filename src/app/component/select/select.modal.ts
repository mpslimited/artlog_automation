import { EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';




export class DropdownDataModel {
      data: Array<any>;
      constructor(data: Array<any> = [], defaultKey: string = '') {
            this.data = data;
      }
}

// description
// display
// extra
// key
