import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgGridModule } from 'ag-grid-angular';
import { routing } from './front-panel.routing';
import { FrontPanelComponent } from './front-panel.component';
import { TopMenuBarComponent } from './../../component/top-menu-bar/top-menu-bar.component';
import { ComponentModule } from './../../component/component.module';
//import { DashboardModule } from './../dashboard/dashboard.module';

@NgModule({
      imports: [
            CommonModule,
            routing,
            ComponentModule,
            AgGridModule ,
         //   DashboardModule
      ],
      declarations: [
            FrontPanelComponent,
            //DashboardModule
            //EditjobComponent
            // TopMenuBarComponent

      ]
})
export class FrontPanelModule { }
