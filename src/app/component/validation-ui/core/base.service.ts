import { Injectable } from '@angular/core';
import { ValidationObjI } from './base.directive';
import { InvalidErrors } from './validators';


@Injectable()
export class UiDirectiveService {

      brEleStr = '<br>';

      constructor() {
      }

      createNAppendErrorBox(controlElement: HTMLElement): HTMLElement {
            let errorBox: HTMLElement = null;
            const errorBoxs = controlElement.parentElement.getElementsByTagName('span');

            for (let i = 0; i < errorBoxs.length; i++) {
                  const element = errorBoxs[i];
                  if (element.classList.contains(this.getErrorBoxClass())) {
                        errorBox = element;
                        break;
                  }
            }
            if (errorBox === null) {
                  errorBox = document.createElement('span');
                  errorBox.classList.add(this.getErrorBoxClass());
                  controlElement.parentElement.appendChild(errorBox);
            }

            return errorBox;
      }

      perFormValidation(controlElement: HTMLElement, errorBox: HTMLElement,
            validationsToPerform: Array<ValidationObjI>, _value: any) {
            const errorMsgs = [];
            validationsToPerform
                  .forEach((item: ValidationObjI) => {
                        if (item.validator(_value)) {
                        } else {
                              errorMsgs.push(item.msg);
                        }
                  });

            const combinedErrors = errorMsgs.join(', ');

            if (combinedErrors !== '') {
                  this.actionOnInvalid(controlElement, errorBox, combinedErrors);
                  return InvalidErrors.ui_validation;
            } else {
                  this.actionOnValid(controlElement, errorBox);
                  return null;
            }

      }

      perFormValidationOnSubmit(controlElement: HTMLElement, errorBox: HTMLElement,
            validationsToPerform: Array<ValidationObjI>, _value: any) {
            const errorMsgs = [];
            validationsToPerform
                  .forEach((item: ValidationObjI) => {
                        if (item.validator(_value)) {
                        } else {
                              errorMsgs.push(item.msg);
                        }
                  });

            const combinedErrors = errorMsgs.join(', ');
            if (combinedErrors !== '') {
                  this.actionOnSubmitInvalid(controlElement, errorBox, combinedErrors);
                  return InvalidErrors.ui_validation;
            } else {

                  this.actionOnValid(controlElement, errorBox);
                  return null;
            }

      }

      actionOnInvalid(controlElement: HTMLElement, errorBox: HTMLElement, msg: string) {
            setTimeout(() => {
                  if (controlElement.classList.contains('ng-touched')) {
                        controlElement.classList.add('v-invalid');
                        this.showErrorBox(errorBox, msg);
                  }
            }, 200);
      }

      actionOnSubmitInvalid(controlElement: HTMLElement, errorBox: HTMLElement, msg: string) {
            controlElement.classList.add('v-invalid');
            this.showErrorBox(errorBox, msg);
      }

      actionOnValid(controlElement: HTMLElement, errorBox: HTMLElement) {
            controlElement.classList.remove('v-invalid');
            this.emptyErrorBox(errorBox);
      }

      emptyErrorBox(errorBox: HTMLElement) {
            errorBox.innerHTML = this.brEleStr;
      }

      showErrorBox(errorBox: HTMLElement, msg: string) {
            errorBox.innerHTML = msg;
      }

      getErroEleClass() {
            return 'v-invalid';
      }

      getErrorBoxClass(): string {
            return 'v-error-box';
      }
}
