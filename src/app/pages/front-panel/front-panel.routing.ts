import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { FrontPanelComponent } from './front-panel.component';
//import { AuthGuardService } from './auth-guard.service';
export const routes: Routes = [
      {
            path: 'pages',
            component: FrontPanelComponent,
            children: [

                  {
                        path: 'admin',
                        loadChildren: '../dashboard/dashboard.module#DashboardModule'
                        //'../cust-service/cust-desktop.module#DashboardModule'
              }//,{
                  //       path: 'admin',
                  //       loadChildren: '../cust-service/cust-desktop.module#CustDestTopModule'
                  // }
            ],
            //canActivate: [AuthGuardService],
            // canActivateChild: [AuthGuard]
      }
];


export const routing: ModuleWithProviders = RouterModule.forChild(routes);
