import { Routes, RouterModule, ExtraOptions } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { AuthGuard } from './core/guard';
import { LoginGuard } from './core/guard/login-guard';

import { LoginComponent } from './pages/login/login/login.component';

export const routes: Routes = [
      {
            path : '',
            canActivate : [LoginGuard],
            pathMatch : 'full',
           // component: LoginComponent,
           loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)
           //loadChildren : './pages/login/login.module#LoginModule'
      },
      {
            path: '**',
            redirectTo: 'pages/front-panel/front-panel.module#FrontPanelModule',
           //redirectTo: () => import('./pages/front-panel/front-panel.module').then(m => m.FrontPanelModule)
            canActivate: [AuthGuard]
      }
];
const extraOptions: ExtraOptions = {
      enableTracing: false,
      useHash: false
};


export const RoutingModule : ModuleWithProviders = RouterModule.forRoot(routes, extraOptions);
