import { Injectable } from '@angular/core';
import { IdGenerator } from './id-generator';
import { AgVerticalRadioInput } from './ag-radio-config';



@Injectable()

export class AgRadioService {

      private agIdGen: IdGenerator = new IdGenerator('ag-radio');
      constructor() {
      }

      getRadioID(): string {
            return this.agIdGen.genrateID();
      }




      genrateAgRaioConfigVertical(data: Array<any>, agRadioInput: Array<AgVerticalRadioInput>) {

            agRadioInput.forEach((input) => {


                  data.forEach((item) => {
                        item[input.field + '-config'] = {
                              value: 35000
                        };
                  });
            });

      }

}
