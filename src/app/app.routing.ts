import { Routes, RouterModule, ExtraOptions } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { AuthGuard } from './core/guard';
import { LoginGuard } from './core/guard/login-guard';



export const routes: Routes = [
      {
            path: '',
            canActivate: [LoginGuard],
            pathMatch: 'full',
            loadChildren: './pages/login/login.module#LoginModule'

      },
      {
            path: '**',
            redirectTo: 'pages/front-panel/front-panel.module#FrontPanelModule',
            canActivate: [AuthGuard]
      }
];

const extraOptions: ExtraOptions = {
      enableTracing: false,
      useHash: false
};


export const routing: ModuleWithProviders = RouterModule.forRoot(routes, extraOptions);
