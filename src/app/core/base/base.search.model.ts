
export interface BasicSearchModelI {
      value: any | string | Array<any>;
      apiKey: string;
      fillFromKey?: string;

      defaultValue?: any | string | Array<any>;
      label?: string;
      placeholder?: string;
}


export interface BaseSearchModelI {
      apiDatakey?: string;
      apiGridHeaderKay?: string;
}


export class BasicSearchKey {
      value: any | string | Array<any>;

      private _apiKey: string;
      get apiKey(): string {
            return this._apiKey;
      }

      private _fillFromKey: string;
      public get fillFromKey() {
            return this._fillFromKey;
      }

      constructor(apiKey: string, fillFromKey: string = '', value: any = '') {
            this._apiKey = apiKey;
            this._fillFromKey = fillFromKey === '' ? apiKey : fillFromKey;
            this.value = value;
      }
}






export class BaseSearchModel {
      constructor() {
      }
}
