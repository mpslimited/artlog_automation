
export interface CondiionalRoleI {
      key: string;
      conditonStr: string;
      outputKey: string;
}


export interface RadioConfiI {
      key: string;
      conditonStr: string;
      outputKey: string;
      outputKeyInData: string;
}

export class ArrayUtil {

      static count = 0;
      addKeyWithBoolen(data: Array<any>, keys: Array<CondiionalRoleI>) {
            let id = null;
            data.forEach((item) => {
                  id = 'radio-' + (++ArrayUtil.count);
                  keys.forEach((key) => {
                        if (item[key.key] === key.conditonStr) {
                              item[key.outputKey] = {
                                    value: true,
                                    id: id
                              };
                        } else {
                              item[key.outputKey] = {
                                    value: false,
                                    id: id
                              };
                        }
                  });
            });
      }



      addSrNo(data: Array<any>, outPutKey: string = 'SrNo') {
            data.forEach((item, index) => {
                  item[outPutKey] = index + 1;
            });
      }


      addConfigRadio(data: Array<any>, keys: Array<RadioConfiI>) {
            let id = null;
            data.forEach((item) => {
                  id = 'radio-' + (++ArrayUtil.count);
                  keys.forEach((key: RadioConfiI) => {
                        if (item[key.key] === key.conditonStr) {
                              item[key.outputKey] = {
                                    name: id,
                                    value: key.conditonStr,
                                    defaultValue: key.conditonStr,
                                    outputKeyInData: key.outputKeyInData
                              };
                        } else {
                              item[key.outputKey] = {
                                    name: id,
                                    value: null,
                                    defaultValue: key.conditonStr,
                                    outputKeyInData: key.outputKeyInData
                              };
                        }

                  });
            });
      }


      convert01ToBoolean(arr: Array<any>, conditionFn: any, ...keys: Array<string>) {
            arr.forEach((item) => {
                  keys.forEach((key) => {
                        if (conditionFn(item)) {
                              if (item[key] == 0) {
                                    item[key] = false;
                              } else if (item[key] == 1) {
                                    item[key] = true;
                              }
                        }
                  });
            });
      }

}
