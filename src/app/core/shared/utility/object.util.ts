


export class ObjectUtil {

      asignObjTofirstOne(first: any, ...others: Array<any>) {

            others.forEach((other) => {
                  Object.assign(first, (other || {}));
            });
            return first;
      }

      deleteKeys(obj: any, ...keys: Array<string>) {
            keys.forEach((key) => {
                  delete obj[key];
            });
      }

      objectToArray(obj: any, keyKey: string, valueKey: string) {
            const keys = Object.keys(obj);
            const retValue = [];
            keys.forEach((key) => {
                  const singleObj = {};
                  singleObj[keyKey] = key;
                  singleObj[valueKey] = obj[key];
                  retValue.push(singleObj);
            });
      }

}
