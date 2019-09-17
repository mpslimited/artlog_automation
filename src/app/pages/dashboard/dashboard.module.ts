import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgGridModule } from 'ag-grid-angular/main';
import { routing } from './dashboard.routing';
import { ComponentModule } from './../../component/component.module';
import { EditjobComponent } from '../dashboard/editjob/editjob.component';
import { DashboardComponent } from './dashboard.component';
import { RootSharedModule } from '../../core/sharedModules';
import { AddjobComponent } from './addjob/addjob.component';
import { AccordionModule } from 'primeng/accordion';
import { MenuItem } from 'primeng/api';                 //api
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { DropdownModule } from 'primeng/dropdown';
// import { ChartModule } from 'primeng/chart';
import { MultiSelectModule } from 'primeng/multiselect';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SliderModule } from 'primeng/slider';
@NgModule({
      imports: [
            CommonModule,
            routing,
            ComponentModule,
            AgGridModule,
            ScrollingModule,
            DialogModule,
            TableModule,
            InputTextModule,
            ButtonModule,
            SliderModule,
            // BrowserAnimationsModule,
            // ChartModule,
            RootSharedModule,
            MultiSelectModule,
            DropdownModule
      ], exports: [DashboardComponent],
      declarations: [
            DashboardComponent,
            EditjobComponent,
            AddjobComponent
            // TopMenuBarComponent
      ]
})
export class DashboardModule { }