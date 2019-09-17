import { NgModule } from '@angular/core';
import { IDGeneratorService } from './id-generator';
import { GlobalProcessRoutingService } from './routing';
import { HttpService } from './http.service';
import { BaseService } from '../base/base.service';

import { ConstantService } from './constants';

@NgModule({
      providers: [
            IDGeneratorService,
            GlobalProcessRoutingService,
            HttpService,
            BaseService,
            ConstantService
      ]
})

export class ServiceModule { }
