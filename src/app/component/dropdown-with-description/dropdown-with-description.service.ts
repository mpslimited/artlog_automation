import { Injectable } from '@angular/core';
import { BaseService } from '../../core/base';
import { HttpService } from '../../core/services';
import { DropdownWithDescriptionModel } from './dropdown-with-description.model';
import { Observable } from 'rxjs';

declare var $;

@Injectable()

export class DropdownWithDescriptionService extends BaseService {

      private dropdowTrHeight = 28;


      constructor(
            protected http: HttpService
      ) {
            super(http);
      }


      getData(url: string, params: any): Observable<any> {


            let retValue = '';
            const keys = Object.keys(params);
            keys.forEach((key) => {
                  const val: any = params[key];
                  if (val) {
                        retValue += '&' + encodeURIComponent(key) + '=' + encodeURIComponent(val);
                  }
            });
            retValue = retValue.substring(1);
            return this.getDataFromAPI(url, retValue);
      }


      errorChecking(ddOptions: DropdownWithDescriptionModel, name: string) {
            if (ddOptions) {
                  if (!ddOptions.displayKey) {
                        throw new Error('Display Key requred for DropdownWithDescription ' + name);
                  }
                  // else if (!ddOptions.serviceUrl) {
                  //       throw new Error('Service Url requred for DropdownWithDescription ' + name);
                  // }
                  // else if (!ddOptions.descriptionKey) {
                  //       throw new Error('Description Key requred for DropdownWithDescription ' + name);
                  // }
            } else {
                  throw new Error('Basic Setting required for DropdownWithDescription ' + name);
            }
      }


      slimScrollSetting(dropdownHeight: any) {
            setTimeout(() => {
                  $('.dropDownSlim').slimScroll({
                        color: '#000',
                        size: '5px',
                        height: dropdownHeight,
                        alwaysVisible: true,
                        allowPageScroll: true,
                        scrollTo: 100 + 'px',

                  });
            }, 1);
      }

      setPositionOfElementToEle(targetEle: any, outputEle: any, DEFAULT_Height: number, dropdownHeight: any) {
            const { bottom, height, left, right, top, width } = targetEle.getBoundingClientRect();
            const bodyRect: any = document.body.getBoundingClientRect();
            // console.log(bodyRect, 'bodyRect');
            const windowWidth = window.outerWidth;
            const windowInnerHeight = window.innerHeight;
            // console.log(top, height)
            const eleTop = (top + height + (-bodyRect.y)) % windowInnerHeight;

            if (top > (windowInnerHeight - DEFAULT_Height)) {
                  outputEle.style.top = -(dropdownHeight) + 'px'; // eleTop + 'px';
            } else {
                  outputEle.style.top = (height) + 'px'; // eleTop + 'px';

            }
            outputEle.style.position = 'absolute';
      }


      generateDropdownHeight(noOfTrs: number): string {
            let dropdownHeight;
            if (noOfTrs > 5) {
                  dropdownHeight = this.dropdowTrHeight * 6;
            } else {
                  dropdownHeight = this.dropdowTrHeight * noOfTrs;
            }
            dropdownHeight += 2;
            return dropdownHeight + 'px';
      }



      filterDropdown(filter: string, data: Array<any>, ddOptions: DropdownWithDescriptionModel) {
            const retOut = data.filter((item: any) => {
                  if (item[ddOptions.displayKey].toLowerCase().includes(filter.toLowerCase())) {
                        return true;
                  } else {
                        return false;
                  }
            });
            return retOut;
      }


}
