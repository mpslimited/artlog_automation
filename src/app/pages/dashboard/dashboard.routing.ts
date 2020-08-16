import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { ApprovedjobsComponent} from './approvedjobs/approvedjobs.component'
import { ArtDashboardComponent } from './art-dashboard/art-dashboard.component';
import { ArtProductivityComponent } from './art-productivity/art-productivity.component';
import { ScorecardviewComponent } from './scorecardview/scorecardview.component';
import { PerformanceComponent } from './performance/performance.component';

// import { DataGridComponent  } from './DataGrid.Component';
import { AuthGuard } from '../../core/guard';
//import { AuthGuard } from '../dashboard/dashboard.module';
export const routes: Routes = [
      {
            path: '',
            redirectTo: 'home', pathMatch: 'full',
            //component: DashboardComponent,
            //canActivate: [AuthGuard],
      },
      {
            path: 'home',
            component: DashboardComponent,
            canActivate: [AuthGuard],
      },
      {
            path: 'approved',
            component: ApprovedjobsComponent,
            canActivate: [AuthGuard],
      },
      {
            path: 'artdashboard',
            component: ArtDashboardComponent,
            canActivate: [AuthGuard],
      },
      {
            path: 'dashboard',
            component: ArtProductivityComponent,
            canActivate: [AuthGuard],
      },
      {
            path: 'scorecardview',
            component: ScorecardviewComponent,
            canActivate: [AuthGuard],
      },
      {
            path: 'performance',
            component: PerformanceComponent,
            canActivate: [AuthGuard],
      }/*,{ PerformanceComponent
            path: 'datagrid', dashboard
            component: DataGridComponent,
      }*/
];


export const routing: ModuleWithProviders = RouterModule.forChild(routes);
