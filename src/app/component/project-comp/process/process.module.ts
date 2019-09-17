import { NgModule } from '@angular/core';
import { ProcessEditFooterComponent } from './process-edit-footer/process-edit-footer.component';
import { ProcessRepeatingComponent } from './process-repeating/process-repeating.component';
import { ProcessSubmitJobComponent } from './process-submit-job/process-submit-job.component';
import { RootSharedModule } from '../../../core/sharedModules';

import { AgGridComponent } from './../../ag-grid/ag-grid.component';
import { AgGridModule } from 'ag-grid-angular/main';
import { ComponentModule } from '../../component.module';
@NgModule({
      declarations: [
            ProcessEditFooterComponent,
            ProcessRepeatingComponent,
            ProcessSubmitJobComponent
      ],
      exports: [

            ProcessEditFooterComponent,
            ProcessRepeatingComponent,
            ProcessSubmitJobComponent
      ],
      providers: [

      ],
      imports: [
            RootSharedModule,
            AgGridModule,
            ComponentModule

      ]
})

export class ProcessComponentModule { }
