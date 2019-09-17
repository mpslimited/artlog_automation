import { Injectable } from '@angular/core';
import { SessionObject, UserDetailsI } from '../shared/session-object';
import { Router } from '@angular/router';

@Injectable()

export class GuardService {


      constructor(
            private router: Router
      ) { 
            //debugger 
      }

      private getRefID(): string {
            const refId = SessionObject.getRefID();
            return refId && refId.documentReferenceDialogue;
      }
      private getcustID(): string {
            const custId = SessionObject.getCustomerID();
            return custId;
      }

      private getToken(): string {
            const userDetail: UserDetailsI = SessionObject.getUserDetails();
            return userDetail && userDetail.Token;
      }

      isRefIdAvaible(): boolean {
            if (this.getRefID()) {
                  return true;
            } else {
                  return false;
            }
      }

      isTokenAvaible(): boolean {
            if (this.getToken()) {
                  return true;
            } else {
                  return false;
            }
      }

      navigateFromLogin() {
             debugger
            if ( localStorage.getItem('isLogin')=="true") {
                  this.router.navigate(['/pages/admin']);
            } else {

                  localStorage.clear();
                  this.navigateToLogin();
            }
      }

      navigateToLogin() {
            this.router.navigate(['']);
      }

}

