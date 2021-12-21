
import { throwError as observableThrowError, Observable, Subject } from 'rxjs';

import { catchError, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpService } from '../services/http.service';
import { GlobalPopupService } from '../../component/global-popup/global-popup.service';
import { SessionObject, CustomerServicesUrls } from '../shared';
import { BaseUtil } from './base.util';
import { Router } from '@angular/router';



@Injectable()

export class BaseService {

      public subject = new Subject<any>();
      private menuFlag = new Subject<any>();
      public EnableCollapse = false;

      private lastUrlhit = '';

      sendMessage(message: any) {
            this.subject.next({ text: message });
      }

      clearMessage() {
            this.subject.next();
      }

      getMessage(): Observable<any> {
            return this.subject.asObservable();
      }
      getServiceUrl(name: string): string {
            return null;
      }

      constructor(
            protected httpService?: HttpService,
            protected globalPupUp?: GlobalPopupService,
            protected router?: Router,
      ) {
      }


      getDataFromAPI(strURL: string, body: any, responseType?: string): Observable<any> {
        //debugger
            let tokenId = null;
            this.lastUrlhit = strURL;
            const sessionObj = SessionObject.getUserDetails();
            tokenId = sessionObj && SessionObject.getUserDetails().Token;
            // tokenId = (SessionObject.getUserDetails().Token === undefined) ? '' : SessionObject.getUserDetails().Token;
            // tokenId = `bXBzQDEyM34jfjMyMDN+I34yMDE=`;

            if (!responseType) {
                  this.getResponseType();
            }
            if (localStorage['isLogin'] === 'true' || strURL.includes('login')) {
                  return this.httpService.extractPostData(strURL, body, tokenId, responseType).pipe(
                        map(this.extractData),
                        catchError(this.handleError));
            } else if (localStorage['isLogin'] === 'false' && tokenId === null) {
                  this.router.navigate(['/']);
            }

      }

      getResponseType(): string {
            return '';
      }
      getjson(filename): Observable<any> {
            // return this.extractData(filename);
            return this.httpService.getJSON(filename);
      }


      loadJSONData(jsonPath: string): Observable<any> {
            return this.httpService.getJSON(jsonPath);
      }


      protected extractData(res: any) {

            return res;
      }

      protected handleError = (error: any) => {

            if ((error['status'] === 500) && error['error']['message'].includes('expired')) {
                  localStorage.clear();
                  this.globalPupUp.navigateTo(['']);
                  this.globalPupUp.showGlobalPopup(`<span style="color:red; font-weight: bold"> Session has been expired!</span>`);
            }
            // } if (error['status'] === 0) {
            //       this.globalPupUp.showGlobalPopup(`<span style="color:red; font-weight: bold"> Your internet
            //       is not working properly!</span> <br> Please check`);
            // }
            else {
                  localStorage.clear();
                  this.globalPupUp.navigateTo(['']);

                  this.globalPupUp.showGlobalPopup(`<span style="color:red; font-weight: bold"> We are facing some
                  technical issues!</span> <br> Please try after sometime`);
            }
            BaseUtil.hideGlobalLoader();

            const errorParam = BaseUtil.getApiParams({
                  message: JSON.stringify(error),
                  subject: 'Error_Log'
            });

            if (this.lastUrlhit !== CustomerServicesUrls.TK_CUSTOMER_ERROR_LOG) {
                  this.lastUrlhit = CustomerServicesUrls.TK_CUSTOMER_ERROR_LOG;
                  this.getDataFromAPI(CustomerServicesUrls.TK_CUSTOMER_ERROR_LOG, errorParam)
                        .subscribe((data) => {
                              console.log('Error Log Response', data);
                        });
            }




            // In a real world app, we might use a remote logging infrastructure
            // We'd also dig deeper into the error to get a better message
            const errMsg = (error.message) ? error.message :
                  error.status ? `${error.status} - ${error.statusText}` : 'Server error';
            console.error(errMsg); // log to console instead
            return observableThrowError(errMsg);
      }


      uploadFile(event: any, strURL: string, nameinForm: string, otherBody?: any): Observable<any> {
            let tokenId = null;
            const sessionObj = SessionObject.getUserDetails();
            tokenId = sessionObj && SessionObject.getUserDetails().Token;
            return this.httpService.uploadData(event, strURL, nameinForm, otherBody, tokenId);
      }

      // uploadData(strURL: string, body: any) {
      //       return this.httpService.extractPostData(strURL, body, '')
      //             .map(this.extractData)
      //             .catch(this.handleError);
      // }






}
