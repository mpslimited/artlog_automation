import { IsEmpty } from './is-empty';


declare var validator;


export class Validators {

      public static filterForValidator(val) {
            if (val === null || val === undefined) {
                  return '';
            } else if (typeof <string>val === 'number') {
                  return val + '';
            } else {
                  return val;
            }
      }

      public static requiredValidator(val: any) {
            return !IsEmpty.isEmpty(val);
      }

      public static emailValidator(val: any) {
            val = Validators.filterForValidator(val);

            if (val === '') {
                  return true;
            } else {
                  return validator.isEmail(val);
            }


      }

      public static isNumeric(val: any) {
            val = Validators.filterForValidator(val);
            return validator.isNumeric(val);
      }

}

// export interface ValidationsI {
//       [key: string]: any;
// }

export class InvalidErrors {

      public static required = {
            'required': {
                  value: true
            }
      };



      public static email = {
            'email': {
                  value: true
            }
      };


      public static ui_validation = {
            'ui_validation': {
                  value: true
            }
      };
}
