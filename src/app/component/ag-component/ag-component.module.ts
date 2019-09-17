import { NgModule } from '@angular/core';
import { AgGridModule } from 'ag-grid-angular';
import { RootSharedModule } from '../../core/sharedModules';
import { RadioButtonComponent } from './radio-button';
import { AgDropdownComponent } from '../ag-dropdown';
import { AgRadioVerticalComponent } from './ag-radio/ag-radio.component';
import { AgRadioService } from './ag-radio/ag-radio.service';
import { AgCheckBoxComponent } from './ag-check-box/ag-check-box.component';
import { AgChecboxHeaderComponent } from './ag-checbox-header/ag-checbox-header.component';
import { AgCheckBoxService } from './ag-check-box/ag-check-box.service';
@NgModule({
      declarations: [
            RadioButtonComponent,
            AgDropdownComponent,
            AgRadioVerticalComponent,
            AgCheckBoxComponent,
            AgChecboxHeaderComponent
      ],
      providers: [
            AgRadioService,
            AgCheckBoxService
      ],
      imports: [
            RootSharedModule,
            AgGridModule.withComponents([
                  RadioButtonComponent, AgDropdownComponent,
                  AgRadioVerticalComponent, AgCheckBoxComponent,
                  AgChecboxHeaderComponent
            ])
      ]
})

export class AGModule { }
