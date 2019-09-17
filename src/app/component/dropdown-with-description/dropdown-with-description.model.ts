
import { Subject } from 'rxjs';

export interface ListDisplayKeysI {
      displayKey: string;
      headerName: string;
}

export class DropdownWithDescriptionModel {
      ListDisplayKeys: Array<ListDisplayKeysI> = [];
      displayKey: string = null;
      descriptionKey?: string = null;
      valueTypeOrKey?: 'complete' | string = 'complete';
      serviceUrl: string;
      params?: any = {};
      trigger?: Subject<any>;
      apiKey?: string;


      constructor(valueTypeOrKey?: string, ListDisplayKeys?: Array<ListDisplayKeysI>,
            displayKey?: string, descriptionKey?: string) {
            this.ListDisplayKeys = ListDisplayKeys || [{
                  displayKey: 'value',
                  headerName: '-select-'
            }];

            this.ListDisplayKeys[0].displayKey = 'display';

            this.displayKey = displayKey || 'display';
            if (displayKey === 'value') {
                  this.displayKey = 'display';
            }




            this.descriptionKey = descriptionKey || '';
            this.valueTypeOrKey = valueTypeOrKey || 'key';
      }


}


export class DropdownDataModel {
      data: Array<any>;
      constructor(data: Array<any> = [], defaultKey: string = '') {
            this.data = data;
      }
}

export class DropdownDataModelWithZeroIndex {
      data: Array<any>;
      constructor(data: Array<any> = [], defaultKey: string = '') {
            const myVal = [{ key: '', display: '---Select Value---', description: null, extra: null }];
            this.data = myVal.concat(data);
      }
}