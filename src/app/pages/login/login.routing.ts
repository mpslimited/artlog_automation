import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { LoginComponent } from './login/login.component';

export const routes: Routes = [
      {
            path: '',
            component: LoginComponent,
            pathMatch: 'full'
      }
];


export const routing: ModuleWithProviders = RouterModule.forChild(routes);
