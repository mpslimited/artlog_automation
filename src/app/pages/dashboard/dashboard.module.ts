import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule , FormsModule} from '@angular/forms';


import { routing } from './dashboard.routing';
import { ComponentModule } from './../../component/component.module';
import { DashboardComponent } from './dashboard.component';
// import { DataGridComponent  } from './DataGrid.Component';
import { RootSharedModule } from '../../core/sharedModules';
import { AccordionModule } from 'primeng/accordion';
import { MenuItem } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import {InputTextareaModule} from 'primeng/inputtextarea';

import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { DropdownModule } from 'primeng/dropdown';
// import { ChartModule } from 'primeng/chart';
import { MultiSelectModule } from 'primeng/multiselect';
import { SliderModule } from 'primeng/slider';
import {MenubarModule} from 'primeng/menubar';
import {ScrollPanelModule} from 'primeng/scrollpanel';
import {RadioButtonModule} from 'primeng/radiobutton';
import {SplitButtonModule} from 'primeng/splitbutton';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {TooltipModule} from 'primeng/tooltip';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {SelectButtonModule} from 'primeng/selectbutton';
import {BlockUIModule} from 'primeng/blockui';
import { NgApexchartsModule } from 'ng-apexcharts';
//import { AgGridModule } from 'ag-grid-angular';
import { HttpClientModule } from "@angular/common/http";
import { ArtDashboardComponent } from './art-dashboard/art-dashboard.component';
import { ArtProductivityComponent } from './art-productivity/art-productivity.component';
import { SyncJobsComponent } from './sync-jobs/sync-jobs.component';
import { ApprovedjobsComponent } from './approvedjobs/approvedjobs.component';
import { ScorecardviewComponent } from './scorecardview/scorecardview.component';
import { JobcardviewComponent } from './jobcardview/jobcardview.component';
import { EditjobComponent } from './editjob/editjob.component';
import { PerformanceComponent } from './performance/performance.component';
import { GoogleChartsModule, ScriptLoaderService } from 'angular-google-charts';
import { AgGridModule } from 'ag-grid-angular';
import { NgbDate, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { JobrefresComponent } from './jobrefres/jobrefres.component';

import { JobsviewComponent } from './jobsview/jobsview.component';
import { DeleteJobsComponent } from './delete-jobs/delete-jobs.component';
import { TopmenuComponent } from './topmenu/topmenu.component';
//import { DashboardComponent } from './dashboard.component';
@NgModule({
      imports: [
            //NgxDaterangepickerMd.forRoot(),
           // BrowserModule,
            NgbModule,
            NgApexchartsModule,
            GoogleChartsModule,
            BlockUIModule,
            SelectButtonModule,
            ConfirmDialogModule,
            DynamicDialogModule,
            OverlayPanelModule,
            TooltipModule,
            CommonModule,
            routing,
            ComponentModule,
            ScrollingModule,
            DialogModule,
            TableModule,
            InputTextModule,
            InputTextareaModule,
            ButtonModule,
            SliderModule,
            MenubarModule,
            SplitButtonModule,
            ProgressSpinnerModule,
            RadioButtonModule,
            ScrollPanelModule,
            RootSharedModule,
            MultiSelectModule,
            DropdownModule,
            ReactiveFormsModule,
            FormsModule,

            HttpClientModule,
            AgGridModule.withComponents([]),
      ], exports: [DashboardComponent],
      declarations: [
            DashboardComponent,
            ArtDashboardComponent,
            ArtProductivityComponent,
            SyncJobsComponent,
            ApprovedjobsComponent,
            ScorecardviewComponent,
            JobcardviewComponent,
            EditjobComponent,
            PerformanceComponent,
            JobrefresComponent,
            JobsviewComponent,
            DeleteJobsComponent,
            TopmenuComponent,
           // DataGridComponent,
           // EditjobComponent,
           // AddjobComponent
            // TopMenuBarComponent
      ]
})
export class DashboardModule { }
