import { Injectable } from '@angular/core';

@Injectable()

export class ValidationServcie {

      constructor() {
      }

      valueToReturnOnInvalid() {
            return {
                  'required': {
                        value: true
                  }
            };
      }

      containAllClass(ele: HTMLElement, ...classNames) {
            const len = classNames.length;
            for (let i = 0; i < len; i++) {
                  if (ele.classList.contains(classNames[i]) === false) {
                        return false;
                  }
            }
            return true;
      }

      addErrorDiv(errorDiv: HTMLElement, nativeElement: HTMLElement) {
            this.addInnerHTMLToDiv(errorDiv, '<br>');

            if (nativeElement.tagName === 'INPUT') {
                  nativeElement.parentElement.appendChild(errorDiv);
            } else {
                  nativeElement.appendChild(errorDiv);
            }
      }

      addInnerHTMLToDiv(naEle: HTMLElement, innerHTML: string) {
            naEle.innerHTML = innerHTML;
      }

      actionOnValid(errorDiv: HTMLElement) {
            this.addInnerHTMLToDiv(errorDiv, '<br>');
      }




      actionOnInValid(errorDiv: HTMLElement, nativeElement: HTMLElement, msg: string, ) {

            if (msg !== '') {

                  if (this.containAllClass(nativeElement, 'ng-touched')) {
                        this.addInnerHTMLToDiv(errorDiv, `<div class="radius4 errrorBox">${msg}</div>`);
                  }
            }
      }


      actionOnSubmit(errorDiv: HTMLElement, nativeElement: HTMLElement, msg: string, ) {
            if (msg !== '') {
                  this.addInnerHTMLToDiv(errorDiv, `<div class="radius4 errrorBox">${msg}</div>`);
            }
      }







}

