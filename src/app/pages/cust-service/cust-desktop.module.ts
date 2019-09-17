import { NgModule } from '@angular/core';
import { routing } from './cust-desktop.routing';



import { RootSharedModule } from '../../core/sharedModules';
import { ComponentModule } from '../../component/component.module';



import { CustDesktopComponent } from './desktop/cust-desktop/cust-desktop.component';
import { CustomerSearchComponent } from './customer-search/customer-search.component';
//import { DashboardComponent } from '../dashboard/dashboard.component';
import { AgGridModule } from 'ag-grid-angular/main';

import { CustomerGuard } from './cust-destop.gard.service';
import { DocucmentRefGuard } from './doucment-reference.gard.service';

import { ValidationUiModule } from '../../component/validation-ui';
import { TextMaskModule } from 'angular2-text-mask';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
      declarations: [
            CustDesktopComponent,
            CustomerSearchComponent,
            //DashboardComponent,
      ],
      providers: [
            CustomerGuard,
            DocucmentRefGuard
      ],
      imports: [
            routing,
            AgGridModule,
            ComponentModule,
            RootSharedModule,
            ValidationUiModule,
            TextMaskModule,
            NgSelectModule,
            NgbModule
      ]
})

export class CustDestTopModule { }
