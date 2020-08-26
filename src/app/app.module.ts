import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RoutingModule  } from './app-routing.module';
import { AgGridModule } from 'ag-grid-angular';

import { AppComponent } from './app.component';
import { FrontPanelModule } from './pages/front-panel/front-panel.module';
import { ComponentModule,  ComponentServiceModule } from './component';
import { ServiceModule } from './core/services';
import { GuardModule } from './core/guard';
import { DirectiveModule } from './core/directive';

import { AccordionModule } from 'primeng/accordion';
import { MenuItem } from 'primeng/api';                 //api
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { SyncJobsComponent } from './pages/sync-jobs/sync-jobs.component';

@NgModule({
  declarations: [
    AppComponent,
    SyncJobsComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    TableModule,
    AccordionModule,
    BrowserAnimationsModule,
    FormsModule,
    RoutingModule ,
    FrontPanelModule,
    ServiceModule,
    GuardModule,
   // AGModule,
    ComponentModule,
    ComponentServiceModule,
    DirectiveModule,
    ScrollingModule,
    DialogModule,
    TableModule,
    InputTextModule,
    ButtonModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})


export class AppModule { }
