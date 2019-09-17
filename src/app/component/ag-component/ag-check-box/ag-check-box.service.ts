import { Injectable } from '@angular/core';
import { IdGenerator } from '../ag-radio/id-generator';

@Injectable()

export class AgCheckBoxService {

      private agIdGen: IdGenerator = new IdGenerator('ag-checkbox');
      constructor() {
      }

      getID(): string {
            return this.agIdGen.genrateID();
      }


      getCheckedValues(data: Array<any>, key: string): Array<any> {

            const retVal = data.filter((item) => {
                  if (item[key].value === true) {
                        return true;
                  } else {
                        return false;
                  }
            });

            return retVal;
      }

      getUnheckedValues(data: Array<any>, key: string): Array<any> {

            const retVal = data.filter((item) => {
                  if (item[key].value === false) {
                        return true;
                  } else {
                        return false;
                  }
            });

            return retVal;
      }


}
