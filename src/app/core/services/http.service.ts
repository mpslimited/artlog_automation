
import { throwError as observableThrowError, Observable } from 'rxjs';

import { map, catchError, tap, finalize } from 'rxjs/operators';
import { Injectable } from '@angular/core';




import { SessionObject, CustomerServicesUrls } from '../shared';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';




@Injectable()
export class HttpService /*extends HttpClient*/ {

      constructor(
            private http: HttpClient
      ) { }


      // extractPostDataInsight(url: string, body: any, tokenId: any, responseType: string = 'json'): Observable<any> {

      //       this.showLoader();

      //       const options = this.getHTTPOption(tokenId);
      //       console.log(this.http);
      //       options['responseType'] = responseType;
      //       return this.http.post(url, body, options)
      //             .catch(this.onCatch)
      //             .do((res: Response) => {
      //                   console.log(res);
      //                   this.onSuccess(res);
      //             }, (error: any) => {
      //                   console.log('error');
      //                   this.onError(error);
      //             })
      //             .finally(() => {
      //                   this.onEnd();
      //             });


      // }
      extractData(url: string, body: any, responseType: string = 'json'): Observable<any> {
            this.showLoader();
            const sessionObj = SessionObject.getUserDetails();
            let AUser = sessionObj && SessionObject.getUserDetails();
            const options = this.getHTTPOptions(AUser.Token, AUser.userInfo);
            console.log(this.http);
            options['responseType'] = responseType;
            return this.http.post(url, body, options).pipe(
                  catchError(this.onCatch),
                  tap((res: Response) => {
                        //   console.log(res);
                        this.onSuccess(res);

                  }, (error: any) => {
                        console.log('error');
                        this.onError(error);
                  }),
                  finalize(() => {
                        // console.log('final.......................................................');
                        this.onEnd();
                  }));

      }
      extractPostData(url: string, body: any, tokenId: any, responseType: string = 'json'): Observable<any> {
            this.showLoader();

            const options = this.getHTTPOption(tokenId);
            console.log(this.http);
            options['responseType'] = responseType;
            return this.http.post(url, body, options).pipe(
                  catchError(this.onCatch),
                  tap((res: Response) => {
                        //   console.log(res);
                        this.onSuccess(res);

                  }, (error: any) => {
                        console.log('error');
                        this.onError(error);
                  }),
                  finalize(() => {
                        // console.log('final.......................................................');
                        this.onEnd();
                  }));

      }

      private onCatch(error: any, caught: Observable<any>): Observable<any> {
            console.log('Catch, error: ', error);
            return observableThrowError(error);
      }

      private onSuccess(res: Response): void {
            //    console.log('Request successful');
      }

      private onError(res: Response): void {
            console.log('Error, status code: ' + res.status);
      }

      private onEnd(): void {
      }

      private showLoader(): void {
      }

      private hideLoader(): void {
      }
      private getHTTPOptions(tokenId: any, id: any): any {
            const httpOptions = {
                  headers: new HttpHeaders(
                        {
                              'Content-Type': 'application/x-www-form-urlencoded'
                        }
                  )
            };
            if (tokenId) {
                  httpOptions.headers = httpOptions.headers.set('Authorization', tokenId);
            }
            if (id){
                  httpOptions.headers = httpOptions.headers.set('AuthUser', id);      
            }
            return httpOptions;
      }
      private getHTTPOption(tokenId: any): any {
            const httpOptions = {
                  headers: new HttpHeaders(
                        {
                              'Content-Type': 'application/x-www-form-urlencoded'
                        }
                  )
            };
            if (tokenId) {
                  httpOptions.headers = httpOptions.headers.set('Authorization', tokenId);
            }
            return httpOptions;
      }
      // "./file.json"
      // public getJSON(filename: string): Observable<any> {
      //       return this.http.get(filename)
      //             .map((res: any) => res.json())
      //             .catch((error: any) => { console.log(error) });

      // }
      protected handleError(error: any) {
            // In a real world app, we might use a remote logging infrastructure
            // We'd also dig deeper into the error to get a better message
            const errMsg = (error.message) ? error.message :
                  error.status ? `${error.status} - ${error.statusText}` : 'Server error';
            console.error(errMsg); // log to console instead
            return observableThrowError(errMsg);
      }

      getJSON(jsonPath: string): Observable<any> {
            return this.http.get(jsonPath).pipe(
                  map((response: any) => response),
                  catchError(this.handleError));
      }

      addToFormData(formData: FormData, obj: any) {
            Object.keys(obj).forEach((key) => {
                  debugger
                        if(key=="username"){
                              formData.append("email", obj[key]);
                        }else{
                              formData.append(key, obj[key]);
                        }
                        
                  });
      }

      uploadData(event: any, urlStr: string, formName: string, otherBody: any = {}, tokenId: any) {
            const fileList: FileList = event.target.files;
            if (fileList.length > 0) {
                  const file: File = fileList[0];
                  const formData: FormData = new FormData();
                  // formData.append('file', file, file.name);
                  // formData.append('podXML', '1');
                  formData.append('attachment', file);
                  this.addToFormData(formData, otherBody);


                  const options = this.upLoadOptions(tokenId);
                  options['responseType'] = 'json';

                  return this.http.post(urlStr, formData, options);

            }
      }


      upLoadOptions(tokenId: string) {
            let headers = new HttpHeaders();
            //  head.append('enctype', 'multipart/form-data');
            // headers = headers.set('Content-Type', 'application/json');
            headers = headers.set('enctype', 'multipart/form-data');
            const httpOptions = {
                  headers: headers
            };

            if (tokenId) {
                  httpOptions.headers = httpOptions.headers.set('Authorization', tokenId);
            }
            return httpOptions;
      }


}
