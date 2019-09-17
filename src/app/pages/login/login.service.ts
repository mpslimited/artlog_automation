import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { UserDetailsI } from '../../core/shared';
//import { ProcessUrls } from '../../core/shared';
import { SessionObject } from '../../core/shared/session-object';

import { Observable } from 'rxjs';

import { HttpService } from '../../core/services/http.service';



import { BaseService } from '../../core/base';
import { GlobalPopupService } from '../../component';

@Injectable()
export class LoginService extends BaseService {

    public token: string;

    constructor(protected httpService: HttpService,
        protected globalPup: GlobalPopupService
    ) {
        super(httpService, globalPup);
        // set token if saved in local storage
    }
    public isLoggedIn(): boolean {
        return true;
    }
    // login(username: string, password: string): Observable<UserDetails[]> {
    //     const body = 'username=' + username + '&password=' + password;
    //     return this.httpService.extractPostData(ProcessUrls.LOGIN_URL, body, null)
    //         .map(this.extractData)
    //         .catch(this.handleError);
    // }

    // login_old(username: string, password: string, publisher: string): Observable<UserDetails[]> {
    //     const body = 'user=' + username + '&pwd=' + password + '&publisher=' + publisher;
    //     return this.httpService.extractPostData(ProcessUrls.LOGIN_URL, body, null)
    //         .map(this.extractData)
    //         .catch(this.handleError);
    // }

    // logout(): void {
    //     // clear token remove user from local storage to log user out
    //     console.log('Logout called....');
    //     //  this.timeOutService.clearCheckTimeOutSubcription();
    //     this.token = null;
    //     //  SessionObject.removeSessionObject();
    // }

    // private extractData(res: Response) {
    //     console.log(res);
    //     if (Number(res.status) === 1000) {
    //         SessionObject.setSessionObject(res);
    //     }
    //     const body = res; // .json();
    //     return body || [];
    // }

    // private handleError(error: any) {
    //     // In a real world app, we might use a remote logging infrastructure
    //     // We'd also dig deeper into the error to get a better message
    //     const errMsg = (error.message) ? error.message :
    //         error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    //     console.error(errMsg); // log to console instead
    //     return Observable.throw(errMsg);
    // }

}

