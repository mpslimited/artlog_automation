import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { CustDesktopComponent } from './desktop/cust-desktop/cust-desktop.component';
import { CustomerSearchComponent } from './customer-search/customer-search.component';
import { CustomerGuard } from './cust-destop.gard.service';
import { DocucmentRefGuard } from './doucment-reference.gard.service';

export const routes: Routes = [
      {
            path: '',
            component: CustDesktopComponent,
            // canActivate: [DocucmentRefGuard]
      },
      {
            path: 'cs',
            component: CustomerSearchComponent,
            canActivate: [CustomerGuard]
      }
];


export const routing: ModuleWithProviders = RouterModule.forChild(routes);

