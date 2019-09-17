import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from '../../core/base';
import { HttpService } from '../../core/services';

@Injectable()

export class SelectService extends BaseService {


      constructor(
            protected http: HttpService
      ) {
            super(http);
      }

      getData(url: string, params: any): Observable<any> {


            let retValue = '';
            const keys = Object.keys(params);
            keys.forEach((key) => {
                  const val: any = params[key];
                  if (val) {
                        retValue += '&' + encodeURIComponent(key) + '=' + encodeURIComponent(val);
                  }
            });
            retValue = retValue.substring(1);
            return this.getDataFromAPI(url, retValue);
      }



      convertToSelectData(data: any) {
            if (data && Array.isArray(data.data)) {
                  const optionModalData = data.data.map((item) => {
                        return {
                              id: item['key'],
                              name: item['display'],
                              extra: item['extra'],
                              description: item['description']
                        };
                  });
                  return optionModalData;
            } else {
                  return [];
            }
      }



      convertToSelectDataReverse(data: any) {
            const optionModalData = data.map((item) => {
                  return {
                        key: item['id'],
                        display: item['name'],
                        extra: item['extra'],
                        description: item['description']
                  };
            });

            return optionModalData;
      }


      findItems(data: Array<any>, outputKey: string, values: Array<any>): Array<any> {

            const retValue = data.filter((item) => {
                  for (let i = 0; i < values.length; i++) {
                        const element = values[i];
                        if (element === item['id']) {
                              return true;
                        }
                  }
                  return false;
            });




            if (outputKey === 'complete') {
                  return this.convertToSelectDataReverse(retValue);
            } else {

                  const temp = this.convertToSelectDataReverse(retValue);

                  const newRet = temp.map((item) => {
                        return item[outputKey];
                  });

                  return newRet;

            }




      }


}

