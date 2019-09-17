import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ValidatorUiDirective } from './directives/validator-ui.directive';
import { UiDirectiveService } from './core/base.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    ValidatorUiDirective
  ],
  exports: [
    ValidatorUiDirective
  ],
  providers: [
    UiDirectiveService
  ]

})
export class ValidationUiModule { }
