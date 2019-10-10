import { Injectable } from '@angular/core';
import { Router, CanActivate, CanLoad, CanActivateChild } from '@angular/router';
import { GuardService } from '../guard.service';


@Injectable()
export class AuthGuard implements CanActivate, CanLoad, CanActivateChild {

      constructor(
            private grdSer: GuardService
      ) {  }

      canActivate(): Promise<boolean> {
            return this.checkMyRoute();
      }

      canLoad(): Promise<boolean> {
            return this.checkMyRoute();
      }

      canActivateChild(): Promise<boolean> {
            return this.checkMyRoute();
      }

      checkMyRoute(): Promise<boolean> {
            return new Promise((resolve, reject) => {
                  if (this.grdSer.isTokenAvaible()) {
                        resolve(true);
                  } else {
                        resolve(false);
                        this.grdSer.navigateToLogin();
                  }
            });
      }



}
