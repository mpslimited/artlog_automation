import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
//import { Http, Headers, Response } from '@angular/http';
import { UserDetailsI } from '../../core/shared';
//import { ProcessUrls } from '../../core/shared';
import { SessionObject } from '../../core/shared/session-object';
import { CustomerServicesUrls } from '../../core/shared/constant/url-constants/customer-services.constants';
import { Observable } from 'rxjs';

import { HttpService } from '../../core/services/http.service';



import { BaseService } from '../../core/base';
import { GlobalPopupService } from '../../component';

@Injectable()
export class LoginService extends BaseService {

    public token: string;

    constructor(protected router: Router,
        protected httpService: HttpService,
        protected globalPup: GlobalPopupService
    ) {
        super(httpService, globalPup);
        this.isLoggedIn();
    }
    public isLoggedIn(): boolean {
        this.httpService.extractPostData(CustomerServicesUrls.ARTLOG_REDDRUSERINFO, null, null).subscribe((data) => {
            if (!!data.Status && data.Status === 'OK') {
                SessionObject.setUserDetails({
                  'userInfo': data.id,
                  'Token': data.token,
                  'name' : data.name,
                  'userGroupName': data.userGroupName,
                  'roleName': data.roleName
                });
                console.log(data);
                localStorage.setItem('isLogin', 'true');
                this.router.navigate(['/pages/admin']);
            }
        });
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

