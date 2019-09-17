import { Injectable } from '@angular/core';


@Injectable()
export class IDGeneratorService {


      private normalIDCounts = 0;

      constructor() {
      }

      generateNormalIDs(name) {
            return name + (++this.normalIDCounts);
      }

}
