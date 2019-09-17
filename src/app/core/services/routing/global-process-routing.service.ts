import { Injectable } from '@angular/core';
import { GlobalRouting, MyRoutesI } from './global-routing.base';


@Injectable()
export class GlobalProcessRoutingService extends GlobalRouting {

      constructor() {
            super();
      }
      myRoutes: Array<MyRoutesI> = [
            {
                  label: 'Accouting Reconciliation',
                  path: 'accounting/reconciliation'
            },
            {
                  label: 'Accounting Reconciliation-output',
                  path: 'accounting/reconciliation-output'
            },
            {
                  label: 'Galary Submit Job',
                  path: 'aduit/galary-submit-job'
            },
            {
                  label: 'Paragraph Report Submit Job',
                  path: 'aduit/paragraph-report-submit-job'
            },
            {
                  label: 'Audit Gallary',
                  path: 'aduit/audit-gallery'
            },
            {
                  label: 'Paragraph Report',
                  path: 'aduit/paragraph-report'
            }
      ];

}
