
import { ControlContainer, FormGroupDirective, AbstractControl } from '@angular/forms';
import { ElementRef, OnDestroy, Input } from '@angular/core';
import { UiDirectiveService } from './base.service';
import { Subscription } from 'rxjs';
import { Validators } from './validators';


export interface ValidationObjI {
      msg: string;
      validator: any;
}

export abstract class BaseDirective implements OnDestroy {

      _value: any;
      controlElement: HTMLElement;
      errorBox: HTMLElement;
      fb: FormGroupDirective;
      submitSub: Subscription;

      @Input() vEmail: string;
      @Input() vRequired: string;
      @Input() vNumber: string;

      validationsToPerform: Array<ValidationObjI> = [];


      constructor(
            protected elementRef: ElementRef,
            protected controlContainer: ControlContainer,
            protected diBaseSer: UiDirectiveService
      ) {
      }

      initDirective() {
            this.setNativeElement();
            this.errorBox = this.diBaseSer.createNAppendErrorBox(this.controlElement);
            this.diBaseSer.emptyErrorBox(this.errorBox);
            this.subToNgSubmit();
      }

      setNativeElement() {
            this.controlElement = this.elementRef.nativeElement;
      }

      validate(abstractControl: AbstractControl): { [key: string]: any } | null {
            this._value = abstractControl.value;
            return this.diBaseSer.perFormValidation(this.controlElement, this.errorBox, this.validationsToPerform, this._value);
      }

      subToNgSubmit() {
            this.fb = <FormGroupDirective>this.controlContainer.formDirective;
            this.submitSub = this.fb.ngSubmit.subscribe((data) => {
                  this.diBaseSer.perFormValidationOnSubmit(this.controlElement, this.errorBox, this.validationsToPerform, this._value);
            });
      }



      registorValidations() {
            this.registorSingleValidator(this.vEmail, Validators.emailValidator);
            this.registorSingleValidator(this.vRequired, Validators.requiredValidator);
            this.registorSingleValidator(this.vNumber, Validators.isNumeric);
      }

      registorSingleValidator(validate: string, validator: any) {
            if (validate) {
                  this.validationsToPerform.push({
                        msg: validate,
                        validator: validator
                  });
            }
      }


      ngOnDestroy() {
            this.submitSub.unsubscribe();
      }
}
