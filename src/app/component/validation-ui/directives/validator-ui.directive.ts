import { Directive, ElementRef, forwardRef, Input, HostListener, OnChanges } from '@angular/core';
import { ControlContainer, NG_VALIDATORS, FormGroupDirective, AbstractControl, Validator } from '@angular/forms';
import { UiDirectiveService } from '../core/base.service';
import { BaseDirective } from '../core/base.directive';


@Directive({
      selector: '[validator-ui]',
      providers: [
            {
                  provide: NG_VALIDATORS,
                  useExisting: forwardRef(() => ValidatorUiDirective),
                  multi: true
            }
      ]
})

export class ValidatorUiDirective extends BaseDirective implements Validator, OnChanges {


      @HostListener('blur')
      onBlur() {
            this.diBaseSer.perFormValidation(this.controlElement, this.errorBox, this.validationsToPerform, this._value);
      }



      constructor(
            protected elementRef: ElementRef,
            protected controlContainer: ControlContainer,
            protected valSer: UiDirectiveService
      ) {
            super(elementRef, controlContainer, valSer);
            this.initDirective();
      }

      ngOnChanges() {
            this.registorValidations();
      }

}
