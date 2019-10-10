import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

//import { AgGridModule } from 'ag-grid-angular/main';
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
import {InputTextareaModule} from 'primeng/inputtextarea';

import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { DropdownModule } from 'primeng/dropdown';
// import { ChartModule } from 'primeng/chart';
import { MultiSelectModule } from 'primeng/multiselect';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { SliderModule } from 'primeng/slider';
import {MenubarModule} from 'primeng/menubar';
import {ScrollPanelModule} from 'primeng/scrollpanel';
import {RadioButtonModule} from 'primeng/radiobutton';
import {SplitButtonModule} from 'primeng/splitbutton';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {TooltipModule} from 'primeng/tooltip';
import {OverlayPanelModule} from 'primeng/overlaypanel';
@NgModule({
      imports: [
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
            // BrowserAnimationsModule,
            // ChartModule,
            RootSharedModule,
            MultiSelectModule,
            DropdownModule,
            ReactiveFormsModule
      ], exports: [DashboardComponent],
      declarations: [
            DashboardComponent,
            EditjobComponent,
            AddjobComponent
            // TopMenuBarComponent
      ]
})
export class DashboardModule { }
