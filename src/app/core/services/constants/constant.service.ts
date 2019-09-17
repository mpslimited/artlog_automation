import { Injectable } from '@angular/core';

import { AssetsPathConstants } from './assets-path.constants';
import { RoutePathConstant } from './route-path.constants';
import { DropdownConstants } from './dropdown-constant';

@Injectable()

export class ConstantService {

      assetsPath = new AssetsPathConstants();
      routePath = new RoutePathConstant();
      dropdown = new DropdownConstants();


      constructor() {
      }


}

