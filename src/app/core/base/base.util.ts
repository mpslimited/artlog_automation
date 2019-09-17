import { BasicSearchKey } from './base.search.model';
import { ColDef } from 'ag-grid';
import { ProjectUtils } from '../shared';
import { LoaderComponent } from '../../component';

export class BaseUtil {

      public static globalLoader: LoaderComponent;

      public static getApiObj(searchModel: any): Object {

            let basicSearchKey: BasicSearchKey;
            const apiObj: any = {};
            const keys = Object.keys(searchModel);
            keys.forEach((key: string) => {
                  if (typeof searchModel[key] === 'object') {
                        basicSearchKey = searchModel[key];
                        const apiValue = basicSearchKey.value;
                        if (apiValue === null || apiValue === undefined) {
                              apiObj[basicSearchKey.apiKey] = '';
                        } else {
                              apiObj[basicSearchKey.apiKey] = apiValue;
                        }
                  }
            });
            return apiObj;
      }

      //  retValue += '&' + encodeURIComponent(val.apiKey) + '=' + encodeURIComponent(val.value);

      public static getApiParams(...apiObjs: Array<any>): string {
            let retValue = '';
            apiObjs.forEach((apiObj) => {
                  retValue += BaseUtil.convertObjToEncodeURIComponent(apiObj);
            });
            retValue = retValue.substring(1);
            return retValue;
      }


      private static convertObjToEncodeURIComponent(apiObj: any): string {
            let retValue = '';
            const keys = Object.keys(apiObj || {});
            keys.forEach((key) => {
                  retValue += '&' + encodeURIComponent(key) + '=' + encodeURIComponent(apiObj[key]);
            });
            return retValue;
      }


      public static getValueFromSearchModel(searchModel: any): Object {
            const obj = {};
            const keys = Object.keys(searchModel);
            keys.forEach((key) => {
                  obj[key] = searchModel[key].value;
            });
            return obj;
      }


      public static setValueFromSession(searchModel: any, sessionModel: any) {
            const keys = Object.keys(sessionModel || {});
            keys.forEach((key) => {
                  searchModel[key].value = sessionModel[key];
            });
      }


      public static setGlobalLoader(globalLoader: LoaderComponent) {
            BaseUtil.globalLoader = globalLoader;
      }

      public static showGlobalLoader() {
            BaseUtil.globalLoader.show = true;
      }



      public static hideGlobalLoader() {
            BaseUtil.globalLoader.show = false;
      }

}




export class BaseGridUtil {
      public static createDynamicColumns(obj: any): Array<ColDef> {

            const columns: Array<ColDef> = [];
            const keys = Object.keys(obj);
            const len = keys.length;
            let width = 10;
            width = 100 / len;
            columns.push();
            keys.forEach((val) => {
                  columns.push({
                        headerName: val.split('_').join(' '),
                        field: val,
                        minWidth: ProjectUtils.ag_SetWidth(width)
                  });
            });

            return columns;

      }
}