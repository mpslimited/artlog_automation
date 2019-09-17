import { Directive, Input, forwardRef, OnChanges, SimpleChanges, ElementRef, AfterViewInit, HostListener } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl, ControlContainer, FormGroupDirective, FormControl } from '@angular/forms';
import { Utils } from '../../../shared';
import { ValidationServcie } from '../validation.service';

@Directive({
      selector: '[appRequired]',
      providers: [
            {
                  provide: NG_VALIDATORS,
                  useExisting: forwardRef(() => DDWDRequiredDirective),
                  multi: true
            },
            ValidationServcie]
})

export class DDWDRequiredDirective implements Validator, AfterViewInit {
      @Input() appRequired: string;

      nativeElement: HTMLElement;
      errorDiv = document.createElement('div');

      formDirective: FormGroupDirective;
      _value: any = null;

      @HostListener('blur', ['$event.target'])
      onBlur(target: HTMLElement | any) {
            this._value = target.value;
            this.requiredValidator(this._value);
      }

      constructor(
            private el: ElementRef,
            private fg: ControlContainer,
            private vldSer: ValidationServcie) {
            this.nativeElement = el.nativeElement;
            this.formDirective = <FormGroupDirective>this.fg.formDirective;
            this.formDirective.ngSubmit.subscribe((event) => {
                  this.requiredValidator(this._value);
            });

      }


      ngAfterViewInit() {
            this.vldSer.addErrorDiv(this.errorDiv, this.nativeElement);
      }

      validate(control: AbstractControl): { [key: string]: any } | null {
            this._value = control.value;
            return this.requiredValidator(this._value);
      }

      requiredValidator(value: any) {

            const required = Utils.isEmpty(value);
            if (required) {
                  setTimeout(() => {
                        this.vldSer.actionOnInValid(this.errorDiv, this.nativeElement, this.appRequired);
                  }, 100);

                  return this.vldSer.valueToReturnOnInvalid();
            } else {
                  setTimeout(() => {
                        this.vldSer.actionOnValid(this.errorDiv);
                  }, 100);
                  return null;
            }
      }
}
