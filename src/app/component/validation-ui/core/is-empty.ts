

export class IsEmpty {
      public static isPremitiveEmpty(val: any): boolean {
            if (val === undefined || val === '' || val === null) {
                  return true;
            } else {
                  return false;
            }
      }

      public static isArrayEmpty(arr: Array<any>): boolean {
            if (arr[0] === undefined) {
                  return true;
            } else {
                  return false;
            }
      }

      public static isObjectEmpty(obj: any): boolean {
            const keys = Object.keys(obj);

            if (keys.length === 0) {
                  return true;
            } else {
                  return false;
            }
      }

      public static isEmpty(val: any) {

            if (Array.isArray(val)) {
                  return this.isArrayEmpty(val);
            } else if (val === null) {
                  return true;
            } else if (typeof val === 'object') {
                  return this.isObjectEmpty(val);
            } else {
                  return this.isPremitiveEmpty(val);
            }
      }
}
