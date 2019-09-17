import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
//import { AuthGuard } from '../../core/guard';
//import { AuthGuard } from '../dashboard/dashboard.module';
export const routes: Routes = [
      {
            path: '',
            component: DashboardComponent,
            // children: [

            //       {
            //             path: '',

            //             //loadChildren: '../dashboard/dashboard.module#DashboardModule'
            //             //'../cust-service/cust-desktop.module#DashboardModule'
            //   }//,{
            //       //       path: 'admin',
            //       //       loadChildren: '../cust-service/cust-desktop.module#CustDestTopModule'
            //       // }
            // ],
            // // canActivate: [AuthGuard],
            // // canActivateChild: [AuthGuard]
      }
];


export const routing: ModuleWithProviders = RouterModule.forChild(routes);
