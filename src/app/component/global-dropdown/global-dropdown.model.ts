export interface ListDisplayKeysI {
      displayKey: string;
      headerName: string;
}

export class GlobalDropdownModel {
      ListDisplayKeys: Array<ListDisplayKeysI> = [];
      displayKey: string = null;
      descriptionKey?: string = null;
      valueTypeOrKey?: 'complete' | string = 'complete';
}
