import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { RootSharedModule } from '../core/sharedModules';
import { AgGridModule } from 'ag-grid-angular/main';
import { AgGridComponent } from './ag-grid/ag-grid.component';

import { TopMenuBarComponent } from './top-menu-bar/top-menu-bar.component';
import { TabComponent, TabsComponent, DynamicTabsDirective } from './ng-tabs';
import { LoaderComponent } from './loader/loader.component';
import { CustomModalPopUpComponent } from './custom-modal-pop-up/custom-modal-pop-up.component';
import { ChooseJobQueueComponent } from './choose-job-queue/choose-job-queue.component';
import { DeletePopComponent } from './delete-pop/delete-pop.component';
import { DropdownWithDescriptionComponent } from './dropdown-with-description/dropdown-with-description.component';


import { GlobalDropdownComponent } from './global-dropdown';
import { PaginationComponent } from './pagination/pagination.component';
import { AlertMessageComponent } from './alert-message/alert-message.component';
import { GlobalPopupComponent } from './global-popup/global-popup.component';
import { CheckBoxComponent } from './check-box/check-box.component';
import { DirectiveModule } from '../core/directive';
import { ModalComponent } from './modal/modal.component';
import { SelectComponent } from './select/select.component';
import { MultiselectDropdownModule } from './dropdown/dropdown.module';
import { CommonSearchCsComponent } from './common-search-cs/common-search-cs.component';
import { SetupTopMenuBarComponent } from './setup-top-menu-bar/setup-top-menu-bar.component';


@NgModule({
      imports: [
            RootSharedModule,
            AgGridModule,
            DirectiveModule,
            MultiselectDropdownModule
      ],
      declarations: [
            CustomModalPopUpComponent,
            TopMenuBarComponent,
            AgGridComponent,
            TabComponent,
            TabsComponent,
            DynamicTabsDirective,
            LoaderComponent,
            ChooseJobQueueComponent,
            DeletePopComponent,
            DropdownWithDescriptionComponent,
            GlobalDropdownComponent,
            PaginationComponent,
            AlertMessageComponent,
            GlobalPopupComponent,
            CheckBoxComponent,
            ModalComponent,
            SelectComponent,
            CommonSearchCsComponent,
            SetupTopMenuBarComponent
      ],
      exports: [
            CustomModalPopUpComponent,
            TabComponent,
            DynamicTabsDirective,
            TabsComponent,
            TopMenuBarComponent,
            AgGridComponent,
            LoaderComponent,
            ChooseJobQueueComponent,
            DeletePopComponent,
            DropdownWithDescriptionComponent,
            GlobalDropdownComponent,
            AlertMessageComponent,
            GlobalPopupComponent,
            CheckBoxComponent,
            DirectiveModule,
            ModalComponent,
            SelectComponent,
            CommonSearchCsComponent,
            SetupTopMenuBarComponent
      ],
      entryComponents: [
            TabComponent
      ]
})
export class ComponentModule { }
